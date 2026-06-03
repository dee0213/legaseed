'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── Framer Motion variants ───────────────────────────────────────────────────

const EASE_HERO: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const heroContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const heroItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_HERO } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055 } },
}
const reveal = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

// ─── Fonts ────────────────────────────────────────────────────────────────────

const SERIF = "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)"
const MONO  = "var(--font-dm-mono, 'DM Mono', 'Courier New', monospace)"
const BASK  = "var(--font-libre, 'Libre Baskerville', Georgia, serif)"

// Accessibility: DM Mono labels bumped from spec's 8–10px → 11–12px minimum.
// Body weight lifted from spec's 300 → 400 for legibility at Cormorant sizes.
const LBL   = '12px'   // section labels    (spec: 0.56–0.60rem ≈ 9–10px)
const LBL_S = '11px'   // secondary labels  (spec: 0.52–0.55rem ≈ 8–9px)

// ─── Color tokens ─────────────────────────────────────────────────────────────

const forest    = '#2c3d26'
const parchment = '#f2ead8'
const warmWhite = '#fdfaf3'
const cream     = '#faf6ec'
const clay      = '#b5694f'
const sage      = '#7a8c6e'
const ink       = '#1a1810'
const warmGray  = '#8a8070'
const border    = '#d8cebc'
const body      = '#3a3428'

// Lifted ghost text on dark bg: informational ≥ 0.65 opacity (was 0.25–0.40)
const parchment88 = 'rgba(242,234,216,0.88)'
const parchment70 = 'rgba(242,234,216,0.70)'
const parchment65 = 'rgba(242,234,216,0.65)'

// ─── Page data ────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    num: '01',
    title: 'Prevention before treatment.\nRoot cause before symptom.',
    body: 'Western medicine is brilliant at crisis. Ancestral medicine is brilliant at prevention. Every entry in this archive leads with what the traditions did to keep people well — not just what they did when people got sick. That orientation is structural, not editorial.',
  },
  {
    num: '02',
    title: 'Every claim has a source.\nEvery source is traceable.',
    body: 'The difference between preserving ancestral wisdom and generating wellness content is the citation. No entry publishes without a traceable source — a classical text, a documented oral tradition, a vetted practitioner, a peer-reviewed record. The source field in our database cannot be left empty. That is not a policy. It is an architectural constraint.',
  },
  {
    num: '03',
    title: 'The elder is the authority.\nNot the algorithm.',
    body: 'The Tradition Councils that govern this archive are composed of actual practitioners and knowledge keepers from each tradition — not external experts, not academics studying from the outside. Their authority is editorial and final. We built the platform. They hold the knowledge.',
  },
] as const

const STATS = [
  ['247',   'Herbs catalogued'],
  ['8',     'Living traditions represented'],
  ['1,402', 'Practices recorded'],
  ['114',   'Elders consulted'],
  ['3',     'Source tiers, enforced structurally'],
] as const

const SOURCE_TIERS = [
  {
    badge: 'Tier 1 — Primary',
    badgeBg: `rgba(44,61,38,0.10)`,
    badgeColor: forest,
    title: 'Classical texts & oral tradition',
    body: 'The foundational texts of each tradition. Direct oral transmission cited by name and lineage. Archaeological and ethnographic record.',
    examples: 'Charaka Samhita · Huangdi Neijing · Shennong Bencao Jing · Ibn Sina\'s Canon · Pāli Canon · Ebers Papyrus',
  },
  {
    badge: 'Tier 2 — Scholarly',
    badgeBg: `rgba(201,160,48,0.14)`,
    badgeColor: '#7a5e0a',
    title: 'Peer-reviewed & practitioner',
    body: 'Academic ethnobotany, clinical research, and documented practitioner knowledge with named lineage and credential.',
    examples: 'Journal of Ethnopharmacology · Planta Medica · Rosemary Gladstar · WHO Traditional Medicine',
  },
  {
    badge: 'Community Record',
    badgeBg: `rgba(138,128,112,0.12)`,
    badgeColor: warmGray,
    title: 'Submitted, unreviewed',
    body: 'Community contributions published immediately, clearly labeled as unreviewed. May be elevated by a Tradition Council at any time.',
    examples: 'Family tradition · Personal practice · Community herbalist · All community records are labeled prominently and honestly',
  },
] as const

