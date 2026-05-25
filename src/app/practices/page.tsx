'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  forest:    '#2c3d26',
  sage:      '#7a8c6e',
  clay:      '#b5694f',
  cream:     '#faf6ec',
  parchment: '#f2ead8',
  border:    '#d8cebc',
  warmGray:  '#8a8070',
  white:     '#ffffff',
} as const

const FONT = {
  serif: `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:  `var(--font-dm-mono, 'DM Mono', monospace)`,
} as const

// ─── Domain data ──────────────────────────────────────────────────────────────

interface Domain {
  id:         string
  label:      string
  title:      string
  desc:       string
  href:       string
  accent:     string
  accentDark: string   // ~30% darker, for hover border
}

const DOMAINS: Domain[] = [
  {
    id:         'body-rituals',
    label:      'Body & Oils',
    title:      'Body Rituals',
    desc:       'Oil pulling, nasya, abhyanga, castor oil packs, navel oiling, gua sha. Practices that tend the body as a sacred vessel through touch, heat, and plant oils.',
    href:       '/practices/body-rituals',
    accent:     '#c9a030',
    accentDark: '#8d7022',
  },
  {
    id:         'skin-care',
    label:      'Skin Traditions',
    title:      'Skin Care',
    desc:       'Turmeric ubtan, clay masks, rosewater, black seed oil, chebe preparations. Plant-based skincare passed through generations of women as daily devotion.',
    href:       '/practices/skin-care',
    accent:     '#c49a8a',
    accentDark: '#896c61',
  },
  {
    id:         'hair-care',
    label:      'Hair Wisdom',
    title:      'Hair Care',
    desc:       'Rosemary water, amla oiling, rice water rinses, scalp massage lineages. Traditional hair care as a practice of nourishment, not vanity.',
    href:       '/practices/hair-care',
    accent:     '#8b4a2a',
    accentDark: '#61341d',
  },
  {
    id:         'internal-cleansing',
    label:      'Internal Wisdom',
    title:      'Internal Cleansing',
    desc:       'Kitchari cleanses, fire cider, bitters traditions, mushroom tonics, bone broth protocols. Food as medicine — the seasonal intelligence of what to eat and when.',
    href:       '/practices/internal-cleansing',
    accent:     '#7a8c6e',
    accentDark: '#55624d',
  },
  {
    id:         'reproductive-wisdom',
    label:      'Cyclical Wisdom',
    title:      'Reproductive & Cyclical',
    desc:       'From menarche to menopause — seed cycling, womb steaming, postpartum care, hormonal herbs. The full arc of the female body held with knowledge and dignity.',
    href:       '/practices/reproductive-wisdom',
    accent:     '#7a5c8c',
    accentDark: '#554062',
  },
  {
    id:         'energetic-spiritual',
    label:      'Energetic Work',
    title:      'Energetic & Spiritual',
    desc:       'Smudging, flower baths, limpias, sobadas, sacred baths, sound healing. Practices that tend the body at the level of energy, spirit, and the invisible.',
    href:       '/practices/energetic-spiritual',
    accent:     '#5a7a4a',
    accentDark: '#3f5534',
  },
  {
    id:         'contemplative',
    label:      'Inner Practice',
    title:      'Contemplative',
    desc:       'Vipassana, yoga nidra, pranayama, zazen, somatic release, indigenous sweat lodge. Disciplined ancestral technologies of consciousness — not wellness trends.',
    href:       '/practices/contemplative',
    accent:     '#3d5235',
    accentDark: '#2b3925',
  },
  {
    id:         'seasonal',
    label:      'Seasonal Living',
    title:      'Seasonal Wisdom',
    desc:       'Lunar planting, seasonal eating by dosha, foraging ethics, seed keeping, living in rhythm with land and climate. The ecological intelligence beneath all practice.',
    href:       '/practices/seasonal',
    accent:     '#b5694f',
    accentDark: '#7f4a37',
  },
]

// ─── Header mandala ───────────────────────────────────────────────────────────

function MandalaIllustration() {
  const C = 200
  const dirs8   = [0, 45, 90, 135, 180, 225, 270, 315]
  const dirsOff = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]

  const pt = (deg: number, r: number) => {
    const rad = ((deg - 90) * Math.PI) / 180
    return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) }
  }

  return (
    <svg
      width="400" height="400" viewBox="0 0 400 400"
      fill="none" stroke="currentColor"
      strokeLinecap="round" aria-hidden="true"
    >
      {/* Concentric rings */}
      <circle cx={C} cy={C} r="182" strokeWidth="0.5" strokeDasharray="3 8" />
      <circle cx={C} cy={C} r="150" strokeWidth="0.6" />
      <circle cx={C} cy={C} r="115" strokeWidth="0.6" />
      <circle cx={C} cy={C} r="78"  strokeWidth="0.6" />
      <circle cx={C} cy={C} r="44"  strokeWidth="0.6" />
      <circle cx={C} cy={C} r="8"   strokeWidth="0.6" />

      {/* 8 main radial lines: center → r=150 */}
      {dirs8.map((deg) => {
        const end = pt(deg, 150)
        return (
          <line
            key={`main-${deg}`}
            x1={C} y1={C} x2={end.x} y2={end.y}
            strokeWidth="0.5"
          />
        )
      })}

      {/* 8 short marks between rings 115→150, at offset angles */}
      {dirsOff.map((deg) => {
        const s = pt(deg, 115)
        const e = pt(deg, 150)
        return (
          <line
            key={`short-${deg}`}
            x1={s.x} y1={s.y} x2={e.x} y2={e.y}
            strokeWidth="0.5"
          />
        )
      })}

      {/* 8 petals (ellipses) between r=44 and r=78 */}
      {dirs8.map((deg) => (
        <ellipse
          key={`petal-${deg}`}
          cx={C} cy={C - 61}
          rx="10" ry="17"
          transform={`rotate(${deg}, ${C}, ${C})`}
          strokeWidth="0.7"
        />
      ))}

      {/* 8 small circles on the r=115 ring */}
      {dirs8.map((deg) => {
        const p = pt(deg, 115)
        return <circle key={`dot-${deg}`} cx={p.x} cy={p.y} r="4" strokeWidth="0.6" />
      })}

      {/* 8 tiny diamonds at r=78 ring, offset angles */}
      {dirsOff.map((deg) => {
        const p = pt(deg, 78)
        return (
          <rect
            key={`diamond-${deg}`}
            x={p.x - 3.5} y={p.y - 3.5}
            width="7" height="7"
            transform={`rotate(45, ${p.x}, ${p.y})`}
            strokeWidth="0.5"
          />
        )
      })}
    </svg>
  )
}

// ─── Domain icons (stroke-only, 80×80 viewBox) ────────────────────────────────

function OilLeafIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {/* Leaf */}
      <path d="M 40 6 C 20 18 18 52 40 65 C 62 52 60 18 40 6 Z" />
      {/* Center vein */}
      <line x1="40" y1="6" x2="40" y2="65" />
      {/* Lateral veins */}
      <path d="M 40 26 L 24 34" />
      <path d="M 40 26 L 56 34" />
      <path d="M 40 44 L 26 52" />
      <path d="M 40 44 L 54 52" />
      {/* Oil drop */}
      <path d="M 40 70 C 36 70 32 73 40 78 C 48 73 44 70 40 70 Z" />
    </svg>
  )
}

function FlowerPetalIcon() {
  // 5 petals rotated around center (40,40)
  const petals = [0, 72, 144, 216, 288]
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="40" cy="22"
          rx="8" ry="18"
          transform={`rotate(${deg}, 40, 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="6" />
    </svg>
  )
}

function SpiralRootIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {/* Inward spiral */}
      <path d="M 40 8 A 18 18 0 1 0 22 40 A 10 10 0 1 1 40 30" />
      {/* Root system below */}
      <path d="M 36 42 L 24 60 L 16 74" />
      <path d="M 40 44 L 40 66 L 40 74" />
      <path d="M 44 42 L 56 60 L 64 74" />
      <path d="M 24 60 L 18 72" />
      <path d="M 56 60 L 62 72" />
    </svg>
  )
}

function VesselSeedIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {/* Vessel body */}
      <path d="M 14 26 L 14 50 A 26 26 0 0 0 66 50 L 66 26" />
      {/* Rim */}
      <line x1="10" y1="26" x2="70" y2="26" />
      {/* 3 seeds */}
      <ellipse cx="28" cy="42" rx="8" ry="5" transform="rotate(-12, 28, 42)" />
      <ellipse cx="40" cy="46" rx="8" ry="5" />
      <ellipse cx="52" cy="42" rx="8" ry="5" transform="rotate(12, 52, 42)" />
      {/* Seed line detail */}
      <line x1="28" y1="37.5" x2="28" y2="46.5" transform="rotate(-12, 28, 42)" />
      <line x1="40" y1="41" x2="40" y2="51" />
      <line x1="52" y1="37.5" x2="52" y2="46.5" transform="rotate(12, 52, 42)" />
    </svg>
  )
}

function MoonCycleIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {/* Crescent: outer arc */}
      <path d="M 22 14 A 26 26 0 0 1 22 66" />
      {/* Crescent: inner arc (reverse) */}
      <path d="M 22 14 A 18 18 0 0 0 22 66" />
      {/* Cycle phase dots */}
      <circle cx="58" cy="18" r="3.5" />
      <circle cx="68" cy="40" r="3.5" />
      <circle cx="58" cy="62" r="3.5" />
      <circle cx="44" cy="72" r="3.5" />
      {/* Connection arcs between dots */}
      <path d="M 58 22 A 12 12 0 0 1 68 36" strokeWidth="0.8" />
      <path d="M 68 44 A 12 12 0 0 1 58 58" strokeWidth="0.8" />
      <path d="M 56 65 A 10 10 0 0 1 47 70" strokeWidth="0.8" />
    </svg>
  )
}

function SmokeWaveIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {/* Base line */}
      <line x1="18" y1="70" x2="62" y2="70" />
      {/* 3 wavy rising lines */}
      <path d="M 28 70 C 20 57 36 49 28 36 C 20 23 36 14 28 6" />
      <path d="M 40 70 C 32 57 48 49 40 36 C 32 23 48 14 40 6" />
      <path d="M 52 70 C 44 57 60 49 52 36 C 44 23 60 14 52 6" />
    </svg>
  )
}

function BreathCircleIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {/* Outermost circle — almost closed, gap at top */}
      <path d="M 40 10 A 30 30 0 1 1 36 10.4" />
      {/* Middle circle */}
      <circle cx="40" cy="40" r="20" />
      {/* Inner circle */}
      <circle cx="40" cy="40" r="10" />
      {/* Center point */}
      <circle cx="40" cy="40" r="2.5" strokeWidth="2" />
      {/* Single radial line upward — breath direction */}
      <line x1="40" y1="30" x2="40" y2="10" strokeWidth="0.8" strokeDasharray="2 3" />
    </svg>
  )
}

function SunLeafIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {/* Sun circle */}
      <circle cx="40" cy="28" r="11" />
      {/* 8 rays — alternating reach */}
      <line x1="40" y1="17" x2="40" y2="6" />
      <line x1="48" y1="20" x2="55" y2="13" />
      <line x1="51" y1="28" x2="64" y2="28" />
      <line x1="48" y1="36" x2="55" y2="43" />
      {/* S ray goes toward leaf — shortened */}
      <line x1="40" y1="39" x2="40" y2="46" />
      <line x1="32" y1="36" x2="25" y2="43" />
      <line x1="29" y1="28" x2="16" y2="28" />
      <line x1="32" y1="20" x2="25" y2="13" />
      {/* Leaf below */}
      <path d="M 40 50 Q 54 60 40 74 Q 26 60 40 50 Z" />
      {/* Leaf vein */}
      <line x1="40" y1="50" x2="40" y2="74" />
    </svg>
  )
}

// ─── Icon dispatcher ──────────────────────────────────────────────────────────

function DomainIcon({ id }: { id: string }) {
  switch (id) {
    case 'body-rituals':        return <OilLeafIcon />
    case 'skin-care':           return <FlowerPetalIcon />
    case 'hair-care':           return <SpiralRootIcon />
    case 'internal-cleansing':  return <VesselSeedIcon />
    case 'reproductive-wisdom': return <MoonCycleIcon />
    case 'energetic-spiritual': return <SmokeWaveIcon />
    case 'contemplative':       return <BreathCircleIcon />
    case 'seasonal':            return <SunLeafIcon />
    default:                    return <OilLeafIcon />
  }
}

// ─── Domain card ──────────────────────────────────────────────────────────────

