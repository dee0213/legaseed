'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { traditionPageEntries, type TraditionPageEntry } from '@/lib/data/traditions'

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

// ─── World map SVG (stroke-only, decorative) ──────────────────────────────────

function WorldMapOutline() {
  return (
    <svg
      width="800" height="420" viewBox="0 0 800 420"
      fill="none" stroke="currentColor" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* North America */}
      <path d="
        M 48 72 C 95 55 155 58 192 82
        C 210 96 220 118 218 148
        C 215 178 200 206 178 224
        C 155 242 122 246 96 232
        C 68 217 50 188 46 158
        C 42 128 44 98 48 72 Z
      " />
      {/* Baja California */}
      <path d="M 68 220 C 62 234 58 252 60 266 C 62 278 68 280 72 270 C 76 258 74 240 68 220" />
      {/* Greenland */}
      <ellipse cx="212" cy="46" rx="26" ry="18" />
      {/* Central America / Caribbean land bridge */}
      <path d="M 170 228 C 168 244 166 256 160 264" strokeWidth="0.8" />
      {/* South America */}
      <path d="
        M 155 268 C 182 260 210 266 224 292
        C 238 320 235 365 218 396
        C 200 425 170 428 150 404
        C 130 380 124 340 130 308
        C 135 288 145 272 155 268 Z
      " />
      {/* UK / Ireland */}
      <ellipse cx="328" cy="78" rx="9" ry="13" transform="rotate(-8, 328, 78)" />
      {/* Iceland */}
      <ellipse cx="290" cy="54" rx="14" ry="9" />
      {/* Europe main body */}
      <path d="
        M 340 82 C 368 70 402 72 424 90
        C 438 103 438 125 424 140
        C 408 155 380 158 358 145
        C 334 130 328 105 340 82 Z
      " />
      {/* Scandinavian peninsula */}
      <path d="
        M 370 76 C 375 55 388 42 396 48
        C 404 55 404 72 398 82
      " />
      {/* Iberian peninsula */}
      <path d="
        M 338 120 C 325 125 314 138 316 155
        C 318 168 330 175 340 168
        C 350 160 354 144 348 132
      " />
      {/* Italy peninsula */}
      <path d="
        M 396 138 C 398 148 400 162 395 176
        C 390 190 380 196 374 185
        C 370 176 374 160 380 148
      " />
      {/* Africa */}
      <path d="
        M 332 162 C 368 152 418 154 450 178
        C 472 196 478 228 470 270
        C 462 312 442 352 415 374
        C 388 395 355 393 332 370
        C 306 344 296 304 296 264
        C 296 218 306 178 332 162 Z
      " />
      {/* Madagascar */}
      <path d="
        M 458 340 C 462 330 470 330 473 342
        C 476 356 472 372 464 378
        C 456 383 450 374 450 360
        C 450 350 455 344 458 340 Z
      " />
      {/* Middle East / Arabian Peninsula */}
      <path d="
        M 450 168 C 470 160 498 162 510 178
        C 520 192 518 210 508 224
        C 496 240 474 245 456 235
        C 444 228 442 210 448 192
      " />
      <path d="M 490 190 C 495 210 492 234 480 250 C 470 264 460 262 458 248" />
      {/* Asia — main Eurasian body */}
      <path d="
        M 420 75 C 495 55 600 50 698 72
        C 762 88 800 124 798 166
        C 796 204 764 232 726 244
        C 686 256 644 244 610 226
        C 574 208 548 178 518 158
        C 488 138 456 128 436 112
        C 422 100 418 86 420 75 Z
      " />
      {/* Indian subcontinent */}
      <path d="
        M 548 170 C 568 162 590 168 598 190
        C 607 214 598 244 580 260
        C 562 276 540 270 528 250
        C 516 228 520 198 534 180
        C 540 174 548 172 548 170 Z
      " />
      {/* Sri Lanka */}
      <ellipse cx="582" cy="272" rx="7" ry="10" />
      {/* Southeast Asia peninsula (Indochina) */}
      <path d="
        M 650 208 C 660 214 668 228 666 248
        C 664 265 652 274 640 266
        C 626 256 622 238 630 220
        C 636 206 648 204 650 208 Z
      " />
      {/* Malay Peninsula */}
      <path d="M 648 260 C 650 272 648 288 640 298 C 634 306 626 302 626 290 C 626 276 634 264 648 260" />
      {/* Japan */}
      <path d="
        M 754 120 C 760 110 770 108 774 120
        C 778 134 770 152 758 158
        C 746 164 738 154 740 140
        C 742 128 750 122 754 120 Z
      " />
      {/* Korea */}
      <path d="M 726 140 C 730 130 738 128 742 138 C 745 150 740 164 732 168 C 724 172 718 164 720 152 C 722 144 724 142 726 140 Z" />
      {/* Taiwan */}
      <ellipse cx="726" cy="196" rx="6" ry="10" transform="rotate(-10, 726, 196)" />
      {/* Philippines (simplified) */}
      <ellipse cx="718" cy="240" rx="8" ry="16" transform="rotate(5, 718, 240)" />
      {/* Australia */}
      <path d="
        M 616 295 C 656 284 708 288 736 312
        C 756 330 754 362 736 380
        C 716 398 682 400 655 384
        C 626 366 610 336 612 308
        C 614 298 616 295 616 295 Z
      " />
      {/* Tasmania */}
      <ellipse cx="680" cy="408" rx="10" ry="7" />
      {/* New Zealand (two islands) */}
      <ellipse cx="756" cy="368" rx="7" ry="16" transform="rotate(-15, 756, 368)" />
      <ellipse cx="762" cy="398" rx="5" ry="12" transform="rotate(-10, 762, 398)" />
    </svg>
  )
}

