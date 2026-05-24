'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { BodyStageData } from '@/lib/data/body-stages'
import { herbs } from '@/lib/data/herbs'
import type { LifeStage } from '@/lib/types'

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  forest:    '#2c3d26',
  moss:      '#3d5235',
  sage:      '#7a8c6e',
  fern:      '#5a7a4a',
  clay:      '#b5694f',
  ochre:     '#c9a030',
  sienna:    '#8b4a2a',
  cream:     '#faf6ec',
  parchment: '#f2ead8',
  border:    '#d8cebc',
  warmGray:  '#8a8070',
  ink:       '#1a1810',
}

const FONT = {
  serif: `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:  `var(--font-dm-mono, 'DM Mono', monospace)`,
  libre: `var(--font-libre, 'Libre Baskerville', Georgia, serif)`,
}

// ─── Section animation ────────────────────────────────────────────────────────

function Appear({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, delay: i * 0.1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ─── Herb result card ─────────────────────────────────────────────────────────

type HerbStatus = 'supported' | 'guidance' | 'contraindicated'

function HerbCard({
  herbSlug,
  status,
  note,
}: {
  herbSlug: string
  status: HerbStatus
  note?: string
}) {
  const herb = herbs.find((h) => h.slug === herbSlug)
  if (!herb) return null

  const statusConfig = {
    supported:       { label: 'Supported',       color: T.fern,    border: T.fern },
    guidance:        { label: 'With guidance',   color: T.ochre,   border: T.ochre },
    contraindicated: { label: 'Avoid',            color: T.sienna,  border: T.sienna },
  }
  const sc = statusConfig[status]

  return (
    <Link href={`/botica/${herbSlug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          border: `1px solid ${T.border}`, background: T.parchment,
          padding: '1rem 1.125rem', transition: 'border-color 0.18s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = sc.border)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.1rem', color: T.forest, lineHeight: 1.15 }}>
            {herb.name}
          </p>
          <span style={{ fontFamily: FONT.mono, fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: sc.color, border: `1px solid ${sc.border}`, padding: '2px 6px', flexShrink: 0, marginLeft: '8px' }}>
            {sc.label}
          </span>
        </div>
        <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.78rem', color: T.warmGray, marginBottom: note ? '8px' : 0 }}>
          {herb.botanicalName}
        </p>
        {note && (
          <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', color: T.warmGray, lineHeight: 1.55, letterSpacing: '0.06em' }}>
            {note}
          </p>
        )}
      </div>
    </Link>
  )
}

// ─── Empty herb state ─────────────────────────────────────────────────────────

