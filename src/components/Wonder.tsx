'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { TendrilSVG, MothSVG } from '@/components/Botanicals'
import { DrawOnView } from '@/components/Motion'

// ─── WanderingMoth ────────────────────────────────────────────────────────────
// One moth drifts a slow Lissajous path around the viewport.

export function WanderingMoth({ speed = 0.18, scale = 1, color, opacity = 0.7 }: {
  speed?: number; scale?: number; color?: string; opacity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if ((document.body as HTMLBodyElement & { dataset: DOMStringMap }).dataset.motion === '0') return

    let raf = 0, t0 = 0, lastX = 0, lastY = 0
    const tick = (t: number) => {
      if (!t0) t0 = t
      const time = (t - t0) / 1000
      const w = window.innerWidth, h = window.innerHeight
      const cx = w * 0.5, cy = h * 0.55
      const rx = w * 0.42, ry = h * 0.38
      const a = time * speed
      const x = cx + rx * Math.sin(a)
      const y = cy + ry * Math.sin(a * 1.31 + 0.7) * 0.7
      const dx = x - lastX, dy = y - lastY
      const ang = Math.atan2(dy, dx) * 180 / Math.PI
      lastX = x; lastY = y
      const fade = 0.45 + 0.55 * Math.abs(Math.sin(a * 0.3 + 1.2))
      el.style.transform = `translate(${x}px, ${y}px) rotate(${ang}deg) scale(${scale})`
      el.style.opacity = String(opacity * fade)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed, scale, opacity])

  return (
    <div ref={ref} className="moth" style={{ color: color || undefined }}>
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        <MothSVG size={26 * scale} sw={0.9}/>
      </div>
    </div>
  )
}

// ─── FallingPetals ────────────────────────────────────────────────────────────
// Canvas of slow-drifting petals scoped to a containing section.

export function FallingPetals({ density = 0.00006, color = 'rgba(243,234,216,0.55)', drift = 0.04 }: {
  density?: number; color?: string; drift?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if ((document.body as any).dataset?.motion === '0') return
    const ctx = canvas.getContext('2d')!
    let raf = 0, w = 0, h = 0
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    type Petal = { x: number; y: number; r: number; vy: number; vx: number; rot: number; vrot: number; a: number; phase: number }
    let petals: Petal[] = []

    const spawn = (anywhere: boolean): Petal => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -10 - Math.random() * 40,
      r: 4 + Math.random() * 6,
      vy: 0.18 + Math.random() * 0.32, vx: (Math.random() - 0.5) * 0.4,
      rot: Math.random() * Math.PI * 2, vrot: (Math.random() - 0.5) * 0.012,
      a: 0.4 + Math.random() * 0.45, phase: Math.random() * Math.PI * 2,
    })

    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect()
      w = Math.floor(r.width); h = Math.floor(r.height)
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const N = Math.max(10, Math.floor(w * h * density))
      petals = Array.from({ length: N }, () => spawn(true))
    }
    resize()

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    let last = performance.now()
    const tick = (t: number) => {
      const dt = Math.min(50, t - last); last = t
      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.phase += 0.012 * dt
        p.x += p.vx * dt + Math.sin(p.phase) * drift * dt
        p.y += p.vy * dt
        p.rot += p.vrot * dt
        if (p.y > h + 20 || p.x < -30 || p.x > w + 30) Object.assign(p, spawn(false))
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.a
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.r, p.r * 0.45, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [density, color, drift])

  return <canvas ref={ref} className="petals-canvas" aria-hidden="true"/>
}

// ─── GrowingTendrilRule ───────────────────────────────────────────────────────
// Section divider that draws itself in on scroll.

export function GrowingTendrilRule({ color }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setDrawn(true); io.disconnect() } })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`tendril ${drawn ? 'is-drawn' : ''}`} style={{ color }}>
      <TendrilSVG/>
    </div>
  )
}

// ─── ConstellationGlow ────────────────────────────────────────────────────────
// 4 stars + connecting lines that twinkle on card hover. Use inside a .card.