// ─── Philosophy strip ─────────────────────────────────────────────────────────

const PHILOSOPHY_COLS = [
  {
    label: 'Why tradition matters',
    text:  'Decontextualized knowledge is incomplete knowledge. A herb pulled from its tradition loses the preparation method, the contraindications, the seasonal timing, and the relationship to all the other plants around it.',
  },
  {
    label: 'How we hold this',
    text:  'Each tradition entry names its key texts, its oral lineages, its living practitioners. We document discrepancies between how different traditions read the same plant — we do not flatten them into a single consensus.',
  },
  {
    label: 'What is missing',
    text:  'This archive is incomplete. Many traditions are underrepresented. If your lineage is missing or misrepresented, the Contribute page is how you correct that.',
  },
]

function PhilosophyStrip() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{
        borderTop:    `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      {PHILOSOPHY_COLS.map((col, i) => (
        <div
          key={col.label}
          style={{
            padding:      '2.5rem 3rem',
            borderRight:  i < 2 ? `1px solid ${T.border}` : 'none',
          }}
        >
          <p
            style={{
              fontFamily:    FONT.mono,
              fontSize:      '0.54rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         T.sage,
              marginBottom:  '0.875rem',
            }}
          >
            {col.label}
          </p>
          <p
            style={{
              fontFamily: FONT.serif,
              fontWeight: 300,
              fontSize:   '0.9rem',
              color:      T.warmGray,
              lineHeight: 1.75,
            }}
          >
            {col.text}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── Tradition card ───────────────────────────────────────────────────────────

function TraditionCard({ entry, index }: { entry: TraditionPageEntry; index: number }) {
  const [hovered, setHovered] = useState(false)

  // First sentence of philosophy only
  const firstSentence = entry.philosophy.split('. ')[0] + '.'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.46, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Link href={entry.href} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="min-h-[200px] md:min-h-[240px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background:    hovered ? `${entry.accentColor}08` : T.white,
            borderLeft:    `4px solid ${hovered ? entry.accentDark : entry.accentColor}`,
            padding:       '2rem 2.25rem',
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'space-between',
            transition:    'background-color 280ms ease, border-color 280ms ease',
          }}
        >
          {/* Top metadata */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <p
                style={{
                  fontFamily:    FONT.mono,
                  fontSize:      '0.55rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         T.sage,
                }}
              >
                {entry.region}
              </p>
              <p
                style={{
                  fontFamily:    FONT.mono,
                  fontSize:      '0.52rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         T.warmGray,
                  textAlign:     'right',
                  maxWidth:      '140px',
                }}
              >
                {entry.age}
              </p>
            </div>

            {/* Tradition name */}
            <h3
              style={{
                fontFamily:   FONT.serif,
                fontStyle:    'italic',
                fontWeight:   300,
                fontSize:     '1.5rem',
                color:        T.forest,
                lineHeight:   1.15,
                marginBottom: '0.75rem',
              }}
            >
              {entry.name}
            </h3>

            {/* First sentence of philosophy */}
            <p
              style={{
                fontFamily: FONT.serif,
                fontWeight: 300,
                fontSize:   '0.9rem',
                color:      T.warmGray,
                lineHeight: 1.65,
              }}
            >
              {firstSentence}
            </p>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              paddingTop:     '1rem',
              borderTop:      `1px solid ${T.border}`,
              marginTop:      'auto',
            }}
          >
            <span
              style={{
                fontFamily:    FONT.mono,
                fontSize:      '0.52rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         T.warmGray,
              }}
            >
              {entry.herbCount} {entry.herbCount === 1 ? 'entry' : 'entries'} in archive
            </span>
            <span
              style={{
                fontFamily:    FONT.mono,
                fontSize:      '0.52rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         entry.accentColor,
                transform:     hovered ? 'translateX(4px)' : 'translateX(0)',
                transition:    'transform 280ms ease',
                display:       'inline-block',
              }}
            >
              Explore lineage →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── "Archive incomplete" callout ─────────────────────────────────────────────

function IncompleteCallout() {
  return (
    <div
      style={{
        background: T.parchment,
        padding:    '4rem 7vw',
        textAlign:  'center',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily:   FONT.serif,
            fontStyle:    'italic',
            fontWeight:   300,
            fontSize:     '1.2rem',
            color:        T.warmGray,
            lineHeight:   1.8,
            marginBottom: '2rem',
          }}
        >
          Many traditions are not yet represented here. African diasporic medicine
          across South America, Pacific Islander healing traditions, Eastern European
          folk medicine, Siberian shamanic plant knowledge — all of this is missing
          and all of it matters.
        </p>
        <Link
          href="/contribute"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          <span
            style={{
              fontFamily:     FONT.mono,
              fontSize:       '0.58rem',
              letterSpacing:  '0.16em',
              textTransform:  'uppercase',
              color:          T.parchment,
              background:     T.forest,
              padding:        '0.875rem 2rem',
              display:        'inline-block',
              transition:     'background-color 220ms ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = '#3d5235'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = T.forest
            }}
          >
            Help us fill the gap → Contribute
          </span>
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TraditionsPage() {
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
        {/* World map — right side, 6% opacity */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            right:         0,
            top:           '50%',
            transform:     'translateY(-50%)',
            opacity:       0.06,
            color:         T.parchment,
            pointerEvents: 'none',
            width:         '800px',
            height:        '420px',
          }}
        >
          <WorldMapOutline />
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
          Knowledge by lineage
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
          Traditions
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
            maxWidth:    '500px',
          }}
        >
          The same plant often lives in many traditions. Browse by lineage to
          understand not just what a remedy is, but where it comes from — and
          who has carried it.
        </motion.p>
      </div>

      {/* ── Philosophy strip ── */}
      <PhilosophyStrip />

      {/* ── Tradition cards ── */}
      <div style={{ paddingTop: '3rem', paddingBottom: '0.5rem' }}>

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
          {traditionPageEntries.length} documented lineages
        </p>

        {/* Tile grid — 1px gap shows border color as hairline */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1px', background: T.border }}
        >
          {traditionPageEntries.map((entry, i) => (
            <TraditionCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>

      {/* ── Archive incomplete callout ── */}
      <IncompleteCallout />

    </article>
  )
}