function EmptyHerbState({ label }: { label: string }) {
  return (
    <div style={{
      border: `1px dashed ${T.border}`, padding: '2rem 1.25rem',
      textAlign: 'center', background: `${T.parchment}60`,
    }}>
      <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1rem', color: T.warmGray, lineHeight: 1.65 }}>
        {label}
      </p>
      <Link href="/contribute" style={{
        fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.14em',
        textTransform: 'uppercase', color: T.clay, textDecoration: 'none',
        display: 'inline-block', marginTop: '0.875rem', borderBottom: `1px solid ${T.clay}`,
      }}>
        Contribute knowledge →
      </Link>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StageDetailClient({
  stage,
  parentStage,
}: {
  stage: BodyStageData
  parentStage?: BodyStageData
}) {
  // Filter herbs by life stage map
  const stageHerbs = (statusFilter: HerbStatus) =>
    herbs.flatMap((herb) => {
      const match = herb.lifeStageMap.find((entry) =>
        stage.lifeStageKeys.includes(entry.stage as LifeStage)
      )
      if (!match || match.status !== statusFilter) return []
      return [{ herbSlug: herb.slug, status: match.status, note: match.notes }]
    })

  const supportedHerbs = stageHerbs('supported')
  const cautionHerbs   = [...stageHerbs('guidance'), ...stageHerbs('contraindicated')]

  return (
    <article style={{ minHeight: '100vh', background: T.cream }}>

      {/* ── Breadcrumb ── */}
      <div style={{ borderBottom: `1px solid ${T.border}`, padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray }}>
            <Link href="/body-through-time" style={{ color: T.warmGray, textDecoration: 'none' }}>
              Body Through Time
            </Link>
            {parentStage && (
              <>
                {' / '}
                <Link href={`/body-through-time/${parentStage.slug}`} style={{ color: T.warmGray, textDecoration: 'none' }}>
                  {parentStage.name}
                </Link>
              </>
            )}
            {' / '}
            <span style={{ color: T.forest }}>{stage.name}</span>
          </p>
        </div>
      </div>

      {/* ── Forest header ── */}
      <Appear i={0}>
        <div style={{ background: T.forest, padding: '3rem 1.5rem', borderLeft: `5px solid ${stage.accent}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${T.cream}60`, marginBottom: '0.75rem' }}>
              Body Through Time
            </p>
            <h1 style={{ fontFamily: FONT.serif, fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: T.parchment, lineHeight: 1.05, marginBottom: '0.625rem' }}>
              {stage.name}
            </h1>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: stage.accent }}>
              {stage.tagline}
            </p>
          </div>
        </div>
      </Appear>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>

        {/* ── What is happening ── */}
        <Appear i={1}>
          <section style={{ paddingTop: '3rem', paddingBottom: '2.5rem', borderBottom: `1px solid ${T.border}` }}>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '1.25rem' }}>
              What is happening
            </p>
            <p style={{ fontFamily: FONT.serif, fontWeight: 300, fontSize: '1.2rem', color: T.ink, lineHeight: 1.85, maxWidth: '760px' }}>
              {stage.physiologyText}
            </p>

            {/* Tradition perspectives */}
            {stage.traditionSays.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.sage, marginBottom: '1rem' }}>
                  What the traditions say
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stage.traditionSays.map((t) => (
                    <div
                      key={t.tradition}
                      style={{
                        borderLeft: `3px solid ${stage.accent}`, paddingLeft: '1rem',
                        paddingTop: '0.625rem', paddingBottom: '0.625rem',
                        background: 'rgba(181,105,79,0.04)', borderRadius: '0 2px 2px 0',
                      }}
                    >
                      <p style={{ fontFamily: FONT.mono, fontSize: '0.54rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: stage.accent, marginBottom: '5px' }}>
                        {t.tradition}
                      </p>
                      <p style={{ fontFamily: FONT.serif, fontSize: '0.98rem', color: T.ink, lineHeight: 1.7 }}>
                        {t.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </Appear>

        {/* ── What the archive holds ── */}
        <Appear i={2}>
          <section style={{ paddingTop: '2.75rem', paddingBottom: '2.5rem', borderBottom: `1px solid ${T.border}` }}>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '0.5rem' }}>
              What the archive holds for this stage
            </p>
            <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1rem', color: T.warmGray, marginBottom: '2rem' }}>
              Herbs and practices filtered by life stage documentation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

              {/* Left: Supported */}
              <div style={{ padding: '1.75rem', background: `${T.fern}08`, border: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: T.fern }} />
                  <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.fern }}>
                    Supported Herbs &amp; Practices
                  </p>
                </div>
                {supportedHerbs.length === 0 ? (
                  <EmptyHerbState label="No herbs have been documented as supported for this stage yet. This knowledge belongs here." />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {supportedHerbs.map((h) => (
                      <HerbCard key={h.herbSlug} herbSlug={h.herbSlug} status="supported" note={h.note} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Approach with care */}
              <div style={{ padding: '1.75rem', background: `${T.sienna}06`, border: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: T.ochre }} />
                  <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.ochre }}>
                    Approach with Care
                  </p>
                </div>
                {cautionHerbs.length === 0 ? (
                  <EmptyHerbState label="No caution flags have been documented for this stage yet." />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {cautionHerbs.map((h) => (
                      <HerbCard key={h.herbSlug} herbSlug={h.herbSlug} status={h.status} note={h.note} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </Appear>

        {/* ── Elder voice ── */}
        <Appear i={3}>
          <section style={{ marginTop: '2.5rem' }}>
            <div style={{ background: T.forest, padding: '3rem 2rem' }}>
              <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: `${T.cream}50`, marginBottom: '1.5rem' }}>
                Elder voice
              </p>
              <blockquote style={{
                fontFamily: FONT.libre, fontStyle: 'italic',
                fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
                color: T.clay, lineHeight: 1.65, maxWidth: '640px',
                margin: 0, padding: 0, borderLeft: 'none',
              }}>
                &ldquo;{stage.elderVoice.quote}&rdquo;
              </blockquote>
              <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', color: `${T.cream}55`, marginTop: '1.5rem', letterSpacing: '0.12em' }}>
                — {stage.elderVoice.attribution}
              </p>
            </div>
          </section>
        </Appear>

        {/* ── Stage navigation ── */}
        <Appear i={4}>
          <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <Link href="/body-through-time" style={{
              fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: T.warmGray, textDecoration: 'none',
              border: `1px solid ${T.border}`, padding: '8px 18px', display: 'inline-block',
              transition: 'all 0.2s',
            }}>
              ← All Chapters
            </Link>
            <Link href={`/search?stage=${stage.lifeStageKeys[0]}`} style={{
              fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: stage.accent, textDecoration: 'none',
              border: `1px solid ${stage.accent}`, padding: '8px 18px', display: 'inline-block',
              transition: 'all 0.2s',
            }}>
              Search by this stage →
            </Link>
          </div>
        </Appear>

      </div>
    </article>
  )
}
