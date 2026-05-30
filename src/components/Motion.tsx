'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import type { ReactNode, CSSProperties } from 'react'

// ─── FloatingDust ─────────────────────────────────────────────────────────────
// Sparse parchment dust motes drifting upward across the full viewport.

export function FloatingDust() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    const motes: { x: number; y: number; r: number; vx: number; vy: number; a: number; phase: number; freq: number }[] = []
    let w = 0, h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const N = Math.min(40, Math.floor(w * h / 38000))
    for (let i = 0; i < N; i++) {
      motes.push({
        x: Math.random() * w, y: Math.random() * h,
        r: 0.6 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.06, vy: -0.04 - Math.random() * 0.08,
        a: 0.15 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        freq: 0.0008 + Math.random() * 0.0016,
      })
    }

    let last = performance.now()
    const tick = (t: number) => {
      const dt = Math.min(40, t - last); last = t
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(44, 61, 38, 1)'
      for (const m of motes) {
        m.phase += m.freq * dt
        m.x += m.vx * dt + Math.sin(m.phase) * 0.15
        m.y += m.vy * dt
        if (m.y < -8) { m.y = h + 8; m.x = Math.random() * w }
        if (m.x < -8) m.x = w + 8
        if (m.x > w + 8) m.x = -8
        ctx.globalAlpha = m.a
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="dust-canvas" aria-hidden="true" />
}

// ─── DrawOnView ───────────────────────────────────────────────────────────────
// Wraps children; adds `.draw-in` + `.is-drawn` (triggering SVG stroke reveal)
// when element scrolls into view.

interface DrawOnViewProps {
  children: ReactNode
  drawDur?: number
  stagger?: number
  className?: string
  style?: CSSProperties
  immediate?: boolean
}

export function DrawOnView({ children, drawDur = 2200, stagger = 60, className = '', style, immediate = false }: DrawOnViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(immediate)

  useEffect(() => {
    if (immediate) { setDrawn(true); return }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setDrawn(true); io.disconnect() } })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [immediate])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll('svg').forEach(svg => {
      svg.querySelectorAll('path, circle, line, ellipse').forEach((p, i) => {
        (p as HTMLElement).style.setProperty('--i', String(i))
      })
    })
  })

  return (
    <div
      ref={ref}
      className={`draw-in staggered ${drawn ? 'is-drawn' : ''} ${className}`}
      style={{ ...style, ['--draw-dur' as string]: `${drawDur}ms`, ['--stagger' as string]: `${stagger}ms` }}
    >
      {children}
    </div>
  )
}

// ─── MouseTilt ────────────────────────────────────────────────────────────────
// Gentle 3D tilt toward the cursor. Pointer-fine devices only.

interface MouseTiltProps {
  children: ReactNode
  maxTilt?: number
  scale?: number
  className?: string
  style?: CSSProperties
}

export function MouseTilt({ children, maxTilt = 6, scale = 1, className = '', style }: MouseTiltProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const host = hostRef.current, inner = innerRef.current
    if (!host || !inner) return
    if (matchMedia?.('(pointer: coarse)').matches) return

    let tx = 0, ty = 0
    const cur = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const onLeave = () => { tx = 0; ty = 0 }

    const tick = () => {
      cur.x += (tx - cur.x) * 0.06
      cur.y += (ty - cur.y) * 0.06
      inner.style.transform = `perspective(1400px) rotateY(${cur.x * maxTilt}deg) rotateX(${-cur.y * maxTilt}deg) scale(${scale})`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(rafRef.current)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [maxTilt, scale])

  return (
    <div ref={hostRef} className={`tilt-host ${className}`} style={style}>
      <div ref={innerRef} className="tilt">{children}</div>
    </div>
  )
}

// ─── BarRise ──────────────────────────────────────────────────────────────────
// Triggers .bar-rise → .bar-rise.is-visible on intersection.

export function BarRise({ delay = 0, style, children }: { delay?: number; style?: CSSProperties; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('is-visible'), delay)
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return <div ref={ref} className="bar-rise" style={style}>{children}</div>
}

// ─── Reveal ───────────────────────────────────────────────────────────────────
// Fade + rise scroll reveal.

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add('is-visible'); io.disconnect() } })
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