export function ConstellationGlow({ color = 'var(--clay)' }: { color?: string }) {
  const stars = [{ x: 18, y: 20 }, { x: 60, y: 44 }, { x: 110, y: 28 }, { x: 82, y: 82 }]
  return (
    <svg viewBox="0 0 130 100" className="constellation" width="130" height="100" aria-hidden="true"
      style={{ position: 'absolute', top: 12, right: 8, color, pointerEvents: 'none', overflow: 'visible' }}>
      <g stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.55">
        <line x1={stars[0].x} y1={stars[0].y} x2={stars[1].x} y2={stars[1].y}/>
        <line x1={stars[1].x} y1={stars[1].y} x2={stars[2].x} y2={stars[2].y}/>
        <line x1={stars[1].x} y1={stars[1].y} x2={stars[3].x} y2={stars[3].y}/>
      </g>
      {stars.map((s, i) => (
        <circle key={i} className="star" cx={s.x} cy={s.y} r="1.4" fill="currentColor"/>
      ))}
    </svg>
  )
}

// ─── OrbitingMoons ────────────────────────────────────────────────────────────
// Small moon phases orbiting a center. Positioned over a relative container.

interface MoonConfig { phase: number; speed: number; offset: number; size: number; dir?: 'cw' | 'ccw' }

function MoonPhase({ phase = 0.5, size = 16 }: { phase?: number; size?: number }) {
  const r = 10
  const offset = (phase - 0.5) * 22
  const id = `mph-${Math.random().toString(36).slice(2, 8)}`
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={{ display: 'block' }}>
      <defs>
        <mask id={id}>
          <rect width="24" height="24" fill="black"/>
          <circle cx="12" cy="12" r={r} fill="white"/>
          <circle cx={12 + offset} cy="12" r={r} fill="black"/>
        </mask>
      </defs>
      <circle cx="12" cy="12" r={r} fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.55"/>
      <circle cx="12" cy="12" r={r} fill="currentColor" mask={`url(#${id})`}/>
    </svg>
  )
}

