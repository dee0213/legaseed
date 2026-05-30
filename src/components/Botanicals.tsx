// Botanical SVG library — monolinear strokes, manuscript feel.
// All paths use currentColor; inherit from CSS.

import type { SVGProps } from 'react'

// ─── Domain motifs (60×60 corner glyphs) ─────────────────────────────────────

export function BodyRituals({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 38c0-7 6-12 6-20 0 8 6 13 6 20a6 6 0 1 1-12 0z"/>
      <path d="M30 44c8 0 16-4 22-12-9 0-18 4-22 12z"/>
      <path d="M30 44c4-3 11-6 18-8"/>
    </svg>
  )
}

export function SkinCare({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  const petals = [0,1,2,3,4].map(i => {
    const a = (i * 72 - 90) * Math.PI / 180
    const x = 32 + Math.cos(a) * 11
    const y = 32 + Math.sin(a) * 11
    return <ellipse key={i} cx={x} cy={y} rx="4.5" ry="8" transform={`rotate(${i*72} ${x} ${y})`}/>
  })
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="32" cy="32" r="3"/>
      {petals}
    </svg>
  )
}

export function HairCare({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 12c0 6-4 9-4 14s8 6 8 11-6 7-6 12"/>
      <path d="M30 49c-2 2-3 4-4 6M32 49c0 3 1 5 2 7M34 49c2 2 4 3 6 4"/>
      <path d="M28 18c-2-2-4-3-6-3M36 18c2-2 4-3 6-3"/>
    </svg>
  )
}

export function InternalCleansing({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M26 18h12"/>
      <path d="M28 18v6c-6 2-10 8-10 16 0 7 6 12 14 12s14-5 14-12c0-8-4-14-10-16v-6"/>
      <path d="M30 32c2 1 4 1 6 0M28 40c3 2 6 2 8 0"/>
    </svg>
  )
}

export function ReproductiveWisdom({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="22" cy="32" r="12"/>
      <path d="M42 20a12 12 0 1 0 0 24 9 9 0 1 1 0-24z"/>
    </svg>
  )
}

export function EnergeticSpiritual({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 50c4-3 4-7 0-10s-4-7 0-10 4-7 0-10"/>
      <path d="M32 52c4-3 4-7 0-10s-4-7 0-10 4-7 0-10"/>
      <path d="M46 50c4-3 4-7 0-10s-4-7 0-10 4-7 0-10"/>
    </svg>
  )
}

export function Contemplative({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="32" cy="32" r="3"/>
      <circle cx="32" cy="32" r="9"/>
      <circle cx="32" cy="32" r="15"/>
      <circle cx="32" cy="32" r="21"/>
    </svg>
  )
}

export function Seasonal({ size = 60, sw = 1 }: { size?: number; sw?: number }) {
  const rays = [0,1,2,3,4,5,6].map(i => {
    const a = (180 + i * 30) * Math.PI / 180
    const x1 = 32 + Math.cos(a) * 22, y1 = 42 + Math.sin(a) * 22
    const x2 = 32 + Math.cos(a) * 26, y2 = 42 + Math.sin(a) * 26
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>
  })
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 42a18 18 0 0 1 36 0"/>
      {rays}
      <path d="M32 46c-4 4-4 10 0 14 4-4 4-10 0-14z"/>
      <path d="M32 48v12"/>
    </svg>
  )
}

// ─── Hero plant — large, breathes on homepage ────────────────────────────────

export function HeroPlant({ size = 280, sw = 1, breathe = true }: { size?: number; sw?: number; breathe?: boolean }) {
  return (
    <svg viewBox="0 0 200 280" width={size} height={size * 1.4} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      <g className={breathe ? 'breathe' : ''} style={{ transformOrigin: '100px 140px' }}>
        <path d="M100 250c0-40 0-80 0-120"/>
        <path d="M100 250c-2 6-8 10-16 14M100 250c2 6 8 10 18 14M100 250c-6 4-14 6-22 6M100 250c6 4 14 6 24 6M100 250c0 8-2 14-6 22M100 250c0 8 4 16 8 22"/>
        <path d="M100 220c-14-2-26-10-30-22 12 0 24 6 30 22z"/>
        <path d="M100 220c14-2 26-10 30-22-12 0-24 6-30 22z"/>
        <path d="M100 190c-16-2-30-10-36-24 14 0 28 8 36 24z"/>
        <path d="M100 190c16-2 30-10 36-24-14 0 -28 8-36 24z"/>
        <path d="M100 158c-18-2-34-12-40-28 16 0 32 10 40 28z"/>
        <path d="M100 158c18-2 34-12 40-28-16 0-32 10-40 28z"/>
        <path d="M100 124c-16-4-30-14-34-30 14 2 28 12 34 30z"/>
        <path d="M100 124c16-4 30-14 34-30-14 2-28 12-34 30z"/>
        <path d="M100 220c-10-4-20-10-26-18M100 220c10-4 20-10 26-18"/>
        <path d="M100 190c-12-6-24-12-30-20M100 190c12-6 24-12 30-20"/>
        <circle cx="92" cy="98" r="6"/>
        <circle cx="108" cy="92" r="5"/>
        <circle cx="100" cy="80" r="4"/>
        <path d="M92 92l-2-6M92 92l4-4M108 86l3-5M108 86l-3-3M100 76l-2-4M100 76l2-4"/>
      </g>
    </svg>
  )
}

