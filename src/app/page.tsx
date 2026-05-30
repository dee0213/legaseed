'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BodyRituals, SkinCare, HairCare, InternalCleansing,
  ReproductiveWisdom, EnergeticSpiritual, Contemplative, Seasonal as SeasonalSVG, Seal,
} from '@/components/Botanicals'
import { DrawOnView, MouseTilt, Reveal } from '@/components/Motion'
import {
  FallingPetals, GrowingTendrilRule, ConstellationGlow,
  OrbitingMoons, TravelingSunSeasonal, InteractiveHeroPlant,
} from '@/components/Wonder'

// ─── Tokens ───────────────────────────────────────────────────────────────────

const T = {
  forest:    '#2c3d26',
  parchment: '#f3ead8',
  clay:      '#b5694f',
  moss:      '#4a6b3c',
  sage:      '#7a8c6e',
  ink:       '#1a1a17',
  grayWarm:  '#6f6657',
  border:    'rgba(44,61,38,0.18)',
  borderLight: 'rgba(243,234,216,0.15)',
} as const

// ─── Domain data ──────────────────────────────────────────────────────────────

const DOMAINS = [
  {
    id:    'body-rituals',
    label: 'I.',
    title: 'Body Rituals',
    desc:  'Oils, ointments, washes, and the daily practices of caring for the body as a vessel.',
    href:  '/practices/body-rituals',
    Motif: BodyRituals,
  },
  {
    id:    'skin-care',
    label: 'II.',
    title: 'Skin Care',
    desc:  'Clays, infusions, and plant medicines for the body’s outermost reading of inner balance.',
    href:  '/practices/skin-care',
    Motif: SkinCare,
  },
  {
    id:    'hair-care',
    label: 'III.',
    title: 'Hair Care',
    desc:  'Root-based oils, scalp practices, and the slow rituals that make hair into ceremony.',
    href:  '/practices/hair-care',
    Motif: HairCare,
  },
  {
    id:    'internal-cleansing',
    label: 'IV.',
    title: 'Internal Cleansing',
    desc:  'Bitters, fasts, and the gentle clearings that ancestors trusted to seasons.',
    href:  '/practices/internal-cleansing',
    Motif: InternalCleansing,
  },
  {
    id:    'reproductive',
    label: 'V.',
    title: 'Reproductive Wisdom',
    desc:  'Cycles, fertility, postpartum, and the long arc of feminine and masculine vitality.',
    href:  '/practices/reproductive-wisdom',
    Motif: ReproductiveWisdom,
  },
  {
    id:    'energetic',
    label: 'VI.',
    title: 'Energetic + Spiritual',
    desc:  'Smoke, water, breath, and the practices that tend to the invisible body.',
    href:  '/practices/energetic-spiritual',
    Motif: EnergeticSpiritual,
  },
  {
    id:    'contemplative',
    label: 'VII.',
    title: 'Contemplative',
    desc:  'Sitting, walking, silence, attention — the practices that older traditions called the root of all medicine.',
    href:  '/practices/contemplative',
    Motif: Contemplative,
  },
  {
    id:    'seasonal',
    label: 'VIII.',
    title: 'Seasonal',
    desc:  'Equinox preparations, harvest rhythms, the body in conversation with the year.',
    href:  '/practices/seasonal',
    Motif: SeasonalSVG,
  },
] as const

// ─── Herb preview data ────────────────────────────────────────────────────────

const HOMEPAGE_HERBS = [
  { id: 'ashwagandha', name: 'Ashwagandha', binomial: 'Withania somnifera',       tradition: 'Ayurveda', note: 'Adaptogen · nervine · rasayana', href: '/botica/ashwagandha' },
  { id: null,          name: 'Tulsi',        binomial: 'Ocimum sanctum',           tradition: 'Ayurveda', note: 'Sacred basil · clarifying · cardiac', href: '/botica' },
  { id: null,          name: 'Reishi',       binomial: 'Ganoderma lucidum',        tradition: 'Chinese',  note: 'Shen tonic · immune · longevity', href: '/botica' },
  { id: null,          name: 'Nettle',       binomial: 'Urtica dioica',            tradition: 'European', note: 'Mineralizing · spring tonic', href: '/botica' },
  { id: null,          name: 'Skullcap',     binomial: 'Scutellaria laterifolia',  tradition: 'European', note: 'Nervine · the loosening of clenched threads', href: '/botica' },
  { id: null,          name: 'Shatavari',    binomial: 'Asparagus racemosus',      tradition: 'Ayurveda', note: 'Reproductive tonic · cooling', href: '/botica' },
] as const

