'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { herbs } from '@/lib/data/herbs'

// ─── Tokens ───────────────────────────────────────────────────────────────────

const T = {
  forest:    '#2c3d26',
  moss:      '#3d5235',
  sage:      '#7a8c6e',
  fern:      '#5a7a4a',
  clay:      '#b5694f',
  terracotta:'#c4714a',
  ochre:     '#c9a030',
  sienna:    '#8b4a2a',
  dustyRose: '#c49a8a',
  plum:      '#7a5c8c',
  cream:     '#faf6ec',
  parchment: '#f2ead8',
  warmWhite: '#fdfaf3',
  border:    '#d8cebc',
  warmGray:  '#8a8070',
  ink:       '#1a1810',
} as const

const FONT = {
  serif:  `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:   `var(--font-dm-mono, 'DM Mono', 'Courier New', monospace)`,
  accent: `var(--font-libre, 'Libre Baskerville', Georgia, serif)`,
} as const

// ─── Reusable animation props ─────────────────────────────────────────────────

const scrollReveal = {
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.7 },
} as const

const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

// ─── Hero Botanical SVG ───────────────────────────────────────────────────────
// Radial mandala: 8 rotating stem+leaf groups, concentric rings, central node.
// Rendered white; container applies opacity: 0.12 over forest green.

function BotanicalHeroSVG() {
  const cx = 350, cy = 350
  const angles = [0, 45, 90, 135, 180, 225, 270, 315]

  // Upward template (rotated to each angle by SVG transform)
  const STEM     = `M ${cx} ${cy - 38} L ${cx} ${cy - 265}`
  const LEAF_L   = `M ${cx} ${cy - 160} C ${cx - 34} ${cy - 185} ${cx - 44} ${cy - 218} ${cx - 16} ${cy - 230} C ${cx - 4} ${cy - 236} ${cx} ${cy - 210} ${cx} ${cy - 182} Z`
  const LEAF_R   = `M ${cx} ${cy - 160} C ${cx + 34} ${cy - 185} ${cx + 44} ${cy - 218} ${cx + 16} ${cy - 230} C ${cx + 4} ${cy - 236} ${cx} ${cy - 210} ${cx} ${cy - 182} Z`
  const TIP_L    = `M ${cx} ${cy - 248} C ${cx - 14} ${cy - 256} ${cx - 18} ${cy - 274} ${cx - 7} ${cy - 279} C ${cx - 1} ${cy - 281} ${cx} ${cy - 266} Z`
  const TIP_R    = `M ${cx} ${cy - 248} C ${cx + 14} ${cy - 256} ${cx + 18} ${cy - 274} ${cx + 7} ${cy - 279} C ${cx + 1} ${cy - 281} ${cx} ${cy - 266} Z`

  return (
    <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Concentric decorative rings */}
      <circle cx={cx} cy={cy} r={278} stroke="white" strokeWidth="0.6" opacity="0.7"/>
      <circle cx={cx} cy={cy} r={174} stroke="white" strokeWidth="0.7" strokeDasharray="4 7" opacity="0.9"/>
      <circle cx={cx} cy={cy} r={80}  stroke="white" strokeWidth="0.5" strokeDasharray="2 5" opacity="0.8"/>

      {/* Central node */}
      <circle cx={cx} cy={cy} r={34} stroke="white" strokeWidth="1.6"/>
      <circle cx={cx} cy={cy} r={18} stroke="white" strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r={5}  fill="white"/>

      {/* 8 rotated stem + leaf groups */}
      {angles.map(angle => (
        <g key={angle} transform={`rotate(${angle} ${cx} ${cy})`}>
          <path d={STEM}   stroke="white" strokeWidth="0.9" fill="none"/>
          <path d={LEAF_L} stroke="white" strokeWidth="0.85" fill="white" fillOpacity="0.07"/>
          <path d={LEAF_R} stroke="white" strokeWidth="0.85" fill="white" fillOpacity="0.07"/>
          <path d={TIP_L}  stroke="white" strokeWidth="0.7"  fill="white" fillOpacity="0.05"/>
          <path d={TIP_R}  stroke="white" strokeWidth="0.7"  fill="white" fillOpacity="0.05"/>
          <circle cx={cx}  cy={cy - 278} r={3.5} fill="white"/>
          {/* Small leaf node on stem mid-point */}
          <circle cx={cx}  cy={cy - 120} r={2} fill="white" opacity="0.6"/>
        </g>
      ))}

      {/* Ornamental dots at inner ring, between stems */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(angle => {
        const r = (angle * Math.PI) / 180
        return (
          <circle
            key={angle}
            cx={cx + 174 * Math.sin(r)}
            cy={cy - 174 * Math.cos(r)}
            r={2} fill="white" opacity="0.5"
          />
        )
      })}
    </svg>
  )
}

// ─── Domain icon SVGs (60×60 viewBox, stroke="currentColor") ─────────────────

function IconBotica() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Mortar */}
      <path d="M12,44 Q15,30 30,27 Q45,30 48,44"/>
      <ellipse cx="30" cy="44" rx="18" ry="7"/>
      {/* Herb sprig in mortar */}
      <line x1="30" y1="27" x2="30" y2="15"/>
      <path d="M30,20 C22,16 18,8 26,6 C30,5 30,14 30,17Z"/>
      <path d="M30,20 C38,16 42,8 34,6 C30,5 30,14 30,17Z"/>
      <path d="M30,15 C24,11 22,5 28,4 C30.5,3.5 30,11 30,13Z"/>
    </svg>
  )
}

function IconBodyRituals() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      {/* Oil drop */}
      <path d="M30,8 C20,18 13,28 13,38 C13,47 21,53 30,53 C39,53 47,47 47,38 C47,28 40,18 30,8Z"/>
      {/* Inner highlight curve */}
      <path d="M22,36 Q25,43 30,46" strokeWidth="1" opacity="0.7"/>
      {/* Small drops above */}
      <circle cx="22" cy="14" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="11" r="1.5" fill="currentColor" opacity="0.4"/>
    </svg>
  )
}

function IconSkinCare() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Flower center */}
      <circle cx="30" cy="30" r="6"/>
      {/* 6 petals */}
      {[0, 60, 120, 180, 240, 300].map(a => {
        const r = (a * Math.PI) / 180
        const px = 30 + 16 * Math.sin(r)
        const py = 30 - 16 * Math.cos(r)
        const cx1 = 30 + 22 * Math.sin(r - 0.4)
        const cy1 = 30 - 22 * Math.cos(r - 0.4)
        const cx2 = 30 + 22 * Math.sin(r + 0.4)
        const cy2 = 30 - 22 * Math.cos(r + 0.4)
        const tip_x = 30 + 24 * Math.sin(r)
        const tip_y = 30 - 24 * Math.cos(r)
        return (
          <path key={a}
            d={`M ${px.toFixed(1)} ${py.toFixed(1)} C ${cx1.toFixed(1)} ${cy1.toFixed(1)} ${tip_x.toFixed(1)} ${tip_y.toFixed(1)} ${tip_x.toFixed(1)} ${tip_y.toFixed(1)} C ${cx2.toFixed(1)} ${cy2.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)} Z`}
            strokeWidth="1.1"
          />
        )
      })}
    </svg>
  )
}

function IconHairCare() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      {/* Three flowing strands */}
      <path d="M18,8 C16,20 22,30 18,50"/>
      <path d="M30,6 C28,18 32,30 30,52"/>
      <path d="M42,8 C44,20 38,30 42,50"/>
      {/* Small leaf pairs mid-strand */}
      <path d="M18,28 C12,24 10,16 16,14" strokeWidth="0.9"/>
      <path d="M30,26 C24,22 22,14 28,12" strokeWidth="0.9"/>
      <path d="M42,28 C48,24 50,16 44,14" strokeWidth="0.9"/>
    </svg>
  )
}

function IconReproductive() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      {/* Crescent moon */}
      <path d="M40,10 A22,22 0 1 0 40,50 A14,14 0 1 1 40,10Z"/>
      {/* Leaf beside moon */}
      <path d="M44,30 C50,22 55,20 53,12 C51,8 44,17 44,26Z"/>
      <line x1="44" y1="30" x2="53" y2="14" strokeWidth="0.8"/>
    </svg>
  )
}

function IconEnergetic() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      {/* Central circle */}
      <circle cx="30" cy="30" r="7"/>
      {/* 8 radiating lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
        const r = (a * Math.PI) / 180
        const x1 = 30 + 10 * Math.sin(r)
        const y1 = 30 - 10 * Math.cos(r)
        const x2 = 30 + 22 * Math.sin(r)
        const y2 = 30 - 22 * Math.cos(r)
        return <line key={a} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)}/>
      })}
      {/* Outer ring */}
      <circle cx="30" cy="30" r="26" strokeDasharray="3 4" opacity="0.7"/>
    </svg>
  )
}

function IconContemplative() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <circle cx="30" cy="30" r="22"/>
      <circle cx="30" cy="30" r="13" strokeWidth="1"/>
      <circle cx="30" cy="30" r="5" strokeWidth="0.8"/>
      <circle cx="30" cy="30" r="1.5" fill="currentColor"/>
      {/* Four axis marks on outer ring */}
      <path d="M30,8 L30,6" strokeWidth="1.5"/>
      <path d="M30,52 L30,54" strokeWidth="1.5"/>
      <path d="M8,30 L6,30" strokeWidth="1.5"/>
      <path d="M52,30 L54,30" strokeWidth="1.5"/>
    </svg>
  )
}

function IconSeasonal() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <circle cx="30" cy="30" r="22"/>
      <line x1="30" y1="8" x2="30" y2="52" strokeWidth="0.7"/>
      <line x1="8" y1="30" x2="52" y2="30" strokeWidth="0.7"/>
      {/* Spring quadrant: leaf */}
      <path d="M36,18 C40,14 44,16 42,20 C41,22 36,20 36,18Z" strokeWidth="0.9"/>
      {/* Summer quadrant: small sun rays */}
      <circle cx="20" cy="20" r="3" strokeWidth="0.9"/>
      <path d="M17,17 L15,15 M20,16 L20,13 M23,17 L25,15" strokeWidth="0.8"/>
      {/* Autumn: drop */}
      <path d="M38,40 C35,44 35,48 38,48 C41,48 41,44 38,40Z" strokeWidth="0.9"/>
      {/* Winter: asterisk */}
      <path d="M20,40 L20,46 M17,41 L23,45 M17,45 L23,41" strokeWidth="0.9"/>
    </svg>
  )
}

// ─── Domain data ──────────────────────────────────────────────────────────────

const DOMAINS = [
  {
    id: 'botica',
    label: 'Materia Medica',
    name: 'The Botica',
    description: 'Herbs, roots, and plant medicines from 20 living traditions.',
    href: '/botica',
    accent: T.forest,
    Icon: IconBotica,
  },
  {
    id: 'body-rituals',
    label: 'Body & Oils',
    name: 'Body Rituals',
    description: 'Oil practices, steam baths, and ancestral body tending.',
    href: '/practices/body-rituals',
    accent: T.ochre,
    Icon: IconBodyRituals,
  },
  {
    id: 'skin-care',
    label: 'Skin Traditions',
    name: 'Skin Care',
    description: 'Plant-based treatments passed through generations of women.',
    href: '/practices/skin-care',
    accent: T.dustyRose,
    Icon: IconSkinCare,
  },
  {
    id: 'hair-care',
    label: 'Hair Wisdom',
    name: 'Hair Care',
    description: 'Oil rituals, rinses, and treatments for every texture.',
    href: '/practices/hair-care',
    accent: T.sienna,
    Icon: IconHairCare,
  },
  {
    id: 'reproductive',
    label: 'Cyclical Wisdom',
    name: 'Reproductive & Cyclical',
    description: 'From menarche to menopause — the full arc of the body.',
    href: '/practices/reproductive-wisdom',
    accent: T.plum,
    Icon: IconReproductive,
  },
  {
    id: 'energetic',
    label: 'Energetic & Spiritual',
    name: 'Energetic Work',
    description: 'Ceremony, clearing, and practices that tend the invisible.',
    href: '/practices/energetic-spiritual',
    accent: T.sage,
    Icon: IconEnergetic,
  },
  {
    id: 'contemplative',
    label: 'Inner Practice',
    name: 'Contemplative',
    description: 'Breathwork, silence, and the interior dimensions of healing.',
    href: '/practices/contemplative',
    accent: T.moss,
    Icon: IconContemplative,
  },
  {
    id: 'seasonal',
    label: 'Seasonal Wisdom',
    name: 'Seasonal Living',
    description: 'How to eat, rest, and tend the body through each season.',
    href: '/practices/seasonal',
    accent: T.clay,
    Icon: IconSeasonal,
  },
] as const

// ─── Seasonal logic ───────────────────────────────────────────────────────────

type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter'

const SEASON_CONFIG: Record<SeasonKey, {
  name: string
  tagline: string
  herbIds: string[]
  practiceNote: string
  accent: string
}> = {
  spring: {
    name: 'Spring',
    tagline: 'What to tend this season',
    herbIds: ['nettle', 'dandelion'],
    practiceNote: 'Morning nettle infusion for iron and spring cleansing.',
    accent: T.fern,
  },
  summer: {
    name: 'Summer',
    tagline: 'What to tend this season',
    herbIds: ['holy-basil', 'elderberry'],
    practiceNote: 'Daily tulsi tea and sun-facing breathwork.',
    accent: T.ochre,
  },
  autumn: {
    name: 'Autumn',
    tagline: 'What to tend this season',
    herbIds: ['echinacea', 'astragalus'],
    practiceNote: 'Long-cooked astragalus broth for deep immune support.',
    accent: T.clay,
  },
  winter: {
    name: 'Winter',
    tagline: 'What to tend this season',
    herbIds: ['ashwagandha', 'reishi'],
    practiceNote: 'Warm ashwagandha milk before sleep.',
    accent: T.sienna,
  },
}

function getSeason(): SeasonKey {
  const m = new Date().getMonth()
  if (m >= 2 && m <= 4) return 'spring'
  if (m >= 5 && m <= 7) return 'summer'
  if (m >= 8 && m <= 10) return 'autumn'
  return 'winter'
}

// ─── Featured herb botanical SVG (Ashwagandha) ───────────────────────────────

function AshwagandhaIllustration() {
  return (
    <svg viewBox="0 0 280 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#2c3d26" strokeLinecap="round" strokeLinejoin="round">
        {/* Root system */}
        <path d="M140,400 Q138,375 136,345" strokeWidth="2.2"/>
        <path d="M136,380 Q118,372 102,360" strokeWidth="1.4"/>
        <path d="M136,380 Q155,372 168,360" strokeWidth="1.4"/>
        <path d="M136,360 Q122,355 108,348" strokeWidth="1"/>
        <path d="M136,360 Q150,355 165,345" strokeWidth="1"/>
        <path d="M136,345 Q128,340 118,334" strokeWidth="0.8"/>
        <path d="M136,345 Q144,340 154,333" strokeWidth="0.8"/>
        {/* Fine root tendrils */}
        <path d="M102,360 Q92,358 84,352" strokeWidth="0.7" opacity="0.6"/>
        <path d="M168,360 Q178,358 186,350" strokeWidth="0.7" opacity="0.6"/>

        {/* Main stem up */}
        <path d="M140,340 Q139,290 138,240 Q137,190 136,140 Q135,100 134,60" strokeWidth="2" fill="none"/>

        {/* Branch 1 — right, low */}
        <path d="M138,280 Q165,268 185,248" strokeWidth="1.5" fill="none"/>
        {/* Leaf pair on branch 1 */}
        <path d="M165,264 C162,252 168,238 176,240 C180,241 178,256 173,264 Z" strokeWidth="1.1"/>
        <path d="M175,252 C172,240 178,226 186,228 C190,229 188,244 183,252 Z" strokeWidth="1.1"/>
        {/* Berries on branch 1 */}
        <circle cx="187" cy="247" r="4" strokeWidth="1.1"/>
        <circle cx="194" cy="240" r="3.5" strokeWidth="1.1"/>
        <circle cx="190" cy="234" r="3" strokeWidth="1"/>

        {/* Branch 2 — left, mid */}
        <path d="M137,220 Q112,205 90,188" strokeWidth="1.5" fill="none"/>
        {/* Leaf on branch 2 */}
        <path d="M112,203 C108,191 114,177 122,179 C126,180 124,195 119,203 Z" strokeWidth="1.1"/>
        <path d="M98,194 C94,182 100,168 108,170 C112,171 110,186 105,194 Z" strokeWidth="1.1"/>
        {/* Berries on branch 2 */}
        <circle cx="88" cy="187" r="4" strokeWidth="1.1"/>
        <circle cx="81" cy="180" r="3.5" strokeWidth="1"/>

        {/* Branch 3 — right, mid-high */}
        <path d="M136,170 Q158,158 176,142" strokeWidth="1.4" fill="none"/>
        <path d="M157,155 C154,143 160,130 168,132 C172,133 170,147 165,155 Z" strokeWidth="1"/>
        <path d="M168,145 C165,133 171,120 179,122 C183,123 181,137 176,145 Z" strokeWidth="1"/>
        <circle cx="177" cy="141" r="3.5" strokeWidth="1"/>
        <circle cx="184" cy="134" r="3" strokeWidth="1"/>

        {/* Branch 4 — left, high */}
        <path d="M135,120 Q115,108 96,95" strokeWidth="1.3" fill="none"/>
        <path d="M115,106 C112,95 118,82 126,84 C130,85 128,99 123,107 Z" strokeWidth="1"/>
        <path d="M102,97 C99,86 105,73 113,75 C117,76 115,90 110,98 Z" strokeWidth="1"/>
        <circle cx="93" cy="94" r="3.5" strokeWidth="1"/>

        {/* Terminal leaves at apex */}
        <path d="M134,70 C130,58 134,44 140,46 C143,47 142,61 138,70 Z" strokeWidth="1"/>
        <path d="M134,70 C138,58 142,44 136,46 C133,47 132,61 134,68 Z" strokeWidth="1"/>
        <path d="M134,60 C126,50 124,36 132,36 C136,36 136,50 134,58 Z" strokeWidth="0.9"/>

        {/* Leaf midrib lines (botanical detail) */}
        <line x1="172" y1="241" x2="170" y2="256" strokeWidth="0.6" opacity="0.5"/>
        <line x1="183" y1="229" x2="181" y2="244" strokeWidth="0.6" opacity="0.5"/>
        <line x1="120" y1="181" x2="118" y2="196" strokeWidth="0.6" opacity="0.5"/>
        <line x1="106" y1="172" x2="104" y2="187" strokeWidth="0.6" opacity="0.5"/>
      </g>
    </svg>
  )
}

// ─── Botanical border decoration for Seasonal section ────────────────────────

function BotanicalBorder() {
  return (
    <svg
      width="100%" height="44"
      viewBox="0 0 1000 44"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="36" x2="1000" y2="36" stroke={T.border} strokeWidth="1"/>
      {/* Stem+berry nodes every 100px */}
      {Array.from({ length: 11 }, (_, i) => i * 100).map(x => (
        <g key={x} transform={`translate(${x}, 36)`}>
          <line x1="0" y1="0" x2="0" y2="-18" stroke={T.ochre} strokeWidth="0.9"/>
          <circle cx="0" cy="-21" r="3" fill={T.ochre} opacity="0.8"/>
        </g>
      ))}
      {/* Stem+leaf pairs between each berry, at x+50 */}
      {Array.from({ length: 10 }, (_, i) => 50 + i * 100).map(x => (
        <g key={x} transform={`translate(${x}, 36)`}>
          <line x1="0" y1="0" x2="0" y2="-13" stroke={T.sage} strokeWidth="0.8"/>
          <path d={`M0,-10 C-7,-14 -10,-22 -4,-25 C-1,-26 0,-17 0,-12Z`}
            fill="none" stroke={T.sage} strokeWidth="0.8"/>
          <path d={`M0,-10 C7,-14 10,-22 4,-25 C1,-26 0,-17 0,-12Z`}
            fill="none" stroke={T.sage} strokeWidth="0.8"/>
        </g>
      ))}
    </svg>
  )
}

// ─── Hero search bar ──────────────────────────────────────────────────────────

function HeroSearch() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
    if (e.key === 'Escape') {
      setQuery('')
      e.currentTarget.blur()
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="What is your body asking for today?"
        aria-label="Search the archive"
        style={{
          width: '100%',
          fontFamily: FONT.serif,
          fontSize: '1.05rem',
          fontStyle: 'italic',
          fontWeight: 300,
          color: T.ink,
          background: T.parchment,
          border: `1px solid ${focused ? T.sage : T.border}`,
          borderRadius: '2px',
          padding: '0.875rem 1.25rem',
          outline: 'none',
          transition: 'border-color 200ms ease',
          display: 'block',
        }}
      />
      {/* Enter hint */}
      {query.length > 0 && (
        <span style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: FONT.mono,
          fontSize: '0.48rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: T.warmGray,
          pointerEvents: 'none',
        }}>
          ↵ search
        </span>
      )}
    </div>
  )
}

// ─── Domain card ──────────────────────────────────────────────────────────────

function DomainCard({ domain }: { domain: typeof DOMAINS[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={domain.href} style={{ display: 'block', height: '100%' }}>
        <div style={{
          background: T.parchment,
          border: `1px solid ${hovered ? domain.accent : T.border}`,
          padding: '1.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem',
          transition: 'border-color 220ms ease-out',
          cursor: 'pointer',
        }}>
          {/* Accent label */}
          <p style={{
            fontFamily: FONT.mono,
            fontSize: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: domain.accent,
            lineHeight: 1.4,
          }}>
            {domain.label}
          </p>

          {/* Icon */}
          <div style={{ width: '52px', height: '52px', color: domain.accent, flexShrink: 0 }}>
            <domain.Icon />
          </div>

          {/* Name */}
          <h3 style={{
            fontFamily: FONT.serif,
            fontSize: '1.2rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: T.forest,
            lineHeight: 1.25,
            margin: 0,
          }}>
            {domain.name}
          </h3>

          {/* Description */}
          <p style={{
            fontFamily: FONT.serif,
            fontSize: '0.875rem',
            fontWeight: 300,
            color: T.warmGray,
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
          }}>
            {domain.description}
          </p>

          {/* CTA */}
          <span style={{
            fontFamily: FONT.mono,
            fontSize: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: hovered ? domain.accent : T.warmGray,
            transition: 'color 220ms ease-out',
          }}>
            Explore →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Polarity badge ───────────────────────────────────────────────────────────

const POLARITY_COLORS: Record<string, string> = {
  yin:      T.plum,
  yang:     T.fern,
  neutral:  T.sage,
  biphasic: T.ochre,
}

function PolarityBadge({ polarity }: { polarity: string }) {
  return (
    <span style={{
      fontFamily: FONT.mono,
      fontSize: '0.48rem',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: POLARITY_COLORS[polarity] ?? T.sage,
      border: `1px solid ${POLARITY_COLORS[polarity] ?? T.sage}`,
      padding: '0.2rem 0.5rem',
      lineHeight: 1.4,
    }}>
      {polarity}
    </span>
  )
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const seasonKey  = getSeason()
  const season     = SEASON_CONFIG[seasonKey]
  const featuredHerb = herbs[0]  // Ashwagandha

  // Seasonal featured herb
  const seasonHerb = herbs.find(h => h.id === season.herbIds[0]) ?? herbs[5]

  // Hero stagger variants
  const heroContainer = {
    initial: {},
    animate: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  }
  const heroItem = {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  }

  return (
    <>
      {/* ────────────────────────────────────────────────────────────────────
          1. HERO — full viewport, forest green
      ──────────────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: T.forest,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Botanical illustration — centered-right, 50% width, 12% opacity */}
        <div style={{
          position: 'absolute',
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '52%',
          opacity: 0.12,
          pointerEvents: 'none',
        }}>
          <motion.div
            animate={{ scale: [1, 1.018, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BotanicalHeroSVG />
          </motion.div>
        </div>

        {/* Left content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 2rem 5rem',
        }}>
          <motion.div
            style={{ maxWidth: '600px' }}
            variants={heroContainer}
            initial="initial"
            animate="animate"
          >
            {/* Archive label */}
            <motion.p variants={heroItem} style={{
              fontFamily: FONT.mono,
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: T.sage,
              marginBottom: '1.25rem',
              lineHeight: 1.4,
            }}>
              A living archive of ancestral wisdom
            </motion.p>

            {/* H1 */}
            <motion.h1 variants={heroItem} style={{
              fontFamily: FONT.serif,
              fontSize: 'clamp(3.5rem, 9vw, 7rem)',
              fontWeight: 300,
              color: T.parchment,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: '1.75rem',
            }}>
              The Garden<br />Library
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={heroItem} style={{
              fontFamily: FONT.serif,
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: `${T.parchment}b3`, // 70% opacity
              lineHeight: 1.75,
              marginBottom: '2.25rem',
              maxWidth: '520px',
            }}>
              Every herb, ritual, and practice our ancestors knew — preserved, sourced, and made whole again.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={heroItem} style={{ marginBottom: '1.75rem' }}>
              <HeroSearch />
            </motion.div>

            {/* Founding principle chips */}
            <motion.div variants={heroItem} style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.625rem',
            }}>
              {['Prevention First', 'Sourced Not Hallucinated', 'Elder at the Center'].map(chip => (
                <span key={chip} style={{
                  fontFamily: FONT.mono,
                  fontSize: '0.48rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: `${T.parchment}99`,
                  border: `1px solid ${T.parchment}40`,
                  padding: '0.35rem 0.7rem',
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                }}>
                  {chip}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Subtle bottom fade into the next section */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: `linear-gradient(to bottom, transparent, ${T.forest})`,
          pointerEvents: 'none',
        }}/>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          2. DOMAIN CARDS — 4-column grid, 8 domains
      ──────────────────────────────────────────────────────────────────── */}
      <motion.section
        style={{
          background: T.cream,
          padding: '5rem 2rem 5.5rem',
        }}
        {...scrollReveal}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section label */}
          <p style={{
            fontFamily: FONT.mono,
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: T.sage,
            marginBottom: '0.875rem',
          }}>
            Eight ways to enter
          </p>
          <h2 style={{
            fontFamily: FONT.serif,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 400,
            color: T.forest,
            marginBottom: '2.5rem',
            lineHeight: 1.2,
          }}>
            Every tradition has its rooms.
          </h2>

          {/* 4-column grid */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
            }}
            className="domain-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {DOMAINS.map(domain => (
              <DomainCard key={domain.id} domain={domain} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────────────────────────────────────
          3. FEATURED ENTRY — two-column, Ashwagandha
      ──────────────────────────────────────────────────────────────────── */}
      <motion.section
        style={{
          background: T.parchment,
          padding: '5rem 2rem',
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
        }}
        {...scrollReveal}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          {/* Label */}
          <p style={{
            fontFamily: FONT.mono,
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: T.clay,
            marginBottom: '2.5rem',
          }}>
            Featured entry
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }} className="featured-grid">
            {/* Left: botanical illustration */}
            <div style={{
              maxWidth: '320px',
              color: T.forest,
            }}>
              <AshwagandhaIllustration />
            </div>

            {/* Right: entry content */}
            <div style={{ paddingTop: '1rem' }}>
              {/* Herb name */}
              <h2 style={{
                fontFamily: FONT.serif,
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                fontWeight: 300,
                color: T.forest,
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}>
                {featuredHerb.name}
              </h2>

              {/* Botanical name */}
              <p style={{
                fontFamily: FONT.serif,
                fontSize: '1.1rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: T.warmGray,
                marginBottom: '1.75rem',
              }}>
                {featuredHerb.botanicalName}
              </p>

              {/* Plain summary */}
              <p style={{
                fontFamily: FONT.serif,
                fontSize: '1rem',
                fontWeight: 300,
                color: T.ink,
                lineHeight: 1.85,
                marginBottom: '2rem',
                maxWidth: '460px',
              }}>
                {featuredHerb.plainSummary}
              </p>

              {/* Five-axis tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.875rem',
              }}>
                {featuredHerb.pharmacologicalActions.map(action => (
                  <span key={action} style={{
                    fontFamily: FONT.mono,
                    fontSize: '0.48rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: T.forest,
                    border: `1px solid ${T.border}`,
                    padding: '0.25rem 0.6rem',
                    lineHeight: 1.4,
                  }}>
                    {action}
                  </span>
                ))}
              </div>

              {/* Polarity badge */}
              <div style={{ marginBottom: '2rem' }}>
                <PolarityBadge polarity={featuredHerb.hormonalPolarity} />
              </div>

              {/* CTA */}
              <Link href={`/botica/${featuredHerb.slug}`} style={{
                fontFamily: FONT.mono,
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: T.clay,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'color 200ms ease',
              }}>
                Read the full entry →
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────────────────────────────────────
          4. SEASONAL — what to tend this season
      ──────────────────────────────────────────────────────────────────── */}
      <motion.section
        style={{
          background: T.parchment,
          paddingBottom: '5rem',
        }}
        {...scrollReveal}
      >
        {/* Botanical border at top */}
        <BotanicalBorder />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3.5rem 2rem 0' }}>
          {/* Section label */}
          <p style={{
            fontFamily: FONT.mono,
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: season.accent,
            marginBottom: '0.875rem',
          }}>
            {season.name} · {season.tagline}
          </p>

          <h2 style={{
            fontFamily: FONT.serif,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 400,
            color: T.forest,
            marginBottom: '3rem',
            lineHeight: 1.2,
          }}>
            What {season.name.toLowerCase()} asks of the body.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }} className="seasonal-grid">
            {/* Featured seasonal herb */}
            <div style={{
              background: T.cream,
              border: `1px solid ${T.border}`,
              padding: '2rem',
            }}>
              <p style={{
                fontFamily: FONT.mono,
                fontSize: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: season.accent,
                marginBottom: '1rem',
              }}>
                Seasonal herb
              </p>
              <h3 style={{
                fontFamily: FONT.serif,
                fontSize: '1.75rem',
                fontWeight: 400,
                color: T.forest,
                marginBottom: '0.4rem',
                lineHeight: 1.2,
              }}>
                {seasonHerb.name}
              </h3>
              <p style={{
                fontFamily: FONT.serif,
                fontSize: '0.875rem',
                fontStyle: 'italic',
                color: T.warmGray,
                marginBottom: '1.25rem',
              }}>
                {seasonHerb.botanicalName}
              </p>
              <p style={{
                fontFamily: FONT.serif,
                fontSize: '0.9rem',
                fontWeight: 300,
                color: T.ink,
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}>
                {seasonHerb.plainSummary}
              </p>
              <Link href={`/botica/${seasonHerb.slug}`} style={{
                fontFamily: FONT.mono,
                fontSize: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: T.clay,
              }}>
                View full entry →
              </Link>
            </div>

            {/* Seasonal practice recommendation */}
            <div style={{
              background: T.cream,
              border: `1px solid ${T.border}`,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <p style={{
                fontFamily: FONT.mono,
                fontSize: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: season.accent,
                marginBottom: '1rem',
              }}>
                Seasonal practice
              </p>
              <h3 style={{
                fontFamily: FONT.serif,
                fontSize: '1.75rem',
                fontWeight: 400,
                color: T.forest,
                marginBottom: '1.25rem',
                lineHeight: 1.25,
              }}>
                Morning ritual for {season.name.toLowerCase()} renewal
              </h3>
              <p style={{
                fontFamily: FONT.serif,
                fontSize: '0.9rem',
                fontWeight: 300,
                color: T.ink,
                lineHeight: 1.8,
                flex: 1,
                marginBottom: '1.5rem',
              }}>
                {season.practiceNote} The body shifts with the season — this practice works with that shift rather than against it.
              </p>
              <Link href="/practices" style={{
                fontFamily: FONT.mono,
                fontSize: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: T.clay,
              }}>
                Browse all practices →
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────────────────────────────────────
          5. ELDER VOICE — pull quote, forest background
      ──────────────────────────────────────────────────────────────────── */}
      <motion.section
        style={{
          background: T.forest,
          padding: '6rem 2rem',
          textAlign: 'center',
        }}
        {...scrollReveal}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <blockquote>
            <p style={{
              fontFamily: FONT.accent,
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: T.clay,
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              &ldquo;She knew the plants by name before she knew their Latin. She knew what each one asked of you, and what it would give in return. That knowing is what we are trying to hold.&rdquo;
            </p>
            <cite style={{
              fontFamily: FONT.mono,
              fontSize: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: T.sage,
              fontStyle: 'normal',
            }}>
              — On learning from elders · oral tradition
            </cite>
          </blockquote>
        </div>
      </motion.section>

      {/* ────────────────────────────────────────────────────────────────────
          6. CONTRIBUTE CTA — closing invitation
      ──────────────────────────────────────────────────────────────────── */}
      <motion.section
        style={{
          background: T.cream,
          padding: '5rem 2rem',
          borderTop: `1px solid ${T.border}`,
          textAlign: 'center',
        }}
        {...scrollReveal}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{
            fontFamily: FONT.mono,
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: T.sage,
            marginBottom: '1.25rem',
          }}>
            Grow the archive
          </p>
          <h2 style={{
            fontFamily: FONT.serif,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            color: T.forest,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            This archive grows with you.
          </h2>
          <p style={{
            fontFamily: FONT.serif,
            fontSize: '1rem',
            fontWeight: 300,
            color: T.warmGray,
            lineHeight: 1.85,
            marginBottom: '2.5rem',
          }}>
            Every entry is a gift forward. Share what your grandmother knew, what your healer practiced, what the land taught your people.
          </p>
          <Link href="/contribute" style={{
            fontFamily: FONT.mono,
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            background: T.forest,
            color: T.parchment,
            padding: '0.75rem 1.75rem',
            borderRadius: '2px',
            border: `1px solid ${T.forest}`,
            display: 'inline-block',
            transition: 'background 220ms ease-out, border-color 220ms ease-out',
          }}>
            Contribute to the Archive
          </Link>
        </div>
      </motion.section>
    </>
  )
}