const TRADITIONS = [
  { name: 'Ayurveda',                       region: 'South Asia · 5,000+ years',                  desc: 'The science of life. Health as balance of three constitutional forces in relationship with diet, season, and daily practice.',                                                                             accent: '#c9a030' },
  { name: 'Traditional Chinese Medicine',   region: 'China, Korea, Japan, Vietnam · 3,000+ years', desc: 'Qi, blood, yin, and yang in dynamic balance. Health as harmony between the body, the seasons, and the five elements.',                                                                                   accent: '#c49a8a' },
  { name: 'West African Traditional Medicine', region: 'Ghana, Nigeria, Senegal, diaspora · Ancient', desc: 'The body in relationship with ancestors, community, and land. Healing as communal, spiritual, and ecological.',                                                                                        accent: '#b5694f' },
  { name: 'Amazonian Plant Medicine',       region: 'Amazon basin · Ancient',                       desc: 'Plants as teachers. The healer\'s relationship with a plant developed through direct communion. The most biodiverse plant medicine knowledge on earth.',                                                accent: '#5a7a4a' },
  { name: 'Caribbean Folk Medicine',        region: 'Jamaica, Trinidad, Haiti, Puerto Rico · 400+ years', desc: 'Syncretic, born from African, Taino, and European contact. Uses what grows locally and what the tradition remembers.',                                                                            accent: '#7a5c8c' },
  { name: 'Unani / Islamic Medicine',       region: 'Middle East, North Africa, South Asia · 1,000+ years', desc: 'Rooted in the Canon of Ibn Sina. Some of the most rigorous medieval documentation of plant medicine ever written.',                                                                           accent: '#c9a030' },
  { name: 'Appalachian Folk Medicine',      region: 'Appalachian Mountains, Eastern US · 300+ years', desc: 'Kitchen medicine. Syncretic European, African, and Cherokee tradition. Passed almost entirely through women.',                                                                                        accent: '#7a8c6e' },
  { name: 'Indigenous North American Medicine', region: 'Turtle Island, multiple nations · Ancient',  desc: 'Plant medicine as relationship, not resource. The plant is asked permission. Sacred knowledge stays sacred.',                                                                                          accent: '#3d5235' },
] as const

const AXES = [
  { index: '01', name: 'Pharmacological Action', desc: 'What the herb or practice actually does: adaptogenic, nervine, emmenagogue, galactagogue, hepatic, immunomodulatory, and more. Filterable tags drawn from both Western and traditional pharmacological frameworks.' },
  { index: '02', name: 'Hormonal Polarity',       desc: 'Feminine (yin / estrogen-affine), Masculine (yang / androgen-affine), Neutral / Adaptogenic, or Biphasic. Displayed as a visual spectrum — not a binary gate. A man with depleted yin benefits from yin-building herbs. The polarity label is information, not restriction.' },
  { index: '03', name: 'Life Stage Suitability',  desc: 'Twelve life stages mapped — menarche through post-menopause, with pregnancy broken by trimester, and the male hormonal journey included. Each stage is marked Supported, Use with Guidance, or Contraindicated. Sourced. Not assumed.' },
  { index: '04', name: 'Known Combinations',      desc: 'How the herb behaves in documented combination with others — what shifts, what amplifies, what contraindication emerges. Documented pairings link bidirectionally. The web builds itself as the archive grows.' },
  { index: '05', name: 'Tradition Lens',           desc: 'How different traditions read the same herb — and where they disagree. Ashwagandha is a primary male rasayana in Ayurveda and a gender-neutral adaptogen in Western herbalism. Both are documented. Neither is erased. The discrepancy is information.' },
] as const

const NOT_THIS = [
  'A wellness brand selling supplements or courses. No product is being endorsed. The knowledge is free and permanently free.',
  'An AI-generated knowledge base. Machine learning may assist with formatting and search. It does not create entries or generate claims.',
  'A competitor to Western medicine. Legaseed holds the preventative and root-cause layer that clinical medicine rarely has time for. The two are complementary.',
  'Medical advice. Nothing in this archive is a prescription. Consult a practitioner for your specific situation. This archive is a reference, not a diagnosis.',
] as const

// ─── Shared sub-components ────────────────────────────────────────────────────