export function OrbitingMoons({ radius = 220, color = 'rgba(243,234,216,0.7)', moons }: {
  radius?: number; color?: string; moons?: MoonConfig[]
}) {
  const list = moons || [
    { phase: 0.15, speed: 110, offset: 0,   size: 14, dir: 'cw'   as const },
    { phase: 0.55, speed: 160, offset: 130, size: 11, dir: 'cw'   as const },
    { phase: 0.85, speed: 140, offset: 245, size: 9,  dir: 'ccw'  as const },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', color }} aria-hidden="true">
      {list.map((m, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          animation: `orbit-${m.dir || 'cw'} ${m.speed}s linear infinite`,
          animationDelay: `-${((m.offset || 0) / 360) * m.speed}s`,
        }}>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: `translate(-50%, -50%) translateY(-${radius}px)`,
          }}>
            <MoonPhase phase={m.phase} size={m.size}/>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── PollenAura ───────────────────────────────────────────────────────────────
// Golden glow + drifting specks. SVG overlay on berry cluster.

export function PollenAura({ cx, cy, r = 12, color = '#c89b4a', delay = 0 }: {
  cx: number; cy: number; r?: number; color?: string; delay?: number
}) {
  const delayClass = delay === 1 ? 'aura-pulse--b' : delay === 2 ? 'aura-pulse--c' : ''
  const specks = [
    { dx: -10, dy: -16, d: 0   },
    { dx:  12, dy: -10, d: 1.2 },
    { dx:  -4, dy: -20, d: 2.4 },
    { dx:  14, dy: -22, d: 3.5 },
  ]
  return (
    <g style={{ color }}>
      <circle className={`aura-pulse ${delayClass}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" opacity="0.4"/>
      {specks.map((p, i) => (
        <circle key={i} className="pollen" cx={cx} cy={cy} r="0.9" fill="currentColor" stroke="none"
          style={{ ['--dx' as string]: `${p.dx}px`, ['--dy' as string]: `${p.dy}px`, animationDelay: `${p.d}s` }}/>
      ))}
    </g>
  )
}

// ─── TravelingSunSeasonal ─────────────────────────────────────────────────────
// Seasonal motif with animated sun dot traveling the arc.

export function TravelingSunSeasonal({ size = 260, sw = 0.8 }: { size?: number; sw?: number }) {
  const rays = [0,1,2,3,4,5,6].map(i => {
    const a = (180 + i * 30) * Math.PI / 180
    const x1 = 32 + Math.cos(a) * 22, y1 = 42 + Math.sin(a) * 22
    const x2 = 32 + Math.cos(a) * 26, y2 = 42 + Math.sin(a) * 26
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>
  })
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      <path d="M14 42a18 18 0 0 1 36 0"/>
      {rays}
      <circle className="sun-dot" cx="0" cy="0" r="2.2" fill="currentColor" stroke="none"/>
      <path d="M32 46c-4 4-4 10 0 14 4-4 4-10 0-14z"/>
      <path d="M32 48v12"/>
    </svg>
  )
}

// ─── InteractiveHeroPlant ─────────────────────────────────────────────────────
// Full hero plant: draw-in, breathe, sway, berry pulse, pollen aura.

export function InteractiveHeroPlant() {
  const sw = 0.9
  return (
    <DrawOnView drawDur={2600} stagger={70}>
      <svg viewBox="0 0 200 280" width={320} height={448} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
        <g className="breathe" style={{ transformOrigin: '100px 200px' }}>
          <g className="root-creep">
            <path d="M100 250c-2 6-8 10-16 14"/>
            <path d="M100 250c2 6 8 10 18 14"/>
            <path d="M100 250c-6 4-14 6-22 6"/>
            <path d="M100 250c6 4 14 6 24 6"/>
            <path d="M100 250c0 8-2 14-6 22"/>
            <path d="M100 250c0 8 4 16 8 22"/>
          </g>
          <path d="M100 250c0-40 0-80 0-120"/>
          <g className="sway-l">
            <path d="M100 220c-14-2-26-10-30-22 12 0 24 6 30 22z"/>
            <path d="M100 220c-10-4-20-10-26-18"/>
          </g>
          <g className="sway-r">
            <path d="M100 220c14-2 26-10 30-22-12 0-24 6-30 22z"/>
            <path d="M100 220c10-4 20-10 26-18"/>
          </g>
          <g className="sway-l" style={{ animationDuration: '9s' }}>
            <path d="M100 190c-16-2-30-10-36-24 14 0 28 8 36 24z"/>
            <path d="M100 190c-12-6-24-12-30-20"/>
          </g>
          <g className="sway-r" style={{ animationDuration: '9s' }}>
            <path d="M100 190c16-2 30-10 36-24-14 0 -28 8-36 24z"/>
            <path d="M100 190c12-6 24-12 30-20"/>
          </g>
          <g className="sway-l" style={{ animationDuration: '11s' }}>
            <path d="M100 158c-18-2-34-12-40-28 16 0 32 10 40 28z"/>
          </g>
          <g className="sway-r" style={{ animationDuration: '11s' }}>
            <path d="M100 158c18-2 34-12 40-28-16 0-32 10-40 28z"/>
          </g>
          <g className="sway-l" style={{ animationDuration: '13s' }}>
            <path d="M100 124c-16-4-30-14-34-30 14 2 28 12 34 30z"/>
          </g>
          <g className="sway-r" style={{ animationDuration: '13s' }}>
            <path d="M100 124c16-4 30-14 34-30-14 2-28 12-34 30z"/>
          </g>
          <PollenAura cx={92}  cy={98} r={14} color="#c89b4a" delay={0}/>
          <PollenAura cx={108} cy={92} r={11} color="#c89b4a" delay={1}/>
          <PollenAura cx={100} cy={80} r={9}  color="#c89b4a" delay={2}/>
          <g>
            <circle className="berry-pulse" cx="92" cy="98" r="6"/>
            <circle className="berry-pulse berry-pulse--b" cx="108" cy="92" r="5"/>
            <circle className="berry-pulse berry-pulse--c" cx="100" cy="80" r="4"/>
            <path d="M92 92l-2-6M92 92l4-4M108 86l3-5M108 86l-3-3M100 76l-2-4M100 76l2-4"/>
          </g>
        </g>
      </svg>
    </DrawOnView>
  )
}