// ─── Entry page herb illustration (ashwagandha) ───────────────────────────────

export function HerbAshwagandha({ size = 240, sw = 1 }: { size?: number; sw?: number }) {
  const leafPairs = [240, 210, 180, 150, 120].map((y, i) => (
    <g
      key={i}
      className="herb-leaf"
      style={{
        transformOrigin: `100px ${y}px`,
        animationDuration: `${6 + i * 0.55}s`,
        animationDelay: `${-i * 0.7}s`,
      }}
    >
      <path d={`M100 ${y}c-${18+i*2} 0-${30+i*2} -8-${36+i*2} -18 ${14+i*2} -2 ${28+i*2} 4 ${36+i*2} 18z`}/>
      <path d={`M100 ${y}c${18+i*2} 0 ${30+i*2} -8 ${36+i*2} -18-${14+i*2} -2-${28+i*2} 4-${36+i*2} 18z`}/>
      <path d={`M100 ${y}c-${12+i} -4-${22+i} -8-${30+i} -14M100 ${y}c${12+i} -4 ${22+i} -8 ${30+i} -14`}/>
    </g>
  ))

  return (
    <svg viewBox="0 0 200 280" width={size} height={size * 1.4} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* roots — stay anchored */}
      <path d="M100 270c-4 6-10 8-18 10M100 270c4 6 10 8 20 10M100 270c-2 8-6 14-12 18M100 270c2 8 6 14 14 20M100 270c-8 2-16 2-22 0M100 270c8 2 16 2 24 0"/>
      {/* above-ground drifts in breeze */}
      <g className="herb-drift">
        <path d="M100 270c0-50 0-100 0-160"/>
        {leafPairs}
        {/* berry crown bobs */}
        <g className="herb-crown">
          <g className="berry-pulse">
            <circle cx="88" cy="100" r="7"/>
            <path d="M88 100c-6-2-10-6-12-12 8-2 14 2 18 8M88 100c4-6 10-10 18-8M88 93l-3-6M88 93l5-4"/>
          </g>
          <g className="berry-pulse berry-pulse--b">
            <circle cx="112" cy="92" r="6"/>
            <path d="M112 92c-6-2-10-5-12-11 8-2 14 2 18 6M112 92c4-6 10-9 18-6"/>
          </g>
          <g className="berry-pulse berry-pulse--c">
            <circle cx="100" cy="76" r="5"/>
            <path d="M100 76c-5-2-8-4-10-9 7-2 12 1 16 4M100 76c3-5 8-7 14-4"/>
          </g>
          <g style={{ opacity: 0.7 }}>
            <circle cx="75" cy="135" r="2.5"/>
            <circle cx="125" cy="148" r="2.5"/>
            <circle cx="70" cy="170" r="2.5"/>
          </g>
        </g>
      </g>
    </svg>
  )
}

// ─── Background silhouette for entry header ───────────────────────────────────

export function HerbSilhouette({ size = 520, sw = 0.6 }: { size?: number; sw?: number }) {
  const leafPairs = [520, 460, 400, 340, 280, 220].map((y, i) => (
    <g key={i}>
      <path d={`M200 ${y}c-${50+i*4} 0-${80+i*4} -20-${90+i*4} -50 ${38+i*4} -4 ${72+i*4} 14 ${90+i*4} 50z`}/>
      <path d={`M200 ${y}c${50+i*4} 0 ${80+i*4} -20 ${90+i*4} -50-${38+i*4} -4-${72+i*4} 14-${90+i*4} 50z`}/>
    </g>
  ))
  return (
    <svg viewBox="0 0 400 600" width={size} height={size * 1.5} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M200 580c0-100 0-200 0-340"/>
      <path d="M200 580c-10 10-24 14-44 18M200 580c10 10 24 14 44 18M200 580c-4 14-12 24-22 32M200 580c4 14 12 24 22 32"/>
      {leafPairs}
      <circle cx="180" cy="180" r="14"/>
      <circle cx="220" cy="160" r="12"/>
      <circle cx="200" cy="130" r="10"/>
    </svg>
  )
}

// ─── Decorative section rule with leaf ───────────────────────────────────────