function MonoLabel({ children, color = sage }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: LBL, letterSpacing: '0.2em', textTransform: 'uppercase',
      color, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem',
    }}>
      {children}
      <span aria-hidden="true" style={{ height: 1, width: 48, background: border, flexShrink: 0 }} />
    </div>
  )
}

function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
      letterSpacing: '-0.015em', color: forest, lineHeight: 1.15, margin: '0 0 1.4rem',
    }}>
      {children}
    </h2>
  )
}

function BodyP({ children, maxWidth = 620 }: { children: React.ReactNode; maxWidth?: number }) {
  return (
    <p style={{
      fontFamily: SERIF, fontWeight: 400, fontSize: '1rem',
      color: body, lineHeight: 1.85, maxWidth, marginBottom: '1.2rem',
    }}>
      {children}
    </p>
  )
}

function Callout({ children, accentColor = clay }: { children: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{
      borderLeft: `3px solid ${accentColor}`,
      padding: '1.1rem 1.5rem',
      background: accentColor === forest ? 'rgba(44,61,38,0.04)' : 'rgba(181,105,79,0.04)',
      margin: '2rem 0',
    }}>
      <p style={{
        fontFamily: BASK, fontStyle: 'italic', fontWeight: 400,
        fontSize: '1rem', color: ink, lineHeight: 1.75, margin: 0,
      }}>
        {children}
      </p>
    </div>
  )
}

// ─── Botanical SVG — hero (right side, large) ─────────────────────────────────

function BotanicalHero() {
  return (
    <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <path d="M300 50 C300 50 260 180 230 270 C200 360 80 400 80 400 C80 400 200 440 230 530 C260 620 300 680 300 680"
        stroke={parchment} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M300 50 C300 50 340 180 370 270 C400 360 520 400 520 400 C520 400 400 440 370 530 C340 620 300 680 300 680"
        stroke={parchment} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="195" cy="240" rx="70" ry="34" transform="rotate(-38 195 240)" stroke={parchment} strokeWidth="1.8" fill="none"/>
      <ellipse cx="405" cy="240" rx="70" ry="34" transform="rotate(38 405 240)"  stroke={parchment} strokeWidth="1.8" fill="none"/>
      <ellipse cx="165" cy="370" rx="58" ry="28" transform="rotate(-28 165 370)" stroke={parchment} strokeWidth="1.5" fill="none"/>
      <ellipse cx="435" cy="370" rx="58" ry="28" transform="rotate(28 435 370)"  stroke={parchment} strokeWidth="1.5" fill="none"/>
      <ellipse cx="195" cy="500" rx="62" ry="30" transform="rotate(-42 195 500)" stroke={parchment} strokeWidth="1.4" fill="none"/>
      <ellipse cx="405" cy="500" rx="62" ry="30" transform="rotate(42 405 500)"  stroke={parchment} strokeWidth="1.4" fill="none"/>
      <circle cx="300" cy="400" r="26" stroke={parchment} strokeWidth="1.8" fill="none"/>
      <circle cx="300" cy="400" r="9"  fill={parchment} opacity="0.18"/>
      <path d="M230 300 Q300 255 370 300" stroke={parchment} strokeWidth="1" fill="none" strokeDasharray="5 7" opacity="0.5"/>
      <path d="M200 400 Q300 358 400 400" stroke={parchment} strokeWidth="1" fill="none" strokeDasharray="5 7" opacity="0.5"/>
      <path d="M230 500 Q300 458 370 500" stroke={parchment} strokeWidth="1" fill="none" strokeDasharray="5 7" opacity="0.5"/>
    </svg>
  )
}

// ─── Botanical SVG — elder block (right side, smaller) ────────────────────────