function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.48, delay: index * 0.04, ease: 'easeOut' }}
    >
      <Link href={domain.href} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="min-h-[200px] md:min-h-[280px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background:     hovered ? `${domain.accent}08` : T.white,
            borderLeft:     `4px solid ${hovered ? domain.accentDark : domain.accent}`,
            padding:        '2.5rem 3rem',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'space-between',
            position:       'relative',
            overflow:       'hidden',
            transition:     'background-color 280ms ease, border-color 280ms ease',
          }}
        >
          {/* Decorative domain icon — right side, nearly invisible */}
          <div
            aria-hidden="true"
            style={{
              position:  'absolute',
              right:     '2.5rem',
              top:       '50%',
              transform: 'translateY(-50%)',
              opacity:   0.08,
              color:     T.forest,
              width:     '80px',
              height:    '80px',
            }}
          >
            <DomainIcon id={domain.id} />
          </div>

          {/* Top content */}
          <div>
            {/* Category label */}
            <p
              style={{
                fontFamily:    FONT.mono,
                fontSize:      '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         domain.accent,
                marginBottom:  '0.75rem',
              }}
            >
              {domain.label}
            </p>

            {/* Title */}
            <h2
              style={{
                fontFamily:   FONT.serif,
                fontStyle:    'italic',
                fontWeight:   300,
                fontSize:     '2rem',
                color:        T.forest,
                lineHeight:   1.1,
                marginBottom: '1rem',
              }}
            >
              {domain.title}
            </h2>

            {/* Description */}
            <p
              style={{
                fontFamily:  FONT.serif,
                fontWeight:  300,
                fontSize:    '1rem',
                color:       T.warmGray,
                lineHeight:  1.75,
                maxWidth:    '480px',
              }}
            >
              {domain.desc}
            </p>
          </div>

          {/* Bottom — Explore link */}
          <div
            style={{
              display:        'flex',
              justifyContent: 'flex-end',
              marginTop:      '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily:    FONT.mono,
                fontSize:      '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         domain.accent,
                transform:     hovered ? 'translateX(4px)' : 'translateX(0)',
                transition:    'transform 280ms ease',
                display:       'inline-block',
              }}
            >
              Explore →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PracticesPage() {
  return (
    <article style={{ minHeight: '100vh', background: T.cream }}>

      {/* ── Forest header ── */}
      <div
        style={{
          background: T.forest,
          padding:    '5rem 7vw',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        {/* Mandala — right side, 8% opacity */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            right:         '7vw',
            top:           '50%',
            transform:     'translateY(-50%)',
            opacity:       0.08,
            width:         '400px',
            height:        '400px',
            color:         T.parchment,
            pointerEvents: 'none',
          }}
        >
          <MandalaIllustration />
        </div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
          style={{
            fontFamily:    FONT.mono,
            fontSize:      '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         T.sage,
            marginBottom:  '1.25rem',
          }}
        >
          Eight domains of ancestral knowing
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: 'easeOut' }}
          style={{
            fontFamily:    FONT.serif,
            fontWeight:    300,
            fontSize:      'clamp(2.5rem, 6vw, 5rem)',
            color:         T.parchment,
            lineHeight:    1.0,
            letterSpacing: '-0.01em',
            marginBottom:  '1.5rem',
          }}
        >
          Practices
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
          style={{
            fontFamily:  FONT.serif,
            fontStyle:   'italic',
            fontWeight:  300,
            fontSize:    '1.1rem',
            color:       'rgba(242, 234, 216, 0.65)',
            lineHeight:  1.75,
            maxWidth:    '520px',
          }}
        >
          The herbal archive is one room. These are the others — the oil rituals, the
          sacred baths, the breath practices, the seasonal wisdom. Ancestral wellness
          was never just about what you ingested.
        </motion.p>
      </div>

      {/* ── Domain grid section ── */}
      <div style={{ paddingTop: '3rem' }}>

        {/* Section label */}
        <p
          style={{
            fontFamily:    FONT.mono,
            fontSize:      '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         T.warmGray,
            padding:       '0 7vw',
            marginBottom:  '2rem',
          }}
        >
          The eight domains
        </p>

        {/* Tile grid — 1.5px gap reveals container background as hairline */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '1.5px', background: T.border }}
        >
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </div>

      {/* ── Archive note ── */}
      <div
        style={{
          padding:        '5rem 7vw',
          display:        'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <p
            style={{
              fontFamily:   FONT.serif,
              fontStyle:    'italic',
              fontWeight:   300,
              fontSize:     '1.1rem',
              color:        T.warmGray,
              lineHeight:   1.85,
              marginBottom: '1.75rem',
            }}
          >
            Every practice in this archive is documented with its tradition of origin,
            region, and source. Nothing here is decontextualized wellness content.
            These practices belong to lineages — and those lineages are named.
          </p>
          <Link
            href="/contribute"
            style={{
              fontFamily:    FONT.mono,
              fontSize:      '0.58rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         T.clay,
              textDecoration: 'none',
              borderBottom:  `1px solid ${T.clay}`,
              paddingBottom: '1px',
            }}
          >
            Read about our source standard →
          </Link>
        </div>
      </div>

    </article>
  )
}