export function SectionRule({ width = 600, color }: { width?: number; color?: string }) {
  const w = width
  return (
    <svg viewBox={`0 0 ${w} 24`} width="100%" height="24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ display: 'block', color }}>
      <line x1="0" y1="12" x2={w/2 - 40} y2="12"/>
      <line x1={w/2 + 40} y1="12" x2={w} y2="12"/>
      <path d={`M${w/2-36} 12c0-5 4-9 9-9-1 4 1 9 9 9-8 0-10 5-9 9-5 0-9-4-9-9z`}/>
      <path d={`M${w/2+36} 12c0-5-4-9-9-9 1 4-1 9-9 9 8 0 10 5 9 9 5 0 9-4 9-9z`}/>
      <circle cx={w/2} cy="12" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

// ─── Nav mark / monogram ──────────────────────────────────────────────────────

export function Mark({ size = 28, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="20" r="17"/>
      <path d="M20 32c0-8 0-16 0-22"/>
      <path d="M20 22c-5 0-9-3-11-8 6 0 10 3 11 8z"/>
      <path d="M20 22c5 0 9-3 11-8-6 0-10 3-11 8z"/>
      <path d="M20 14c-3 0-6-2-7-5 4 0 6 2 7 5z"/>
      <path d="M20 14c3 0 6-2 7-5-4 0-6 2-7 5z"/>
    </svg>
  )
}

// ─── Footer center ornament ───────────────────────────────────────────────────

export function FooterOrnament({ size = 80, sw = 1 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 120 80" width={size} height={size * 80/120} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M60 70c0-20 0-40 0-58"/>
      <path d="M60 50c-12 0-22-6-26-18 12 0 22 6 26 18z"/>
      <path d="M60 50c12 0 22-6 26-18-12 0-22 6-26 18z"/>
      <path d="M60 30c-8 0-16-4-20-12 10 0 17 4 20 12z"/>
      <path d="M60 30c8 0 16-4 20-12-10 0-17 4-20 12z"/>
      <circle cx="60" cy="14" r="3"/>
    </svg>
  )
}

// ─── Verification seal ────────────────────────────────────────────────────────

export function Seal({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M8 12l3 3 5-6"/>
    </svg>
  )
}

// ─── Moth SVG ─────────────────────────────────────────────────────────────────

export function MothSVG({ size = 26, sw = 0.8 }: { size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 40 28" width={size} height={size * 28/40} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      <ellipse cx="20" cy="14" rx="1.1" ry="4.2" fill="currentColor" stroke="none"/>
      <path d="M20 10c-1-2-3-3-4.5-2.6"/>
      <path d="M20 10c1-2 3-3 4.5-2.6"/>
      <g className="flap-l">
        <path d="M19.2 12c-6-5-13-4-15 1-1 3 2 5 6 5 4 0 7-2 9-3"/>
        <path d="M19.2 16c-4 1-10 4-11 8-0.5 2 3 2.5 6 1.5 3-1 5-3 5-5"/>
        <path d="M11 13c2 0 4 1 5 2"/>
      </g>
      <g className="flap-r">
        <path d="M20.8 12c6-5 13-4 15 1 1 3-2 5-6 5-4 0-7-2-9-3"/>
        <path d="M20.8 16c4 1 10 4 11 8 0.5 2-3 2.5-6 1.5-3-1-5-3-5-5"/>
        <path d="M29 13c-2 0-4 1-5 2"/>
      </g>
    </svg>
  )
}

// ─── Tendril vine (used by GrowingTendrilRule) ────────────────────────────────

export function TendrilSVG({ width = 600, color }: { width?: number; color?: string }) {
  return (
    <svg viewBox={`0 0 ${width} 56`} width="100%" height="56" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ display: 'block', color }}>
      <line x1="0" y1="28" x2={width/2 - 80} y2="28"/>
      <line x1={width/2 + 80} y1="28" x2={width} y2="28"/>
      <path d={`M${width/2 - 80} 28 c -8 -6 -18 -8 -28 -4 c -6 3 -8 9 -4 14 c 3 4 9 4 12 0 c 2 -3 1 -7 -2 -8`}/>
      <path d={`M${width/2 + 80} 28 c 8 6 18 8 28 4 c 6 -3 8 -9 4 -14 c -3 -4 -9 -4 -12 0 c -2 3 -1 7 2 8`}/>
      <path d={`M${width/2} 28 c 0 -8 -4 -14 -4 -22`}/>
      <path d={`M${width/2} 28 c 0 8 4 14 4 22`}/>
      <path className="leaf" d={`M${width/2 - 4} 6 c -4 -2 -8 -6 -10 -12 c 6 0 12 4 14 10 z`}/>
      <path className="leaf" d={`M${width/2 + 4} 50 c 4 2 8 6 10 12 c -6 0 -12 -4 -14 -10 z`}/>
      <circle className="leaf" cx={width/2} cy="28" r="2" fill="currentColor" stroke="none"/>
    </svg>
  )
}