// ─── Hero search ──────────────────────────────────────────────────────────────

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
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      border: `1px solid ${focused ? 'rgba(243,234,216,0.55)' : 'rgba(243,234,216,0.35)'}`,
      background: 'rgba(243,234,216,0.04)',
      borderRadius: 'var(--rad)',
      padding: '14px 18px',
      maxWidth: 520,
      transition: 'border-color 220ms ease',
    }}>
      {/* Search icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
        style={{ color: 'rgba(243,234,216,0.6)', marginRight: 12, flexShrink: 0 }} aria-hidden="true">
        <circle cx="11" cy="11" r="7"/>
        <line x1="16" y1="16" x2="21" y2="21"/>
      </svg>
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
          flex: 1, background: 'transparent', border: 0, outline: 0,
          fontFamily: "var(--font-eb, 'EB Garamond', Georgia, serif)",
          fontStyle: 'italic', fontSize: 17,
          color: 'var(--parchment)',
        }}
      />
      {query.length > 0 && (
        <span className="mono" style={{ color: 'rgba(243,234,216,0.5)', fontSize: 9.5, flexShrink: 0 }}>⏎</span>
      )}
    </div>
  )
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="page-enter">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO — forest background, two columns
      ══════════════════════════════════════════════════════════════════ */}
      <section className="forest-section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Radial gradient atmosphere */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(243,234,216,0.06), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', paddingTop: 96, paddingBottom: 120 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 48, alignItems: 'center',
          }}>

            {/* ── Left: copy ── */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Vol. label */}
              <div className="mono on-forest" style={{ marginBottom: 32, color: T.clay, opacity: 1 }}>
                Vol. I · Established in living memory
              </div>

              {/* H1 */}
              <h1 className="on-forest" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                The Garden<br/>Library
              </h1>

              {/* Subtitle */}
              <p style={{
                fontFamily: "var(--font-eb, 'EB Garamond', Georgia, serif)",
                fontSize: 22, fontStyle: 'italic',
                marginTop: 32, maxWidth: '34ch',
                color: 'rgba(243,234,216,0.86)', lineHeight: 1.55,
              }}>
                Every herb, ritual, and practice our ancestors knew — preserved, sourced, and made whole again.
              </p>

              {/* Search */}
              <div style={{ marginTop: 40 }}>
                <HeroSearch />
              </div>

              {/* Principle chips */}
              <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {(['Prevention First', 'Sourced Not Hallucinated', 'Elder at the Center'] as const).map((p, i) => (
                  <div key={p} style={{
                    fontFamily: 'var(--font-dm-mono, monospace)',
                    fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.18em',
                    border: 0, borderLeft: `2px solid ${T.clay}`,
                    background: 'transparent',
                    color: T.parchment, paddingLeft: 14, lineHeight: 1.5,
                  }}>
                    <span style={{ color: T.clay, marginRight: 6 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: animated botanical ── */}
            <div style={{
              position: 'relative', height: 460,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Orbiting moons — behind plant */}
              <OrbitingMoons radius={210} color="rgba(243,234,216,0.55)" />
              <OrbitingMoons
                radius={250}
                color="rgba(200,155,74,0.55)"
                moons={[
                  { phase: 0.08, speed: 220, offset: 60,  size: 7,  dir: 'ccw' },
                  { phase: 0.92, speed: 280, offset: 200, size: 6,  dir: 'cw'  },
                ]}
              />

              {/* Interactive botanical plant */}
              <MouseTilt maxTilt={5} style={{ color: T.parchment, opacity: 0.82, position: 'relative', zIndex: 2 }}>
                <InteractiveHeroPlant />
              </MouseTilt>

              {/* Concentric ring 1 */}
              <div className="slow-rotate" style={{
                position: 'absolute', width: 380, height: 380,
                border: '1px solid rgba(243,234,216,0.12)',
                borderRadius: '50%', pointerEvents: 'none',
              }}/>
              {/* Concentric ring 2 */}
              <div className="slow-rotate" style={{
                position: 'absolute', width: 460, height: 460,
                border: '1px dashed rgba(243,234,216,0.07)',
                borderRadius: '50%', pointerEvents: 'none',
                animationDuration: '420s', animationDirection: 'reverse',
              }}/>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div style={{
            marginTop: 96, paddingTop: 32,
            borderTop: `1px solid ${T.borderLight}`,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
          }}>
            {([
              ['247',   'Herbs catalogued'],
              ['8',     'Living traditions'],
              ['1,402', 'Practices recorded'],
              ['114',   'Elders consulted'],
            ] as const).map(([n, l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)",
                  fontStyle: 'italic', fontSize: 38, fontWeight: 300,
                  color: T.parchment, lineHeight: 1,
                }}>{n}</div>
                <div className="mono on-forest" style={{ marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. THE EIGHT DOMAINS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 120, paddingBottom: 40 }}>
        <Reveal>
          <div className="mono text-warm">The Eight Domains</div>
          <h2 style={{ marginTop: 16, maxWidth: '18ch' }}>
            Knowledge that has always lived in{' '}
            <span className="display-italic">eight rooms.</span>
          </h2>
          <p className="text-warm" style={{ marginTop: 24, maxWidth: '58ch', fontSize: 19 }}>
            Every tradition that has tended to the human body has organized its knowing into the same handful of categories. We use them as the structure of the archive.
          </p>
        </Reveal>

        {/* Domain cards grid — gap:1px with forest background creates hairline borders */}
        <div style={{
          marginTop: 64,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 1,
          background: T.border,
          border: `1px solid ${T.border}`,
          borderRadius: 'var(--rad-lg)',
          overflow: 'hidden',
        }}>
          {DOMAINS.map((d, i) => (
            <Reveal key={d.id} delay={i * 60}>
              <Link href={d.href} className="card" style={{
                borderRadius: 0, border: 0, height: '100%', display: 'block',
                padding: '36px 32px 32px',
                background: 'var(--parchment)',
              }}>
                <ConstellationGlow color="var(--clay)" />
                <div className="card__motif">
                  <DrawOnView drawDur={1800} stagger={70}>
                    <d.Motif size={60} sw={1} />
                  </DrawOnView>
                </div>
                <div className="mono text-clay" style={{ marginTop: 20 }}>{d.label}</div>
                <h3 style={{ marginTop: 12, fontSize: 26 }}>{d.title}</h3>
                <p className="text-warm" style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7 }}>{d.desc}</p>
                <div style={{ marginTop: 28 }}>
                  <span className="link-action">Enter <span className="arrow">→</span></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. ELDER QUOTE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 140, paddingBottom: 80 }}>
        <Reveal>
          <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'left' }}>
            <div className="mono text-clay">On Learning From Elders</div>
            <blockquote style={{
              margin: '40px 0 0 0', padding: 0,
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(28px, 3.6vw, 46px)',
              lineHeight: 1.28, letterSpacing: '-0.015em',
              color: 'var(--ink)', textWrap: 'pretty',
              position: 'relative', paddingLeft: 48,
            } as React.CSSProperties}>
              <span style={{
                position: 'absolute', left: 0, top: -8,
                fontSize: 80, color: T.clay, lineHeight: 1, fontStyle: 'normal',
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)",
              }}>&ldquo;</span>
              She knew the plants by name before she knew their Latin. She knew what each one asked of you, and what it would give in return. That knowing is what we are trying to hold.
            </blockquote>
            <div style={{ marginTop: 32, paddingLeft: 48, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gray-warm)' }} />
              <span className="mono text-warm">On learning from elders · oral tradition</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. HERBS PREVIEW
      ══════════════════════════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div style={{ color: 'var(--gray-warmer)' }}>
          <GrowingTendrilRule />
        </div>
        <Reveal>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginTop: 32, gap: 24, flexWrap: 'wrap',
          }}>
            <div>
              <div className="mono text-warm">From The Herbal</div>
              <h2 style={{ marginTop: 16 }}>Recently entered</h2>
            </div>
            <Link href="/botica" className="link-action">
              All 247 herbs <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>

        <div style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {HOMEPAGE_HERBS.map((h, i) => (
            <Reveal key={h.name} delay={i * 50}>
              <Link href={h.href} style={{ display: 'block' }}>
                <article className="card" style={{ height: '100%' }}>
                  <div className="mono" style={{ color: T.moss }}>{h.tradition}</div>
                  <h3 className="display-italic" style={{ marginTop: 12, fontSize: 32, fontStyle: 'italic', fontWeight: 400 }}>
                    {h.name}
                  </h3>
                  <div className="display-italic text-warm" style={{ fontSize: 16, marginTop: 4 }}>{h.binomial}</div>
                  <p className="text-warm" style={{ marginTop: 20, fontSize: 15, lineHeight: 1.7 }}>{h.note}</p>
                  <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="link-action">Read entry <span className="arrow">→</span></span>
                    {h.id === 'ashwagandha' && (
                      <span className="badge badge--moss" style={{ fontSize: 9.5, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Seal size={12} /> Community Record
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. SEASONAL — forest background with falling petals
      ══════════════════════════════════════════════════════════════════ */}
      <section className="forest-section" style={{ marginTop: 120, position: 'relative', overflow: 'hidden' }}>
        <FallingPetals density={0.00006} color="rgba(243,234,216,0.32)" drift={0.03} />
        <div className="container" style={{ paddingTop: 120, paddingBottom: 120, position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
            gap: 80, alignItems: 'center',
          }}>
            {/* Left: animated seasonal sun illustration */}
            <div style={{
              color: T.parchment, opacity: 0.7,
              justifySelf: 'center', position: 'relative',
            }}>
              <MouseTilt maxTilt={8}>
                <DrawOnView drawDur={2400} stagger={80}>
                  <div className="breathe" style={{ animationDuration: '12s' }}>
                    <TravelingSunSeasonal size={280} sw={0.8} />
                  </div>
                </DrawOnView>
              </MouseTilt>
            </div>

            {/* Right: seasonal copy */}
            <div>
              <div className="mono on-forest" style={{ color: T.clay, opacity: 1 }}>
                This Season · Late Spring
              </div>
              <h2 className="on-forest" style={{ marginTop: 24 }}>
                What the body asks for{' '}
                <span className="display-italic">when the light returns.</span>
              </h2>
              <p className="on-forest" style={{
                marginTop: 24, fontSize: 19, maxWidth: '54ch',
                color: 'rgba(243,234,216,0.86)',
              }}>
                Late spring is a clearing time. The liver lengthens. The blood thins. Bitter greens move what the long dark held. Older traditions called this the right moment for gentle internal practice — before the body turns its attention outward to summer.
              </p>

              {/* Three seasonal herbs */}
              <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {([
                  ['Dandelion', 'Taraxacum officinale'],
                  ['Nettle',    'Urtica dioica'],
                  ['Burdock',   'Arctium lappa'],
                ] as const).map(([n, b]) => (
                  <div key={n} style={{ borderLeft: `1px solid ${T.borderLight}`, paddingLeft: 16 }}>
                    <div className="display-italic on-forest" style={{ fontSize: 22, fontStyle: 'italic' }}>{n}</div>
                    <div className="display-italic" style={{
                      fontSize: 14, fontStyle: 'italic',
                      color: 'rgba(243,234,216,0.55)',
                    }}>{b}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: 40 }}>
                <Link href="/practices" className="btn btn--ghost-light">
                  Late spring practices <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. CLOSING — centered invitation
      ══════════════════════════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div className="mono text-clay">A Living Archive</div>
            <h2 className="display-italic" style={{
              marginTop: 24,
              fontSize: 'clamp(32px, 3.8vw, 48px)',
              fontStyle: 'italic', fontWeight: 300,
            }}>
              The Garden Library grows the way gardens grow — slowly, by hand, with care for what already lives here.
            </h2>
            <div style={{
              marginTop: 40,
              display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
            }}>
              <Link href="/practices" className="btn">Enter the practices</Link>
              <Link href="/contribute" className="btn btn--clay">Contribute knowledge</Link>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  )
}
