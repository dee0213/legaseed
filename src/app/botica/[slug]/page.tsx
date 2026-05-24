import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { herbs } from '@/lib/data/herbs'
import type { LifeStageRating, Preparation, Source } from '@/lib/types'

// ─── Static params for build ──────────────────────────────────────────────────

export function generateStaticParams() {
  return herbs.map((herb) => ({ slug: herb.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const herb = herbs.find((h) => h.slug === slug)
  if (!herb) return { title: 'Not found' }
  return {
    title: `${herb.name} — Legaseed`,
    description: herb.plainSummary,
  }
}

// ─── Polarity badge ───────────────────────────────────────────────────────────

function PolarityBadge({ polarity }: { polarity: string }) {
  const map: Record<string, { label: string; color: string; border: string }> = {
    yin:      { label: 'Yin',      color: 'text-plum',   border: 'border-plum' },
    yang:     { label: 'Yang',     color: 'text-fern',   border: 'border-fern' },
    neutral:  { label: 'Neutral',  color: 'text-sage',   border: 'border-sage' },
    biphasic: { label: 'Biphasic', color: 'text-ochre',  border: 'border-ochre' },
  }
  const style = map[polarity] ?? map.neutral
  return (
    <span className={`label-text border px-2 py-0.5 ${style.color} ${style.border}`}>
      {style.label}
    </span>
  )
}

// ─── Verification badge ───────────────────────────────────────────────────────

function VerificationBadge({ tier }: { tier: string }) {
  const map: Record<string, { label: string; color: string }> = {
    community: { label: 'Community',  color: 'text-warm-gray' },
    verified:  { label: 'Verified',   color: 'text-fern' },
    endorsed:  { label: 'Endorsed',   color: 'text-forest' },
  }
  const style = map[tier] ?? map.community
  return (
    <span className={`label-text border border-border px-2 py-0.5 ${style.color}`}>
      {style.label}
    </span>
  )
}

// ─── Life stage status badge ──────────────────────────────────────────────────

function StatusBadge({ status }: { status: LifeStageRating['status'] }) {
  const map: Record<LifeStageRating['status'], { label: string; color: string; border: string }> = {
    supported:      { label: 'Supported',      color: 'text-fern',  border: 'border-fern' },
    guidance:       { label: 'With guidance',  color: 'text-ochre', border: 'border-ochre' },
    contraindicated:{ label: 'Contraindicated',color: 'text-sienna',border: 'border-sienna' },
  }
  const style = map[status]
  return (
    <span className={`label-text border px-2 py-0.5 ${style.color} ${style.border}`}>
      {style.label}
    </span>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider() {
  return <div className="border-t border-border my-12" />
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="label-text text-sage mb-6">{children}</p>
}

// ─── Source citation ──────────────────────────────────────────────────────────

function SourceCitation({ source }: { source: Source }) {
  return (
    <div className="card p-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="label-text text-sage border border-border px-2 py-0.5">
          Tier {source.tier}
        </span>
        <span className="label-text text-warm-gray border border-border px-2 py-0.5">
          {source.type}
        </span>
      </div>
      <p className="font-serif text-ink text-sm leading-relaxed">{source.citation}</p>
      {source.author && (
        <p className="font-mono text-warm-gray mt-1" style={{ fontSize: '0.7rem' }}>
          {source.author}{source.year ? `, ${source.year}` : ''}
        </p>
      )}
      {source.url && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-clay hover:text-terracotta transition-colors duration-200 mt-1 block"
          style={{ fontSize: '0.7rem' }}
        >
          {source.url}
        </a>
      )}
    </div>
  )
}

// ─── Preparation card ─────────────────────────────────────────────────────────

function PreparationCard({ prep }: { prep: Preparation }) {
  return (
    <div className="card p-6">
      <p className="label-text text-sage mb-3">{prep.method}</p>
      <p className="font-serif text-ink text-sm leading-relaxed mb-4">{prep.instructions}</p>
      {(prep.dosage || prep.duration) && (
        <div className="flex flex-wrap gap-4 border-t border-border pt-4 mt-4">
          {prep.dosage && (
            <div>
              <p className="label-text text-warm-gray mb-1">Dosage</p>
              <p className="font-serif text-ink text-sm">{prep.dosage}</p>
            </div>
          )}
          {prep.duration && (
            <div>
              <p className="label-text text-warm-gray mb-1">Duration</p>
              <p className="font-serif text-ink text-sm">{prep.duration}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HerbDetailPage({ params }: PageProps) {
  const { slug } = await params
  const herb = herbs.find((h) => h.slug === slug)
  if (!herb) notFound()

  const hasPreparations = herb.preparations.length > 0
  const hasLifeStageMap = herb.lifeStageMap.length > 0
  const hasContraindications = herb.contraindications.length > 0
  const hasDrugInteractions = herb.drugInteractions.length > 0
  const hasPregnancyNotes = herb.pregnancyNotes.trim().length > 0
  const hasSafety = hasContraindications || hasDrugInteractions || hasPregnancyNotes
  const hasSources = herb.sources.length > 0
  const hasRelated = herb.relatedHerbs.length > 0

  return (
    <article className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">

        {/* ── A. Breadcrumb ── */}
        <nav className="mb-10">
          <p className="label-text text-sage">
            <Link href="/botica" className="hover:text-forest transition-colors duration-200">
              Botica
            </Link>
            {' / '}
            <span>{herb.name}</span>
          </p>
        </nav>

        {/* ── B. Hero header ── */}
        <header className="mb-0">
          <h1
            className="font-serif font-light text-forest leading-tight tracking-[-0.02em] mb-3"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}
          >
            {herb.name}
          </h1>
          <p className="font-serif italic text-warm-gray mb-4"
             style={{ fontSize: '1.25rem' }}>
            {herb.botanicalName}
          </p>

          {herb.alternateNames.length > 0 && (
            <p className="font-mono text-sage mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              {herb.alternateNames.join(' · ')}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-5">
            <span className="label-text text-warm-gray border border-border px-2 py-0.5">
              {herb.region}
            </span>
            <span className="label-text text-warm-gray border border-border px-2 py-0.5">
              {herb.domain}
            </span>
          </div>
        </header>

        {/* ── C. Five-Axis Summary strip ── */}
        <div className="bg-parchment border-t border-b border-border mt-10 py-6 px-6 -mx-6 md:-mx-12">
          <div className="flex flex-wrap gap-x-10 gap-y-5">

            {/* Pharmacological actions */}
            <div>
              <p className="label-text text-sage mb-2">Actions</p>
              <div className="flex flex-wrap gap-1.5">
                {herb.pharmacologicalActions.map((action) => (
                  <span key={action} className="label-text text-forest border border-border px-2 py-0.5">
                    {action}
                  </span>
                ))}
              </div>
            </div>

            {/* Hormonal polarity */}
            <div>
              <p className="label-text text-sage mb-2">Hormonal Polarity</p>
              <PolarityBadge polarity={herb.hormonalPolarity} />
            </div>

            {/* Verification tier */}
            <div>
              <p className="label-text text-sage mb-2">Verification</p>
              <VerificationBadge tier={herb.verificationTier} />
            </div>

          </div>
        </div>

        {/* ── D. Plain Summary ── */}
        <SectionDivider />
        <section>
          <SectionLabel>What to Know</SectionLabel>
          <p className="font-serif text-ink leading-relaxed" style={{ fontSize: '1.1rem' }}>
            {herb.plainSummary}
          </p>
        </section>

        {/* ── E. Preparations ── */}
        <SectionDivider />
        <section>
          <SectionLabel>Preparations</SectionLabel>
          {!hasPreparations ? (
            <p className="font-serif italic text-warm-gray text-sm">
              Preparation details coming soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {herb.preparations.map((prep, i) => (
                <PreparationCard key={i} prep={prep} />
              ))}
            </div>
          )}
        </section>

        {/* ── F. Life Stage Map ── */}
        <SectionDivider />
        <section>
          <SectionLabel>Life Stage Guidance</SectionLabel>
          {!hasLifeStageMap ? (
            <p className="font-serif italic text-warm-gray text-sm">
              Life stage guidance coming soon.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {herb.lifeStageMap.map((entry, i) => (
                <div key={i} className="card p-5">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <p className="font-mono text-forest font-normal capitalize"
                       style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                      {entry.stage.replace(/-/g, ' ')}
                    </p>
                    <StatusBadge status={entry.status} />
                  </div>
                  {entry.notes && (
                    <p className="font-serif text-ink text-sm leading-relaxed">
                      {entry.notes}
                    </p>
                  )}
                  {entry.source && (
                    <p className="font-mono text-warm-gray mt-2" style={{ fontSize: '0.65rem' }}>
                      Source: {entry.source}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── G. Safety ── */}
        <SectionDivider />
        <section>
          <SectionLabel>Safety &amp; Interactions</SectionLabel>
          {!hasSafety ? (
            <p className="font-serif italic text-warm-gray text-sm">
              Safety details coming soon.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {hasContraindications && (
                <div>
                  <p className="label-text text-sienna mb-3">Contraindications</p>
                  <ul className="flex flex-col gap-2">
                    {herb.contraindications.map((item, i) => (
                      <li key={i} className="font-serif text-ink text-sm leading-relaxed pl-4 border-l border-sienna">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hasDrugInteractions && (
                <div>
                  <p className="label-text text-ochre mb-3">Drug Interactions</p>
                  <ul className="flex flex-col gap-2">
                    {herb.drugInteractions.map((item, i) => (
                      <li key={i} className="font-serif text-ink text-sm leading-relaxed pl-4 border-l border-ochre">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hasPregnancyNotes && (
                <div>
                  <p className="label-text text-sage mb-3">Pregnancy Notes</p>
                  <p className="font-serif text-ink text-sm leading-relaxed pl-4 border-l border-sage">
                    {herb.pregnancyNotes}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── H. Sources ── */}
        <SectionDivider />
        <section>
          <SectionLabel>Sources</SectionLabel>
          {!hasSources ? (
            <p className="font-serif italic text-warm-gray text-sm">
              Sources being verified.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {herb.sources.map((source, i) => (
                <SourceCitation key={i} source={source} />
              ))}
            </div>
          )}
        </section>

        {/* ── I. Related entries (only if present) ── */}
        {hasRelated && (
          <>
            <SectionDivider />
            <section>
              <SectionLabel>Related Entries</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {herb.relatedHerbs.map((relatedSlug) => {
                  const related = herbs.find((h) => h.slug === relatedSlug)
                  return (
                    <Link
                      key={relatedSlug}
                      href={`/botica/${relatedSlug}`}
                      className="card px-4 py-2 font-serif text-forest text-sm hover:bg-cream transition-colors duration-200"
                    >
                      {related?.name ?? relatedSlug} →
                    </Link>
                  )
                })}
              </div>
            </section>
          </>
        )}

        {/* ── Footer meta ── */}
        <SectionDivider />
        <footer className="flex flex-wrap gap-x-8 gap-y-2">
          <p className="font-mono text-warm-gray" style={{ fontSize: '0.65rem' }}>
            Contributed by {herb.contributedBy}
          </p>
          <p className="font-mono text-warm-gray" style={{ fontSize: '0.65rem' }}>
            Last updated {herb.lastUpdated}
          </p>
        </footer>

      </div>
    </article>
  )
}