function BotanicalElder() {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%' }} aria-hidden="true">
      <path d="M160 20 C160 20 130 100 110 160 C90 220 20 250 20 250 C20 250 90 280 110 340 C130 400 160 430 160 430"
        stroke={parchment} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M160 20 C160 20 190 100 210 160 C230 220 300 250 300 250 C300 250 230 280 210 340 C190 400 160 430 160 430"
        stroke={parchment} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="105" cy="140" rx="45" ry="22" transform="rotate(-35 105 140)" stroke={parchment} strokeWidth="1.3" fill="none"/>
      <ellipse cx="215" cy="140" rx="45" ry="22" transform="rotate(35 215 140)"  stroke={parchment} strokeWidth="1.3" fill="none"/>
      <ellipse cx="90"  cy="235" rx="38" ry="18" transform="rotate(-25 90 235)"  stroke={parchment} strokeWidth="1.1" fill="none"/>
      <ellipse cx="230" cy="235" rx="38" ry="18" transform="rotate(25 230 235)"  stroke={parchment} strokeWidth="1.1" fill="none"/>
      <circle cx="160" cy="250" r="16" stroke={parchment} strokeWidth="1.4" fill="none"/>
    </svg>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AboutContent() {
  return (
    <>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div style={{ padding: '1.1rem 5vw', borderBottom: `1px solid ${border}`, background: warmWhite }}>
        <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.14em', textTransform: 'uppercase', color: warmGray, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Link href="/" style={{ color: sage, textDecoration: 'none' }}>Legaseed</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          About
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: forest, padding: '7rem 5vw 6rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(242,234,216,0.1)' }}>
        {/* Right-side botanical */}
        <div style={{ position: 'absolute', right: '-2%', top: '-5%', width: '48%', height: '110%', opacity: 0.065, pointerEvents: 'none' }}>
          <BotanicalHero />
        </div>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', maxWidth: 680, display: 'flex', flexDirection: 'column', gap: '1.8rem' }}
        >
          {/* Vol. label */}
          <motion.div variants={heroItem} style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.22em', textTransform: 'uppercase', color: parchment65, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Vol. I · Established in living memory
            <span aria-hidden="true" style={{ width: 48, height: 1, background: 'rgba(242,234,216,0.2)', display: 'inline-block', flexShrink: 0 }} />
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={heroItem} style={{
            fontFamily: SERIF, fontWeight: 300,
            fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
            letterSpacing: '-0.025em', lineHeight: 0.92,
            color: parchment, margin: 0,
          }}>
            What<br />
            <em style={{ color: clay }}>Legaseed</em><br />
            is
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={heroItem} style={{
            fontFamily: SERIF, fontWeight: 400, fontStyle: 'italic',
            fontSize: '1.1rem', color: parchment70, maxWidth: 500, lineHeight: 1.7, margin: 0,
          }}>
            A living archive of ancestral plant knowledge, body practices, and healing traditions — built carefully, sourced honestly, and dedicated to the people who kept this knowledge alive.
          </motion.p>

          {/* Callout */}
          <motion.div variants={heroItem} style={{ borderLeft: `2px solid ${clay}`, padding: '1rem 1.4rem', background: 'rgba(242,234,216,0.04)', maxWidth: 540 }}>
            <p style={{ fontFamily: BASK, fontStyle: 'italic', fontWeight: 400, fontSize: '1rem', color: parchment88, lineHeight: 1.75, margin: 0 }}>
              Before the pharmacy was the forest. Before the prescription was the grandmother. Legaseed is the space between forgetting and remembering.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. THREE PILLARS
      ════════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: parchment, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: '5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <motion.div variants={reveal}><MonoLabel>Founding principles</MonoLabel></motion.div>
            <motion.div variants={reveal}>
              <SectionH2>Three things <em>we will not compromise.</em></SectionH2>
            </motion.div>
          </motion.div>
        </div>

        {/* 3-col grid — gap:1px creates hairline borders */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0, border: `1px solid ${border}`, maxWidth: 900, margin: '3rem auto 0' }}
        >
          {PILLARS.map((p, i) => (
            <motion.div key={p.num} variants={reveal} style={{ padding: '2.2rem 2rem', borderRight: i < PILLARS.length - 1 ? `1px solid ${border}` : undefined }}>
              <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.18em', textTransform: 'uppercase', color: clay, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {p.num}
                <span aria-hidden="true" style={{ height: 1, width: 24, background: clay, opacity: 0.4, display: 'inline-block' }} />
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: '1.1rem', fontWeight: 500, fontStyle: 'italic', color: forest, marginBottom: '0.8rem', lineHeight: 1.3, whiteSpace: 'pre-line', margin: '0 0 0.8rem' }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: '0.93rem', fontWeight: 400, color: warmGray, lineHeight: 1.75, margin: 0 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. ORIGIN STORY
      ════════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '5.5rem 5vw', background: warmWhite }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 35%) minmax(0, 65%)', gap: '5rem', alignItems: 'start' }}>

          {/* Left: sticky aside */}
          <motion.aside
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={reveal}
            style={{ position: 'sticky', top: 80 }}
          >
            <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.18em', textTransform: 'uppercase', color: sage, marginBottom: '1.4rem' }}>
              The archive, in numbers
            </div>
            <div aria-hidden="true" style={{ fontFamily: SERIF, fontWeight: 300, fontSize: '5rem', color: border, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
              247
            </div>
            {STATS.map(([num, label]) => (
              <div key={label} style={{ padding: '1.1rem 0', borderTop: `1px solid ${border}` }}>
                <div style={{ fontFamily: MONO, fontSize: '1.4rem', fontWeight: 400, color: forest, letterSpacing: '-0.02em', marginBottom: '0.15rem' }}>{num}</div>
                <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.14em', textTransform: 'uppercase', color: warmGray }}>{label}</div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${border}` }} />
          </motion.aside>

          {/* Right: prose */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <motion.div variants={reveal}><MonoLabel>How it began</MonoLabel></motion.div>
            <motion.div variants={reveal}>
              <SectionH2>A question <em>without an answer.</em></SectionH2>
            </motion.div>
            <motion.div variants={reveal}>
              <BodyP>
                It started with a simple question: before going to the pharmacy, is there an herb my ancestors would have used? For a UTI, for immune support, for a wound that needed healing. The question turned out to have answers — deep, well-documented, beautifully coherent answers — spread across texts and traditions that had never been gathered into one place.
              </BodyP>
            </motion.div>
            <motion.div variants={reveal}>
              <BodyP>
                Ayurveda had been documenting plant medicine for five thousand years. Traditional Chinese Medicine had compiled materia medica that listed thousands of substances with more clinical nuance than most modern prescribing guides. West African traditions had built entire pharmacopeias from the continent's extraordinary botanical biodiversity. Caribbean folk healers had synthesized African, indigenous, and European knowledge into something wholly new. All of it existed. None of it was in one room.
              </BodyP>
            </motion.div>
            <motion.div variants={reveal}>
              <Callout>
                &ldquo;What our ancestors knew was not a collection of remedies. It was a complete cosmology of the body — its relationship to plants, seasons, earth, water, oils, breath, and silence. Legaseed is not a medicine cabinet. It is a way of seeing.&rdquo;
              </Callout>
            </motion.div>
            <motion.div variants={reveal}>
              <BodyP>
                The wellness industry had extracted pieces of this knowledge — turmeric lattes, ashwagandha supplements, &ldquo;ancient Indian secret&rdquo; marketing copy — without attribution, without context, without the traditions that gave them meaning. The knowledge was being commodified faster than it was being preserved.
              </BodyP>
            </motion.div>
            <motion.div variants={reveal}>
              <BodyP>
                Legaseed is the counter-project. A platform built to hold this knowledge with the seriousness it deserves: fully sourced, culturally attributed, governed by the traditions it documents, and permanently free to access. Not a product. A place.
              </BodyP>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${border}`, margin: 0 }} />

      {/* ══════════════════════════════════════════════════════════════════════
          4. SOURCE STANDARD
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="source-standard" style={{ background: warmWhite, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: '5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <motion.div variants={reveal}><MonoLabel>How we source</MonoLabel></motion.div>
            <motion.div variants={reveal}><SectionH2>The source standard <em>is the platform&rsquo;s spine.</em></SectionH2></motion.div>
            <motion.div variants={reveal}>
              <BodyP>Every entry carries a verification tier — not as a disclaimer, but as information. Community knowledge is welcome here. It is just clearly labeled as unreviewed until it is not.</BodyP>
            </motion.div>
          </motion.div>
        </div>

        {/* 3-tier grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 0, border: `1px solid ${border}`, maxWidth: 900, margin: '2.5rem auto 0' }}
        >
          {SOURCE_TIERS.map((t, i) => (
            <motion.div key={t.badge} variants={reveal} style={{ padding: '1.8rem', borderRight: i < SOURCE_TIERS.length - 1 ? `1px solid ${border}` : undefined }}>
              <div style={{ display: 'inline-block', fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.22rem 0.65rem', background: t.badgeBg, color: t.badgeColor, marginBottom: '1rem' }}>
                {t.badge}
              </div>
              <h4 style={{ fontFamily: SERIF, fontSize: '0.95rem', fontWeight: 500, fontStyle: 'italic', color: forest, marginBottom: '0.6rem', lineHeight: 1.4 }}>
                {t.title}
              </h4>
              <p style={{ fontFamily: SERIF, fontSize: '0.9rem', fontWeight: 400, color: warmGray, lineHeight: 1.65, margin: '0 0 0.75rem' }}>
                {t.body}
              </p>
              <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.06em', color: clay, lineHeight: 1.8 }}>
                {t.examples}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={reveal}>
          <Callout accentColor={forest}>
            One thing this archive will never publish: hallucinated wisdom. AI may assist with formatting, translation, and organization. It does not generate knowledge claims. Every claim has a human source. Every source is named.
          </Callout>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. TRADITIONS
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="traditions" style={{ background: cream, padding: '5.5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <motion.div variants={reveal}><MonoLabel>Eight traditions, one archive</MonoLabel></motion.div>
            <motion.div variants={reveal}><SectionH2>The lineages <em>this archive holds.</em></SectionH2></motion.div>
            <motion.div variants={reveal}>
              <BodyP>Each tradition is documented on its own terms — its philosophy, its key texts, its living practitioners. Where traditions read the same plant differently, we document both. We do not flatten them into a consensus.</BodyP>
            </motion.div>
          </motion.div>
        </div>

        {/* 2-col × 4-row traditions grid — gap:1 with bg color = hairline borders */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: border, border: `1px solid ${border}`, maxWidth: 900, margin: '2.5rem auto 0' }}
        >
          {TRADITIONS.map((t) => (
            <motion.div key={t.name} variants={reveal} style={{ display: 'flex', background: cream }}>
              <div style={{ width: 3, flexShrink: 0, background: t.accent }} aria-hidden="true" />
              <div style={{ padding: '1.3rem 1.5rem', flex: 1 }}>
                <div style={{ fontFamily: SERIF, fontWeight: 500, fontStyle: 'italic', fontSize: '0.95rem', color: forest, marginBottom: '0.2rem' }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.1em', textTransform: 'uppercase', color: warmGray, marginBottom: '0.5rem' }}>
                  {t.region}
                </div>
                <div style={{ fontFamily: SERIF, fontSize: '0.88rem', fontWeight: 400, color: warmGray, lineHeight: 1.65 }}>
                  {t.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. FIVE-AXIS SCHEMA
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="schema" style={{ background: parchment, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: '5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <motion.div variants={reveal}><MonoLabel>How every entry is organized</MonoLabel></motion.div>
            <motion.div variants={reveal}><SectionH2>The five-axis <em>schema.</em></SectionH2></motion.div>
            <motion.div variants={reveal}>
              <BodyP>Every herb and practice is tagged across five dimensions simultaneously. This is not categorization — it is a map.</BodyP>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${border}`, maxWidth: 900, margin: '2.5rem auto 0' }}
        >
          {AXES.map((ax, i) => (
            <motion.div key={ax.index} variants={reveal}
              style={{ display: 'grid', gridTemplateColumns: '56px minmax(160px, 200px) 1fr', borderBottom: i < AXES.length - 1 ? `1px solid ${border}` : undefined, gap: 0 }}>
              {/* Index */}
              <div style={{ padding: '1.4rem 0 1.4rem 1.4rem', fontFamily: MONO, fontSize: '0.75rem', color: clay, letterSpacing: '0.06em', borderRight: `1px solid ${border}`, display: 'flex', alignItems: 'flex-start' }}>
                {ax.index}
              </div>
              {/* Name */}
              <div style={{ padding: '1.4rem 1.2rem', fontFamily: SERIF, fontWeight: 500, fontStyle: 'italic', fontSize: '0.95rem', color: forest, lineHeight: 1.35, borderRight: `1px solid ${border}`, display: 'flex', alignItems: 'flex-start' }}>
                {ax.name}
              </div>
              {/* Description */}
              <div style={{ padding: '1.4rem 1.6rem', fontFamily: SERIF, fontWeight: 400, fontSize: '0.9rem', color: warmGray, lineHeight: 1.65 }}>
                {ax.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. ELDER QUOTE BLOCK
      ════════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: forest, padding: '5.5rem 5vw', position: 'relative', overflow: 'hidden' }}>
        {/* Right-side botanical */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '3vw', top: '50%', transform: 'translateY(-50%)', opacity: 0.05, pointerEvents: 'none', width: 280 }}>
          <BotanicalElder />
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          style={{ maxWidth: 700, position: 'relative' }}
        >
          <motion.div variants={reveal} style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.22em', textTransform: 'uppercase', color: parchment65, marginBottom: '2rem' }}>
            On what we are trying to hold
          </motion.div>
          <motion.blockquote variants={reveal} style={{ fontFamily: BASK, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', color: parchment, lineHeight: 1.65, margin: '0 0 1.5rem' }}>
            &ldquo;She knew the plants by name before she knew their Latin. She knew what each one asked of you, and what it would give in return. That knowing is what we are trying to hold.&rdquo;
          </motion.blockquote>
          <motion.div variants={reveal} style={{ fontFamily: MONO, fontSize: LBL, letterSpacing: '0.14em', textTransform: 'uppercase', color: parchment70 }}>
            On learning from elders · oral tradition
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. WHO WE ARE
      ════════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: cream, padding: '5.5rem 5vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem', alignItems: 'start' }}>

          {/* Left: prose */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <motion.div variants={reveal}><MonoLabel>Who we are</MonoLabel></motion.div>
            <motion.div variants={reveal}><SectionH2>Built by people <em>who had the question.</em></SectionH2></motion.div>
            <motion.div variants={reveal}>
              <BodyP>Legaseed was not built by a wellness brand or a supplement company. It was built by people who had the question — who stood in a pharmacy and wondered what their grandmother would have used, who searched online and found only SEO content stripped of its origin, who felt the weight of knowledge disappearing faster than it was being written down.</BodyP>
            </motion.div>
            <motion.div variants={reveal}>
              <BodyP>The platform is governed by Tradition Councils — practitioners and knowledge keepers from each documented lineage who hold editorial review authority over entries in their domain. The archive belongs to the traditions it documents, not to its builders.</BodyP>
            </motion.div>
          </motion.div>

          {/* Right: "What we are not" */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}>
            <motion.div variants={reveal}><MonoLabel>What we are not</MonoLabel></motion.div>
            <motion.div variants={reveal} style={{ border: `1px solid ${border}` }}>
              {NOT_THIS.map((item, i) => (
                <div key={i} style={{ padding: '1.1rem 1.4rem', borderBottom: i < NOT_THIS.length - 1 ? `1px solid ${border}` : undefined }}>
                  <div style={{ fontFamily: MONO, fontSize: LBL_S, letterSpacing: '0.12em', textTransform: 'uppercase', color: clay, marginBottom: '0.3rem' }}>
                    Not this
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: '0.92rem', fontWeight: 400, color: warmGray, lineHeight: 1.65 }}>
                    {item}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. CTA STRIP
      ════════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: warmWhite, borderTop: `1px solid ${border}`, padding: '4rem 5vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={reveal}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: 'italic', fontSize: '1.5rem', color: forest, margin: '0 0 0.4rem' }}>
            The archive is open.
          </h3>
          <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: '0.92rem', color: warmGray, margin: 0 }}>
            Every entry is free. The knowledge belongs to its traditions.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={reveal}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/botica" style={{
            fontFamily: MONO, fontSize: LBL, letterSpacing: '0.16em', textTransform: 'uppercase',
            textDecoration: 'none', padding: '0.85rem 1.6rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: forest, color: parchment,
            border: `1px solid ${forest}`,
            transition: 'background 0.22s ease-out, border-color 0.22s ease-out',
          }}>
            Enter the Botica →
          </Link>
          <Link href="/contribute" style={{
            fontFamily: MONO, fontSize: LBL, letterSpacing: '0.16em', textTransform: 'uppercase',
            textDecoration: 'none', padding: '0.85rem 1.6rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'transparent', color: forest,
            border: `1px solid ${border}`,
            transition: 'border-color 0.22s ease-out',
          }}>
            Contribute knowledge
          </Link>
        </motion.div>
      </div>
    </>
  )
}
