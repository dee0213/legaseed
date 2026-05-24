'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { timelineStages, bodyStages } from '@/lib/data/body-stages'

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  forest:    '#2c3d26',
  sage:      '#7a8c6e',
  cream:     '#faf6ec',
  parchment: '#f2ead8',
  border:    '#d8cebc',
  warmGray:  '#8a8070',
  ink:       '#1a1810',
  clay:      '#b5694f',
}

const FONT = {
  serif: `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:  `var(--font-dm-mono, 'DM Mono', monospace)`,
  libre: `var(--font-libre, 'Libre Baskerville', Georgia, serif)`,
}

// ─── Stage icon marks (28×28 stroke SVGs per stage type) ─────────────────────

function StageIcon({ slug, accent }: { slug: string; accent: string }) {
  const s = { stroke: accent, strokeWidth: '1.2', fill: 'none', strokeLinecap: 'round' as const }
  const icons: Record<string, React.ReactNode> = {
    'menarche': (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <circle cx="14" cy="14" r="4" {...s} />
        {[0,60,120,180,240,300].map((deg, i) => {
          const r = (deg * Math.PI) / 180
          return <line key={i} x1={14 + 5*Math.sin(r)} y1={14 - 5*Math.cos(r)} x2={14 + 10*Math.sin(r)} y2={14 - 10*Math.cos(r)} {...s} />
        })}
      </svg>
    ),
    'monthly-cycle': (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <path d="M20 14 A8 8 0 1 1 14 6" {...s} />
        <circle cx="14" cy="14" r="2" stroke={accent} strokeWidth="1" fill={accent} />
      </svg>
    ),
    'pregnancy': (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <circle cx="14" cy="13" r="7" {...s} />
        <circle cx="14" cy="13" r="2.5" {...s} />
        <line x1="14" y1="20" x2="14" y2="24" {...s} />
      </svg>
    ),
    'postpartum': (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <path d="M14 22 Q8 18 8 13 A6 6 0 0 1 20 13 Q20 18 14 22Z" {...s} />
        <path d="M14 6 Q14 10 14 13" {...s} />
        <circle cx="14" cy="5" r="1.5" stroke={accent} strokeWidth="1" fill="none" />
      </svg>
    ),
    'perimenopause': (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <path d="M14 22 Q10 17 12 12 Q14 8 14 5 Q14 8 16 12 Q18 17 14 22Z" {...s} />
        <path d="M10 18 Q7 14 9 10" {...s} strokeOpacity="0.6" />
        <path d="M18 18 Q21 14 19 10" {...s} strokeOpacity="0.6" />
      </svg>
    ),
    'post-menopause': (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <circle cx="14" cy="14" r="8" {...s} />
        <circle cx="14" cy="14" r="4" {...s} />
        <circle cx="14" cy="14" r="1.5" stroke={accent} strokeWidth="1" fill={accent} />
      </svg>
    ),
    'male-hormonal': (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <path d="M14 5 L14 23 M7 10 L14 5 L21 10" {...s} />
        <path d="M7 17 L14 23 L21 17" {...s} strokeOpacity="0.5" />
      </svg>
    ),
  }
  return <>{icons[slug] ?? icons['monthly-cycle']}</>
}

// ─── Sub-stage chip ───────────────────────────────────────────────────────────

function SubStageChip({ slug, accent }: { slug: string; accent: string }) {
  const stage = bodyStages.find((s) => s.slug === slug)
  if (!stage) return null
  return (
    <Link href={`/body-through-time/${slug}`} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          width: '150px', flexShrink: 0, border: `1px solid ${T.border}`,
          background: T.parchment, padding: '1rem', cursor: 'pointer',
          borderLeft: `3px solid ${accent}`, transition: 'all 0.18s',
        }}
        whileHover={{ y: -2, borderColor: accent }}
      >
        <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: '6px' }}>
          sub-stage
        </p>
        <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1rem', color: T.forest, lineHeight: 1.2, marginBottom: '4px' }}>
          {stage.name}
        </p>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.54rem', color: T.warmGray, letterSpacing: '0.08em', lineHeight: 1.4 }}>
          {stage.tagline}
        </p>
      </motion.div>
    </Link>
  )
}

// ─── Stage card ───────────────────────────────────────────────────────────────

function StageCard({
  stage,
  index,
  isExpanded,
  onExpand,
}: {
  stage: (typeof timelineStages)[0]
  index: number
  isExpanded: boolean
  onExpand: () => void
}) {
  const hasSubStages = !!stage.subStages?.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      style={{ flexShrink: 0 }}
    >
      {hasSubStages ? (
        <button
          onClick={onExpand}
          style={{
            width: '200px', border: `1px solid ${isExpanded ? stage.accent : T.border}`,
            background: isExpanded ? T.forest : T.parchment, padding: '1.5rem 1.25rem',
            cursor: 'pointer', textAlign: 'left', borderLeft: `3px solid ${stage.accent}`,
            transition: 'all 0.2s', display: 'block',
          }}
          onMouseEnter={(e) => { if (!isExpanded) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = stage.accent } }}
          onMouseLeave={(e) => { if (!isExpanded) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = T.border } }}
        >
          <div style={{ marginBottom: '0.875rem' }}>
            <StageIcon slug={stage.slug} accent={isExpanded ? T.parchment : stage.accent} />
          </div>
          <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.15rem', color: isExpanded ? T.parchment : T.forest, lineHeight: 1.2, marginBottom: '6px' }}>
            {stage.name}
          </p>
          <p style={{ fontFamily: FONT.mono, fontSize: '0.54rem', color: isExpanded ? `${T.cream}80` : T.warmGray, letterSpacing: '0.08em', lineHeight: 1.45 }}>
            {stage.tagline}
          </p>
          <p style={{ fontFamily: FONT.mono, fontSize: '0.52rem', color: isExpanded ? `${T.parchment}70` : stage.accent, marginTop: '0.75rem', letterSpacing: '0.1em' }}>
            {isExpanded ? '▲ collapse' : `${stage.subStages!.length} phases ▾`}
          </p>
        </button>
      ) : (
        <Link href={`/body-through-time/${stage.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{
              width: '200px', border: `1px solid ${T.border}`, background: T.parchment,
              padding: '1.5rem 1.25rem', cursor: 'pointer', borderLeft: `3px solid ${stage.accent}`,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = stage.accent }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = T.border }}
          >
            <div style={{ marginBottom: '0.875rem' }}>
              <StageIcon slug={stage.slug} accent={stage.accent} />
            </div>
            <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.15rem', color: T.forest, lineHeight: 1.2, marginBottom: '6px' }}>
              {stage.name}
            </p>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.54rem', color: T.warmGray, letterSpacing: '0.08em', lineHeight: 1.45 }}>
              {stage.tagline}
            </p>
          </div>
        </Link>
      )}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BodyThroughTimePage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  const expandedStage = expandedSlug
    ? timelineStages.find((s) => s.slug === expandedSlug)
    : null

  return (
    <div style={{ minHeight: '100vh', background: T.cream }}>

      {/* ── Forest header ── */}
      <div style={{ background: T.forest, padding: '4rem 1.5rem 3.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${T.cream}70`, marginBottom: '1rem' }}
          >
            A living guide to the hormonal journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{ fontFamily: FONT.serif, fontWeight: 300, fontSize: 'clamp(2.2rem, 6vw, 4rem)', color: T.parchment, lineHeight: 1.05, letterSpacing: '-0.015em', marginBottom: '1.25rem' }}
          >
            The Body Through Time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.15rem', color: `${T.parchment}85`, maxWidth: '580px', lineHeight: 1.7 }}
          >
            Enter the archive through your body&apos;s current chapter — and find what the traditions say about this moment in your life.
          </motion.p>
        </div>
      </div>

      {/* ── Timeline strip ── */}
      <div style={{ background: T.cream, paddingTop: '2.5rem', paddingBottom: expandedSlug ? 0 : '3rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '1.5rem' }}>
          <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '1.25rem' }}>
            Select your chapter
          </p>
        </div>
        <div style={{
          overflowX: 'auto', display: 'flex', gap: '10px',
          paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingBottom: '1rem',
          scrollSnapType: 'x mandatory',
        }}>
          {timelineStages.map((stage, i) => (
            <div key={stage.slug} style={{ scrollSnapAlign: 'start' }}>
              <StageCard
                stage={stage}
                index={i}
                isExpanded={expandedSlug === stage.slug}
                onExpand={() => setExpandedSlug(expandedSlug === stage.slug ? null : stage.slug)}
              />
            </div>
          ))}
        </div>

        {/* Sub-stage expansion panel */}
        <AnimatePresence>
          {expandedStage?.subStages && (
            <motion.div
              key={expandedSlug}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ borderTop: `1px solid ${T.border}`, background: `${T.forest}08`, padding: '1.5rem 1.5rem' }}>
                <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: expandedStage.accent, marginBottom: '1rem' }}>
                  {expandedStage.name} — choose a phase
                </p>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {expandedStage.subStages.map((slug) => (
                    <SubStageChip key={slug} slug={slug} accent={expandedStage.accent} />
                  ))}
                  <Link href={`/body-through-time/${expandedStage.slug}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                    <div style={{
                      width: '150px', border: `1px solid ${expandedStage.accent}`, padding: '1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
                      cursor: 'pointer', transition: 'all 0.18s',
                    }}>
                      <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: expandedStage.accent, textAlign: 'center' }}>
                        Overview →
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Traditions note ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 1.5rem 2rem', borderTop: `1px solid ${T.border}` }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '1rem' }}>
            How this archive reads the body
          </p>
          <p style={{ fontFamily: FONT.serif, fontWeight: 300, fontSize: '1.25rem', color: T.ink, lineHeight: 1.8, maxWidth: '680px' }}>
            Each chapter of the hormonal journey has been read differently across traditions — some as sacred thresholds, others as clinical windows, others as seasons in a longer cycle of life. This archive holds all of those perspectives without collapsing them into one.
          </p>
        </motion.div>
      </div>

      {/* ── Tradition perspectives grid ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            { label: 'Ayurveda', text: 'Reads the body\'s stages through the dosha lens — each phase carrying its own elemental quality and requiring its own approach to food, herb, and rhythm.' },
            { label: 'Traditional Chinese Medicine', text: 'Follows the movement of qi and blood through each life chapter, mapping depletion and abundance to specific organ systems and seasons.' },
            { label: 'Indigenous Traditions', text: 'Mark the body\'s transitions as sacred thresholds requiring ceremony, community, and protection — the body as a site of spiritual intelligence, not just biology.' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              style={{ padding: '1.75rem 1.5rem', border: `1px solid ${T.border}`, background: T.parchment }}
            >
              <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.sage, marginBottom: '0.75rem' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.75 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
