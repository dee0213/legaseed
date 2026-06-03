import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Motion'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'About — Legaseed',
  description: 'A living archive of ancestral plant knowledge, body practices, and healing traditions — built carefully, sourced honestly.',
}

// ─── Typography constants ─────────────────────────────────────────────────────
// All DM Mono labels bumped from prototype's 8–10px (0.52–0.62rem) to 11–12px.
// Body text weight lifted from 300 → 400 throughout.

const SERIF = "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)"
const MONO  = "var(--font-dm-mono, 'DM Mono', monospace)"
const BASK  = "var(--font-libre, 'Libre Baskerville', Georgia, serif)"
const LBL   = '12px'   // section labels: was 0.56–0.60rem ≈ 9–10px
const LBL_S = '11px'   // secondary labels: was 0.52–0.55rem ≈ 8–9px

// ─── Color tokens ─────────────────────────────────────────────────────────────

const C = {
  forest:    '#2c3d26',
  parchment: '#f3ead8',
  clay:      '#b5694f',
  warmWhite: '#fdfaf3',
  border:    '#d8cebc',
  warmGray:  '#8a8070',
  sage:      '#7a8c6e',
  ink:       '#1a1a17',
  ochre:     '#c9a030',
} as const

// Informational text on forest bg: lifted to ≥0.65 opacity (was 0.25–0.40)
const onForest = {
  body:      'rgba(242,234,216,0.88)',
  secondary: 'rgba(242,234,216,0.70)',  // was 0.40–0.45
  label:     'rgba(242,234,216,0.65)',  // was 0.35–0.38
  dim:       'rgba(242,234,216,0.50)',  // decorative only
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRADITIONS = [
  { name: 'Ayurveda',                      region: 'South Asia — India, Sri Lanka, Nepal · 5,000+ years',          desc: 'The science of life. Health as balance of three constitutional forces in relationship with diet, season, and daily practice.', accent: '#c9a030' },
  { name: 'Traditional Chinese Medicine',  region: 'China, Korea, Japan, Vietnam · 3,000+ years',                   desc: 'Qi, blood, yin, and yang in dynamic balance. Health as harmony between the body, the seasons, and the five elements.', accent: '#c49a8a' },
  { name: 'West African Traditional Medicine', region: 'Ghana, Nigeria, Senegal, Cameroon, and diaspora · Ancient', desc: 'The body in relationship with ancestors, community, and land. Healing as communal, spiritual, and ecological.', accent: '#b5694f' },
  { name: 'Amazonian Plant Medicine',      region: 'Amazon basin — Brazil, Peru, Colombia · Ancient',               desc: 'Plants as teachers. The healer\'s relationship with a plant developed through direct communion. The most biodiverse plant medicine knowledge on earth.', accent: '#5a7a4a' },
  { name: 'Caribbean Folk Medicine',       region: 'Jamaica, Trinidad, Haiti, Puerto Rico · 400+ years',            desc: 'Syncretic, born from African, Taino, and European contact. Uses what grows locally and what the tradition remembers.', accent: '#7a5c8c' },
  { name: 'Unani / Islamic Medicine',      region: 'Middle East, North Africa, South Asia · 1,000+ years',          desc: 'Rooted in the Canon of Ibn Sina. Some of the most rigorous medieval documentation of plant medicine ever written.', accent: '#c9a030' },
  { name: 'Appalachian Folk Medicine',     region: 'Appalachian Mountains, Eastern US · 300+ years',                desc: 'Kitchen medicine. Syncretic European, African, and Cherokee tradition. Practical, seasonal, passed almost entirely through women.', accent: '#7a8c6e' },
  { name: 'Indigenous North American Medicine', region: 'Turtle Island — multiple nations · Ancient',               desc: 'Plant medicine as relationship, not resource. The plant is asked permission. Harvesting follows protocols of reciprocity. Sacred knowledge stays sacred.', accent: '#3d5235' },
] as const

const AXES = [
  { index: '01', name: 'Pharmacological Action',  desc: 'What the herb or practice actually does: adaptogenic, nervine, emmenagogue, galactagogue, hepatic, immunomodulatory, and more. These are filterable tags drawn from both Western and traditional pharmacological frameworks — the language of multiple traditions held together.' },
  { index: '02', name: 'Hormonal Polarity',        desc: 'Feminine (yin / estrogen-affine), Masculine (yang / androgen-affine), Neutral / Adaptogenic, or Biphasic. Displayed as a visual spectrum — not a binary gate. A man with depleted yin benefits from yin-building herbs. The polarity label is information, not restriction.' },
  { index: '03', name: 'Life Stage Suitability',   desc: 'Twelve life stages mapped — from menarche through post-menopause, with pregnancy broken by trimester, and the male hormonal journey included. Each stage is marked Supported, Use with Guidance, or Contraindicated. Sourced. Not assumed.' },
  { index: '04', name: 'Known Combinations',       desc: 'How the herb behaves in documented combination with others — what shifts, what amplifies, what contraindication emerges. The combination system is built on discoverability rather than exhaustiveness: documented pairings link bidirectionally. The web builds itself as the archive grows.' },
  { index: '05', name: 'Tradition Lens',           desc: 'How different traditions read the same herb — and where they disagree. Ashwagandha is a primary male rasayana in Ayurveda and a gender-neutral adaptogen in Western herbalism. Both are documented. Neither is erased. The discrepancy is information.' },
] as const

// ─── Shared style helpers ─────────────────────────────────────────────────────

const monoLabel = (color: string = C.sage): React.CSSProperties => ({
  fontFamily: MONO, fontSize: LBL, letterSpacing: '0.2em', textTransform: 'uppercase',
  color, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem',
})

const sectionTitle: React.CSSProperties = {
  fontFamily: SERIF, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
  fontWeight: 400, letterSpacing: '-0.015em', color: C.forest, lineHeight: 1.15,
  marginBottom: '1.4rem',
}

const bodyText: React.CSSProperties = {
  fontFamily: SERIF, fontSize: '1.05rem', fontWeight: 400,
  color: '#3a3428', lineHeight: 1.85, maxWidth: '620px', marginBottom: '1.2rem',
}

const callout = (accent: string = C.clay): React.CSSProperties => ({
  borderLeft: `3px solid ${accent}`,
  padding: '1.2rem 1.5rem',
  background: accent === C.clay ? 'rgba(181,105,79,0.04)' : 'rgba(44,61,38,0.04)',
  margin: '2.2rem 0',
})

// ─── Sub-components ───────────────────────────────────────────────────────────

function MonoLabel({ children, color = C.sage, noRule = false }: {
  children: React.ReactNode; color?: string; noRule?: boolean
}) {
  return (
    <div style={{ ...monoLabel(color), marginBottom: noRule ? '1.6rem' : '1.6rem' }}>
      {children}
      {!noRule && <span style={{ flex: 1, height: 1, background: C.border, maxWidth: 60 }} />}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={sectionTitle}>{children}</h2>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div style={{ padding: '1.1rem 5vw', borderBottom: `1px solid ${C.border}`, background: C.warmWhite }}>
        <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.warmGray, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Link href="/" style={{ color: C.sage, textDecoration: 'none' }}>Legaseed</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          About
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — forest background
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.forest, color: C.parchment, padding: '7rem 5vw 6rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(242,234,216,0.1)' }}>
        {/* Background botanical silhouette */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '-2%', top: '-5%', width: '48%', height: '110%', opacity: 0.065, pointerEvents: 'none' }}>
          <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M300 50 C300 50 260 180 230 270 C200 360 80 400 80 400 C80 400 200 440 230 530 C260 620 300 680 300 680" stroke="#f2ead8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M300 50 C300 50 340 180 370 270 C400 360 520 400 520 400 C520 400 400 440 370 530 C340 620 300 680 300 680" stroke="#f2ead8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <ellipse cx="195" cy="240" rx="70" ry="34" transform="rotate(-38 195 240)" stroke="#f2ead8" strokeWidth="1.8" fill="none"/>
            <ellipse cx="405" cy="240" rx="70" ry="34" transform="rotate(38 405 240)" stroke="#f2ead8" strokeWidth="1.8" fill="none"/>
            <ellipse cx="165" cy="370" rx="58" ry="28" transform="rotate(-28 165 370)" stroke="#f2ead8" strokeWidth="1.5" fill="none"/>
            <ellipse cx="435" cy="370" rx="58" ry="28" transform="rotate(28 435 370)" stroke="#f2ead8" strokeWidth="1.5" fill="none"/>
            <ellipse cx="195" cy="500" rx="62" ry="30" transform="rotate(-42 195 500)" stroke="#f2ead8" strokeWidth="1.4" fill="none"/>
            <ellipse cx="405" cy="500" rx="62" ry="30" transform="rotate(42 405 500)" stroke="#f2ead8" strokeWidth="1.4" fill="none"/>
            <circle cx="300" cy="400" r="26" stroke="#f2ead8" strokeWidth="1.8" fill="none"/>
            <circle cx="300" cy="400" r="9" fill="#f2ead8" opacity="0.18"/>
            <path d="M230 300 Q300 255 370 300" stroke="#f2ead8" strokeWidth="1" fill="none" strokeDasharray="5 7" opacity="0.5"/>
            <path d="M200 400 Q300 358 400 400" stroke="#f2ead8" strokeWidth="1" fill="none" strokeDasharray="5 7" opacity="0.5"/>
            <path d="M230 500 Q300 458 370 500" stroke="#f2ead8" strokeWidth="1" fill="none" strokeDasharray="5 7" opacity="0.5"/>
          </svg>
        </div>

        <div style={{ position: 'relative', maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {/* Vol. label */}
          <div style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.22em', textTransform: 'uppercase', color: onForest.label, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Vol. I · Established in living memory
            <span aria-hidden="true" style={{ width: 48, height: 1, background: 'rgba(242,234,216,0.25)', flexShrink: 0, display: 'inline-block' }} />
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(3.2rem, 8vw, 6.5rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 0.92, color: C.parchment, margin: 0 }}>
            What<br />
            <em style={{ fontStyle: 'italic', color: C.clay }}>Legaseed</em><br />
            is
          </h1>

          {/* Subtitle */}
          <p style={{ fontFamily: SERIF, fontSize: '1.1rem', fontWeight: 400, fontStyle: 'italic', color: onForest.body, maxWidth: '500px', lineHeight: 1.7, margin: 0 }}>
            A living archive of ancestral plant knowledge, body practices, and healing traditions — built carefully, sourced honestly, and dedicated to the people who kept this knowledge alive.
          </p>

          {/* Mandate blockquote */}
          <div style={{ borderLeft: `2px solid ${C.clay}`, padding: '1rem 1.4rem', background: 'rgba(242,234,216,0.04)', maxWidth: '540px' }}>
            <p style={{ fontFamily: BASK, fontStyle: 'italic', fontSize: '1rem', fontWeight: 400, color: onForest.body, lineHeight: 1.75, margin: 0 }}>
              Before the pharmacy was the forest. Before the prescription was the grandmother. Legaseed is the space between forgetting and remembering.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          THREE PILLARS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.parchment, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal><MonoLabel>Founding principles</MonoLabel></Reveal>
          <Reveal>
            <SectionTitle>
              Three things<br /><em style={{ fontStyle: 'italic', color: C.clay }}>we will not compromise.</em>
            </SectionTitle>
          </Reveal>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 0, border: `1px solid ${C.border}`, maxWidth: 900, margin: '3rem auto 0',
        }}>
          {([
            {
              num: '01',
              heading: 'Prevention before treatment.\nRoot cause before symptom.',
              body: 'Western medicine is brilliant at crisis. Ancestral medicine is brilliant at prevention. Every entry in this archive leads with what the traditions did to keep people well — not just what they did when people got sick. That orientation is structural, not editorial.',
            },
            {
              num: '02',
              heading: 'Every claim has a source.\nEvery source is traceable.',
              body: 'The difference between preserving ancestral wisdom and generating wellness content is the citation. No entry publishes without a traceable source — a classical text, a documented oral tradition, a vetted practitioner, a peer-reviewed record. The source field in our database cannot be left empty. That is not a policy. It is an architectural constraint.',
            },
            {
              num: '03',
              heading: 'The elder is the authority.\nNot the algorithm.',
              body: 'The Tradition Councils that govern this archive are composed of actual practitioners and knowledge keepers from each tradition — not external experts, not academics studying from the outside. Their authority is editorial and final. We built the platform. They hold the knowledge.',
            },
          ] as const).map((p, i) => (
            <Reveal key={p.num}>
              <div style={{ padding: '2.2rem 2rem', borderRight: i < 2 ? `1px solid ${C.border}` : undefined, height: '100%' }}>
                <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.clay, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {p.num}
                  <span aria-hidden="true" style={{ height: 1, width: 24, background: C.clay, opacity: 0.4, display: 'inline-block' }} />
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.15rem', fontWeight: 500, fontStyle: 'italic', color: C.forest, marginBottom: '0.8rem', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                  {p.heading}
                </h3>
                <p style={{ fontFamily: SERIF, fontSize: '0.95rem', fontWeight: 400, color: C.warmGray, lineHeight: 1.7, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ORIGIN STORY
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '5.5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)', gap: '5rem', alignItems: 'start' }}>

          {/* Sticky aside — stats */}
          <Reveal>
            <aside style={{ position: 'sticky', top: 80 }}>
              <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sage, marginBottom: '1.4rem' }}>
                The archive, in numbers
              </div>
              <div aria-hidden="true" style={{ fontFamily: SERIF, fontSize: '5rem', fontWeight: 300, color: C.border, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
                247
              </div>
              {([
                ['247',   'Herbs catalogued'],
                ['8',     'Living traditions represented'],
                ['1,402', 'Practices recorded'],
                ['114',   'Elders consulted'],
                ['3',     'Source tiers, enforced structurally'],
              ] as const).map(([num, label]) => (
                <div key={label} style={{ padding: '1.2rem 0', borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: MONO, fontSize: '1.4rem', fontWeight: 400, color: C.forest, letterSpacing: '-0.02em', marginBottom: '0.1rem' }}>{num}</div>
                  <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.warmGray }}>{label}</div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${C.border}` }} />
            </aside>
          </Reveal>

          {/* Main narrative */}
          <Reveal>
            <MonoLabel>How it began</MonoLabel>
            <SectionTitle>
              A question<br /><em style={{ fontStyle: 'italic', color: C.clay }}>without an answer.</em>
            </SectionTitle>

            <p style={bodyText}>
              It started with a simple question: before going to the pharmacy, is there an herb my ancestors would have used? For a UTI, for immune support, for a wound that needed healing. The question turned out to have answers — deep, well-documented, beautifully coherent answers — spread across texts and traditions that had never been gathered into one place.
            </p>
            <p style={bodyText}>
              Ayurveda had been documenting plant medicine for five thousand years. Traditional Chinese Medicine had compiled materia medica that listed thousands of substances with more clinical nuance than most modern prescribing guides. West African traditions had built entire pharmacopeias from the continent's extraordinary botanical biodiversity. Caribbean folk healers had synthesized African, indigenous, and European knowledge into something wholly new. All of it existed. None of it was in one room.
            </p>

            <Reveal>
              <blockquote style={{ ...callout(), fontFamily: BASK, fontStyle: 'italic', fontSize: '1rem', fontWeight: 400, color: C.ink, lineHeight: 1.75 }}>
                "What our ancestors knew was not a collection of remedies. It was a complete cosmology of the body — its relationship to plants, seasons, earth, water, oils, breath, and silence. Legaseed is not a medicine cabinet. It is a way of seeing."
              </blockquote>
            </Reveal>

            <p style={bodyText}>
              The second problem was harder than the first. The wellness industry had extracted pieces of this knowledge — turmeric lattes, ashwagandha supplements, "ancient Indian secret" marketing copy — without attribution, without context, without the traditions that gave them meaning. The knowledge was being commodified faster than it was being preserved.
            </p>
            <p style={bodyText}>
              Legaseed is the counter-project. A platform built to hold this knowledge with the seriousness it deserves: fully sourced, culturally attributed, governed by the traditions it documents, and permanently free to access. Not a product. A place.
            </p>
          </Reveal>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: 0 }} />

      {/* ══════════════════════════════════════════════════════════════════
          SOURCE STANDARD
      ══════════════════════════════════════════════════════════════════ */}
      <section id="source-standard" style={{ background: C.warmWhite, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal><MonoLabel>How we source</MonoLabel></Reveal>
          <Reveal>
            <SectionTitle>
              The source standard<br /><em style={{ fontStyle: 'italic', color: C.clay }}>is the platform's spine.</em>
            </SectionTitle>
          </Reveal>
          <Reveal>
            <p style={{ ...bodyText, margin: '0 0 0 0' }}>
              Every entry carries a verification tier — not as a disclaimer, but as information. Community knowledge is welcome here. It is just clearly labeled as unreviewed until it is not.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0, border: `1px solid ${C.border}`, maxWidth: 900, margin: '2.5rem auto 0' }}>
          {([
            {
              badge: 'Tier 1 — Primary',
              badgeBg: 'rgba(44,61,38,0.10)', badgeColor: C.forest,
              title: 'Classical texts & oral tradition',
              body: 'The foundational texts of each tradition. Direct oral transmission cited by name and lineage. Archaeological and ethnographic record.',
              examples: 'Charaka Samhita · Huangdi Neijing\nShennong Bencao Jing · Ibn Sina\'s Canon\nPāli Canon · Ebers Papyrus\nNamed elder, documented lineage',
            },
            {
              badge: 'Tier 2 — Scholarly',
              badgeBg: 'rgba(201,160,48,0.14)', badgeColor: '#7a5e0a',
              title: 'Peer-reviewed & practitioner',
              body: 'Academic ethnobotany, clinical research, and documented practitioner knowledge with named lineage and credential.',
              examples: 'Journal of Ethnopharmacology\nEconomic Botany · Planta Medica\nRosemary Gladstar · Robin Wall Kimmerer\nWHO Traditional Medicine · NIH NCCIH',
            },
            {
              badge: 'Community Record',
              badgeBg: 'rgba(138,128,112,0.12)', badgeColor: C.warmGray,
              title: 'Submitted, unreviewed',
              body: 'Community contributions are published immediately, clearly labeled as unreviewed. They may be elevated by a Tradition Council member at any time.',
              examples: 'Family tradition · Personal practice\nCommunity herbalist · Local knowledge\nAll community records are labeled\nprominently and honestly',
            },
          ] as const).map((tier, i) => (
            <Reveal key={tier.badge}>
              <div style={{ padding: '1.8rem', borderRight: i < 2 ? `1px solid ${C.border}` : undefined, height: '100%' }}>
                <div style={{ display: 'inline-block', fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.22rem 0.65rem', borderRadius: 2, background: tier.badgeBg, color: tier.badgeColor, marginBottom: '1rem' }}>
                  {tier.badge}
                </div>
                <h4 style={{ fontFamily: SERIF, fontSize: '0.95rem', fontWeight: 500, fontStyle: 'italic', color: C.forest, marginBottom: '0.6rem', lineHeight: 1.4 }}>
                  {tier.title}
                </h4>
                <p style={{ fontFamily: SERIF, fontSize: '0.9rem', fontWeight: 400, color: C.warmGray, lineHeight: 1.65, margin: '0 0 0.7rem' }}>
                  {tier.body}
                </p>
                <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.06em', color: C.clay, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {tier.examples}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ ...callout(C.forest), maxWidth: 900, margin: '2rem auto 0' }}>
            <p style={{ fontFamily: BASK, fontStyle: 'italic', fontSize: '1rem', fontWeight: 400, color: C.ink, lineHeight: 1.75, margin: 0 }}>
              One thing this archive will never publish: hallucinated wisdom. AI may assist with formatting, translation, and organization. It does not generate knowledge claims. Every claim has a human source. Every source is named.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TRADITIONS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="traditions" style={{ padding: '5.5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal><MonoLabel>Eight traditions, one archive</MonoLabel></Reveal>
          <Reveal>
            <SectionTitle>
              The lineages<br /><em style={{ fontStyle: 'italic', color: C.clay }}>this archive holds.</em>
            </SectionTitle>
          </Reveal>
          <Reveal>
            <p style={bodyText}>
              Each tradition is documented on its own terms — its philosophy, its key texts, its living practitioners. Where traditions read the same plant differently, we document both. We do not flatten them into a consensus.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 0, border: `1px solid ${C.border}`, maxWidth: 900, margin: '2.5rem auto 0' }}>
          {TRADITIONS.map((t, i) => (
            <Reveal key={t.name}>
              <div style={{ display: 'grid', gridTemplateColumns: '3px 1fr', borderBottom: i < TRADITIONS.length - 2 ? `1px solid ${C.border}` : undefined, borderRight: i % 2 === 0 ? `1px solid ${C.border}` : undefined }}>
                <div style={{ background: t.accent }} aria-hidden="true" />
                <div style={{ padding: '1.3rem 1.5rem' }}>
                  <div style={{ fontFamily: SERIF, fontSize: '0.95rem', fontWeight: 500, fontStyle: 'italic', color: C.forest, marginBottom: '0.2rem' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.warmGray, marginBottom: '0.5rem' }}>
                    {t.region}
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: '0.9rem', fontWeight: 400, color: C.warmGray, lineHeight: 1.6 }}>
                    {t.desc}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FIVE-AXIS SCHEMA
      ══════════════════════════════════════════════════════════════════ */}
      <section id="schema" style={{ background: C.parchment, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal><MonoLabel>How every entry is organized</MonoLabel></Reveal>
          <Reveal>
            <SectionTitle>
              The five-axis<br /><em style={{ fontStyle: 'italic', color: C.clay }}>schema.</em>
            </SectionTitle>
          </Reveal>
          <Reveal>
            <p style={bodyText}>
              Every herb and practice in this archive is tagged across five dimensions simultaneously. This is not categorization — it is a map. A user can search for "adaptogenic, yin-building, follicular phase" and find exactly what they are looking for, across all traditions at once.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${C.border}`, maxWidth: 900, margin: '2.5rem auto 0' }}>
          {AXES.map((ax, i) => (
            <Reveal key={ax.index}>
              <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', borderBottom: i < AXES.length - 1 ? `1px solid ${C.border}` : undefined }}>
                <div style={{ padding: '1.5rem 0 1.4rem 1.4rem', fontFamily: MONO, fontSize: '0.75rem', color: C.clay, fontWeight: 400, letterSpacing: '0.06em', borderRight: `1px solid ${C.border}`, display: 'flex', alignItems: 'flex-start' }}>
                  {ax.index}
                </div>
                <div style={{ padding: '1.4rem 1.6rem', display: 'grid', gridTemplateColumns: 'minmax(160px, 200px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
                  <div style={{ fontFamily: SERIF, fontSize: '0.95rem', fontWeight: 500, color: C.forest, fontStyle: 'italic', lineHeight: 1.3 }}>
                    {ax.name}
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: '0.9rem', fontWeight: 400, color: C.warmGray, lineHeight: 1.65 }}>
                    {ax.desc}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ELDER QUOTE — forest background
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.forest, color: C.parchment, padding: '5.5rem 5vw', position: 'relative', overflow: 'hidden' }}>
        {/* Botanical decoration */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '3vw', top: '50%', transform: 'translateY(-50%)', opacity: 0.05, pointerEvents: 'none', width: 320 }}>
          <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
            <path d="M160 20 C160 20 130 100 110 160 C90 220 20 250 20 250 C20 250 90 280 110 340 C130 400 160 430 160 430" stroke="#f2ead8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M160 20 C160 20 190 100 210 160 C230 220 300 250 300 250 C300 250 230 280 210 340 C190 400 160 430 160 430" stroke="#f2ead8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <ellipse cx="105" cy="140" rx="45" ry="22" transform="rotate(-35 105 140)" stroke="#f2ead8" strokeWidth="1.3" fill="none"/>
            <ellipse cx="215" cy="140" rx="45" ry="22" transform="rotate(35 215 140)" stroke="#f2ead8" strokeWidth="1.3" fill="none"/>
            <ellipse cx="90" cy="235" rx="38" ry="18" transform="rotate(-25 90 235)" stroke="#f2ead8" strokeWidth="1.1" fill="none"/>
            <ellipse cx="230" cy="235" rx="38" ry="18" transform="rotate(25 230 235)" stroke="#f2ead8" strokeWidth="1.1" fill="none"/>
            <circle cx="160" cy="250" r="16" stroke="#f2ead8" strokeWidth="1.4" fill="none"/>
          </svg>
        </div>

        <Reveal>
          <div style={{ maxWidth: 700, position: 'relative' }}>
            <div style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.22em', textTransform: 'uppercase', color: onForest.label, marginBottom: '2rem' }}>
              On what we are trying to hold
            </div>
            <blockquote style={{ fontFamily: BASK, fontStyle: 'italic', fontSize: 'clamp(1.15rem, 2.5vw, 1.7rem)', fontWeight: 400, color: C.parchment, lineHeight: 1.65, marginBottom: '1.5rem', margin: '0 0 1.5rem' }}>
              &ldquo;She knew the plants by name before she knew their Latin. She knew what each one asked of you, and what it would give in return. That knowing is what we are trying to hold.&rdquo;
            </blockquote>
            <div style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.14em', textTransform: 'uppercase', color: onForest.secondary }}>
              On learning from elders · oral tradition
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHO BUILT THIS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '5.5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Team narrative */}
          <Reveal>
            <MonoLabel>Who we are</MonoLabel>
            <SectionTitle>
              Built by people<br /><em style={{ fontStyle: 'italic', color: C.clay }}>who had the question.</em>
            </SectionTitle>
            <p style={bodyText}>
              Legaseed was not built by a wellness brand or a supplement company. It was built by people who had the question — who stood in a pharmacy and wondered what their grandmother would have used, who searched online and found only SEO content stripped of its origin, who felt the weight of knowledge disappearing faster than it was being written down.
            </p>
            <p style={bodyText}>
              The platform is governed by Tradition Councils — practitioners and knowledge keepers from each documented lineage who hold editorial review authority over entries in their domain. The archive belongs to the traditions it documents, not to its builders.
            </p>
          </Reveal>

          {/* What we are not */}
          <Reveal>
            <MonoLabel>What we are not</MonoLabel>
            <div style={{ border: `1px solid ${C.border}`, marginTop: '1rem' }}>
              {([
                'A wellness brand selling supplements or courses. No product is being endorsed. The knowledge is free and permanently free.',
                'An AI-generated knowledge base. Machine learning may assist with formatting and search. It does not create entries or generate claims.',
                'A competitor to Western medicine. Legaseed holds the preventative and root-cause layer that clinical medicine rarely has time for. The two are complementary.',
                'Medical advice. Nothing in this archive is a prescription. Consult a practitioner for your specific situation. This archive is a reference, not a diagnosis.',
              ] as const).map((item, i) => (
                <div key={i} style={{ padding: '1.1rem 1.4rem', borderBottom: i < 3 ? `1px solid ${C.border}` : undefined }}>
                  <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.clay, marginBottom: '0.3rem' }}>
                    Not this
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: '0.92rem', fontWeight: 400, color: C.warmGray, lineHeight: 1.6 }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA STRIP
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '4rem 5vw', background: C.warmWhite, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <Reveal>
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: '1.5rem', fontWeight: 400, fontStyle: 'italic', color: C.forest, marginBottom: '0.4rem' }}>
              The archive is open.
            </h3>
            <p style={{ fontFamily: SERIF, fontSize: '0.92rem', fontWeight: 400, color: C.warmGray }}>
              Every entry is free. The knowledge belongs to its traditions.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display: 'flex', gap: '1rem', flexShrink: 0, flexWrap: 'wrap' }}>
            <Link href="/botica" style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.85rem 1.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: C.forest, color: C.parchment, border: `1px solid ${C.forest}`, transition: 'background 220ms ease, border-color 220ms ease' }}>
              Enter the Botica →
            </Link>
            <Link href="/contribute" style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.85rem 1.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: C.forest, border: `1px solid ${C.border}`, transition: 'border-color 220ms ease' }}>
              Contribute knowledge
            </Link>
          </div>
        </Reveal>
      </div>

    </>
  )
}
