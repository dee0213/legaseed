'use client'

import { Suspense, useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { LifeStage } from '@/lib/types'
import { herbs } from '@/lib/data/herbs'

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  forest:     '#2c3d26',
  moss:       '#3d5235',
  sage:       '#7a8c6e',
  fern:       '#5a7a4a',
  clay:       '#b5694f',
  terracotta: '#c4714a',
  ochre:      '#c9a030',
  sienna:     '#8b4a2a',
  dustyRose:  '#c49a8a',
  plum:       '#7a5c8c',
  cream:      '#faf6ec',
  parchment:  '#f2ead8',
  border:     '#d8cebc',
  warmGray:   '#8a8070',
  ink:        '#1a1810',
}

const FONT = {
  serif: `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:  `var(--font-dm-mono, 'DM Mono', monospace)`,
}

// ─── Filter constants ─────────────────────────────────────────────────────────

const ACTIONS = [
  'adaptogenic', 'estrogenic', 'androgenic', 'nervine', 'hepatic',
  'emmenagogue', 'galactagogue', 'immunomodulatory', 'diuretic', 'antifungal',
]

const POLARITY_OPTIONS = [
  { value: 'yin',      label: 'Yin · Feminine',         color: T.plum },
  { value: 'neutral',  label: 'Neutral · Adaptogenic',  color: T.ochre },
  { value: 'yang',     label: 'Yang · Masculine',       color: T.forest },
  { value: 'biphasic', label: 'Biphasic',               color: T.clay },
]

const LIFE_STAGE_GROUPS: { label: string; stages: { stage: LifeStage; label: string }[] }[] = [
  { label: 'Monthly Cycle', stages: [
    { stage: 'menarche',   label: 'Menarche' },
    { stage: 'follicular', label: 'Follicular' },
    { stage: 'ovulatory',  label: 'Ovulatory' },
    { stage: 'luteal',     label: 'Luteal' },
    { stage: 'menstrual',  label: 'Menstrual' },
  ]},
  { label: 'Pregnancy', stages: [
    { stage: 'pregnancy-t1', label: 'Pregnancy · T1' },
    { stage: 'pregnancy-t2', label: 'Pregnancy · T2' },
    { stage: 'pregnancy-t3', label: 'Pregnancy · T3' },
    { stage: 'postpartum',   label: 'Postpartum' },
  ]},
  { label: 'Life Chapters', stages: [
    { stage: 'perimenopause',  label: 'Perimenopause' },
    { stage: 'post-menopause', label: 'Post-Menopause' },
  ]},
  { label: 'Male', stages: [
    { stage: 'male-hormonal', label: 'Male Hormonal' },
  ]},
]

const ALL_LIFE_STAGES = LIFE_STAGE_GROUPS.flatMap((g) => g.stages)

const TRADITIONS = [
  'Ayurveda', 'TCM', 'West African', 'Amazonian', 'Caribbean',
  'Andean', 'Appalachian', 'Indigenous North American', 'Integrative',
]

const DOMAINS = [
  { id: 'apothecary',            label: 'Botica',                 color: T.forest },
  { id: 'body-rituals',          label: 'Body Rituals',           color: T.clay },
  { id: 'skin-care',             label: 'Skin Care',              color: T.dustyRose },
  { id: 'hair-care',             label: 'Hair Care',              color: T.ochre },
  { id: 'reproductive-wisdom',   label: 'Reproductive Wisdom',    color: T.plum },
  { id: 'energetic-spiritual',   label: 'Energetic & Spiritual',  color: T.fern },
  { id: 'contemplative',         label: 'Contemplative',          color: T.moss },
  { id: 'seasonal',              label: 'Seasonal',               color: T.terracotta },
]

// ─── Leaf search icon ─────────────────────────────────────────────────────────

function LeafSearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16 Q8.5 11 9 6.5 Q9.5 2.5 9 1" stroke={T.sage} strokeWidth="1" strokeLinecap="round"/>
      <path d="M9 10 Q5.5 8.5 4 5.5 Q6.5 6.5 9 10Z" stroke={T.sage} strokeWidth="0.8" fill="none"/>
      <path d="M9 10 Q12.5 8.5 14 5.5 Q11.5 6.5 9 10Z" stroke={T.sage} strokeWidth="0.8" fill="none"/>
      <path d="M9 6.5 Q6.5 5.5 5.5 3 Q7.5 4 9 6.5Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
      <path d="M9 6.5 Q11.5 5.5 12.5 3 Q10.5 4 9 6.5Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
    </svg>
  )
}

// ─── Tiny herb mark (4 variants for card variety) ─────────────────────────────

function TinyHerbMark({ variant }: { variant: number }) {
  const v = variant % 4
  return (
    <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <path d="M20 54 Q19.5 40 20 27 Q20.5 14 20 5" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      {v === 0 && <>
        <path d="M20 38 Q12 34 9 26 Q14.5 29 20 38Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <path d="M20 38 Q28 34 31 26 Q25.5 29 20 38Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <path d="M20 22 Q14 19 12 12 Q16.5 15 20 22Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
        <path d="M20 22 Q26 19 28 12 Q23.5 15 20 22Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
      </>}
      {v === 1 && <>
        <path d="M20 40 Q11 36 8 27 Q14 30 20 40Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <path d="M20 25 Q28 21 30 13 Q25 16 20 25Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <circle cx="20" cy="8" r="2.5" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <circle cx="23" cy="5.5" r="2.5" stroke={T.sage} strokeWidth="0.7" fill="none"/>
      </>}
      {v === 2 && <>
        <path d="M20 42 Q13 37 11 28 Q16 32 20 42Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <path d="M20 42 Q27 37 29 28 Q24 32 20 42Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <path d="M20 24 Q14 21 13 14 Q17 17 20 24Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
        <path d="M20 24 Q26 21 27 14 Q23 17 20 24Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
        <path d="M20 5 Q22 2 20 0 Q18 2 20 5Z" stroke={T.forest} strokeWidth="0.7" fill="none"/>
      </>}
      {v === 3 && <>
        <path d="M20 38 Q12 34 10 26 Q15 29 20 38Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <path d="M20 26 Q14 23 13 16 Q17 19 20 26Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
        <path d="M20 26 Q26 23 27 16 Q23 19 20 26Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
        <path d="M20 38 Q28 34 30 26 Q25 29 20 38Z" stroke={T.sage} strokeWidth="0.7" fill="none"/>
      </>}
    </svg>
  )
}

// ─── Result card ──────────────────────────────────────────────────────────────

function ResultCard({ herb, index }: { herb: (typeof herbs)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.06, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Link href={`/botica/${herb.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <div style={{
          background: T.parchment, border: `1px solid ${T.border}`,
          padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column',
          transition: 'border-color 0.18s', cursor: 'pointer',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.sage)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
        >
          {/* Tiny botanical mark */}
          <div style={{ width: '36px', marginBottom: '1rem', opacity: 0.75 }}>
            <TinyHerbMark variant={index} />
          </div>
          {/* Name */}
          <h2 style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.3rem', fontWeight: 400, color: T.forest, lineHeight: 1.2, marginBottom: '3px' }}>
            {herb.name}
          </h2>
          <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.82rem', color: T.warmGray, marginBottom: '10px' }}>
            {herb.botanicalName}
          </p>
          {/* One-line summary */}
          <p style={{
            fontFamily: FONT.serif, fontSize: '0.88rem', color: T.ink, lineHeight: 1.65, flex: 1,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          } as React.CSSProperties}>
            {herb.plainSummary}
          </p>
          {/* Tags */}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: `1px solid ${T.border}` }}>
            <span style={{ fontFamily: FONT.mono, fontSize: '0.54rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, border: `1px solid ${T.border}`, padding: '2px 6px' }}>
              {herb.hormonalPolarity}
            </span>
            <span style={{ fontFamily: FONT.mono, fontSize: '0.54rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, border: `1px solid ${T.border}`, padding: '2px 6px' }}>
              {herb.region.split(' / ')[0]}
            </span>
            <span style={{ marginLeft: 'auto', fontFamily: FONT.mono, fontSize: '0.54rem', letterSpacing: '0.1em', color: T.clay }}>
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '5rem 2rem', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Decorative SVG */}
      <svg width="48" height="64" viewBox="0 0 48 64" fill="none" style={{ margin: '0 auto 2rem', display: 'block', opacity: 0.35 }}>
        <path d="M24 58 Q23 42 24 28 Q25 14 24 4" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 40 Q14 35 11 24 Q18 28 24 40Z" stroke={T.sage} strokeWidth="1.2" fill="none"/>
        <path d="M24 40 Q34 35 37 24 Q30 28 24 40Z" stroke={T.sage} strokeWidth="1.2" fill="none"/>
        <path d="M24 22 Q16 18 14 8 Q20 12 24 22Z" stroke={T.sage} strokeWidth="1" fill="none"/>
        <path d="M24 22 Q32 18 34 8 Q28 12 24 22Z" stroke={T.sage} strokeWidth="1" fill="none"/>
      </svg>

      <p style={{ fontFamily: FONT.mono, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.warmGray, marginBottom: '1.25rem' }}>
        We haven&apos;t documented this yet
      </p>
      <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.25rem', color: T.ink, lineHeight: 1.7, marginBottom: '2rem' }}>
        This knowledge may live in an elder&apos;s memory. Would you like to contribute it?
      </p>
      <Link href="/contribute" style={{
        fontFamily: FONT.mono, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase',
        color: T.clay, border: `1px solid ${T.clay}`, padding: '10px 22px', textDecoration: 'none',
        display: 'inline-block', transition: 'all 0.2s',
      }}>
        Contribute to the Archive
      </Link>
    </motion.div>
  )
}

// ─── Main search content ──────────────────────────────────────────────────────

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // URL state
  const urlQuery         = searchParams.get('q') ?? ''
  const selectedActions  = searchParams.getAll('action')
  const selectedPolarity = searchParams.get('polarity') ?? ''
  const selectedStage    = (searchParams.get('stage') ?? '') as LifeStage | ''
  const selectedTradition= searchParams.get('tradition') ?? ''
  const selectedDomain   = searchParams.get('domain') ?? ''

  // Local input state — avoids URL round-trip on every keystroke losing cursor
  const [inputValue, setInputValue] = useState(urlQuery)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  // Keep input in sync when URL changes from external navigation
  useEffect(() => { setInputValue(urlQuery) }, [urlQuery])

  // Build updated query string
  const buildQS = useCallback((updates: Record<string, string | string[] | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.delete(key)
        value.forEach((v) => params.append(key, v))
      } else {
        params.set(key, value)
      }
    })
    return params.toString()
  }, [searchParams])

  const go = useCallback((updates: Record<string, string | string[] | null>, replace = false) => {
    const qs = buildQS(updates)
    const url = qs ? `/search?${qs}` : '/search'
    replace ? router.replace(url, { scroll: false }) : router.push(url, { scroll: false })
  }, [buildQS, router])

  // Input handler
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    go({ q: val || null }, true)
  }

  // Filter togglers
  const toggleAction   = (a: string) => go({ action: selectedActions.includes(a) ? selectedActions.filter((x) => x !== a) : [...selectedActions, a] })
  const setPolarity    = (v: string) => go({ polarity: v === selectedPolarity ? null : v })
  const setStage       = (s: string) => go({ stage:    s === selectedStage    ? null : s })
  const setTradition   = (t: string) => go({ tradition: t === selectedTradition ? null : t })
  const setDomain      = (d: string) => go({ domain:   d === selectedDomain   ? null : d })
  const clearAll       = () => { setInputValue(''); router.push('/search', { scroll: false }) }

  const toggleGroup = (id: string) => setOpenGroup((prev) => prev === id ? null : id)

  // Filtering
  const filtered = useMemo(() => herbs.filter((herb) => {
    if (urlQuery.trim()) {
      const q = urlQuery.toLowerCase()
      const hit =
        herb.name.toLowerCase().includes(q) ||
        herb.botanicalName.toLowerCase().includes(q) ||
        herb.alternateNames.some((n) => n.toLowerCase().includes(q)) ||
        herb.pharmacologicalActions.some((a) => a.toLowerCase().includes(q)) ||
        herb.plainSummary.toLowerCase().includes(q)
      if (!hit) return false
    }
    if (selectedActions.length > 0 && !selectedActions.every((a) => herb.pharmacologicalActions.includes(a))) return false
    if (selectedPolarity && herb.hormonalPolarity !== selectedPolarity) return false
    if (selectedStage   && !herb.lifeStageMap.some((e) => e.stage === selectedStage)) return false
    if (selectedTradition && !herb.traditions.some((t) => t.name === selectedTradition || t.id === selectedTradition)) return false
    if (selectedDomain  && herb.domain !== selectedDomain) return false
    return true
  }), [urlQuery, selectedActions, selectedPolarity, selectedStage, selectedTradition, selectedDomain])

  // Count text
  const regionCount = new Set(filtered.map((h) => h.region.split(' / ')[0])).size
  const countText = filtered.length === 0
    ? 'No entries found'
    : filtered.length === herbs.length
    ? `${herbs.length} entries in the archive`
    : regionCount > 1
    ? `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'} found across ${regionCount} traditions`
    : `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'} found`

  // Active filter chips
  type ActiveFilter = { key: string; value: string; label: string; color?: string }
  const activeFilters: ActiveFilter[] = [
    ...selectedActions.map((a) => ({ key: 'action', value: a, label: a })),
    selectedPolarity  ? { key: 'polarity',  value: selectedPolarity,   label: POLARITY_OPTIONS.find((p) => p.value === selectedPolarity)?.label ?? selectedPolarity,  color: POLARITY_OPTIONS.find((p) => p.value === selectedPolarity)?.color } : null,
    selectedStage     ? { key: 'stage',     value: selectedStage,      label: ALL_LIFE_STAGES.find((s) => s.stage === selectedStage)?.label ?? selectedStage } : null,
    selectedTradition ? { key: 'tradition', value: selectedTradition,  label: selectedTradition } : null,
    selectedDomain    ? { key: 'domain',    value: selectedDomain,     label: DOMAINS.find((d) => d.id === selectedDomain)?.label ?? selectedDomain } : null,
  ].filter((f): f is ActiveFilter => f !== null)

  const hasActiveFilters = activeFilters.length > 0 || inputValue.trim().length > 0

  const removeFilter = (key: string, value: string) => {
    if (key === 'action') go({ action: selectedActions.filter((a) => a !== value) })
    else go({ [key]: null })
  }

  // Filter group config
  const filterGroups = [
    { id: 'actions',   label: 'Actions',     count: selectedActions.length },
    { id: 'polarity',  label: 'Polarity',    count: selectedPolarity ? 1 : 0 },
    { id: 'stage',     label: 'Life Stage',  count: selectedStage ? 1 : 0 },
    { id: 'tradition', label: 'Tradition',   count: selectedTradition ? 1 : 0 },
    { id: 'domain',    label: 'Domain',      count: selectedDomain ? 1 : 0 },
  ]

  // Shared chip style helpers
  const chipStyle = (active: boolean, activeColor?: string): React.CSSProperties => ({
    fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase',
    padding: '4px 10px', border: `1px solid ${active ? (activeColor ?? T.sage) : T.border}`,
    background: active ? (activeColor ? `${activeColor}22` : `${T.sage}22`) : 'transparent',
    color: active ? (activeColor ?? T.forest) : T.warmGray,
    cursor: 'pointer', transition: 'all 0.15s', borderRadius: 0, display: 'inline-block',
  })

  return (
    <div style={{ minHeight: '100vh', background: T.cream }}>

      {/* ── Page header ── */}
      <div style={{ borderBottom: `1px solid ${T.border}`, background: T.parchment }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>
          <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '0.75rem' }}>
            Search the Archive
          </p>
          <h1 style={{ fontFamily: FONT.serif, fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: T.forest, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '1.75rem' }}>
            What is your body asking for?
          </h1>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: '640px' }}>
            <div style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
              <LeafSearchIcon />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInput}
              placeholder="What is your body asking for?"
              style={{
                width: '100%', fontFamily: FONT.serif, fontSize: '1.1rem', color: T.ink,
                background: T.parchment, border: `1px solid #d8cebc`,
                padding: '1.2rem 1.5rem 1.2rem 3rem',
                outline: 'none', transition: 'border-color 0.2s', borderRadius: 0,
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = T.sage)}
              onBlur={(e) => (e.target.style.borderColor = '#d8cebc')}
            />
          </div>

          {/* ── Filter groups ── */}
          <div style={{ marginTop: '1.5rem' }}>

            {/* Group header row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
              {filterGroups.map((group) => {
                const isOpen = openGroup === group.id
                const hasActive = group.count > 0
                return (
                  <button
                    key={group.id}
                    onClick={() => toggleGroup(group.id)}
                    style={{
                      fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.14em',
                      textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0,
                      padding: '6px 14px',
                      background: isOpen ? T.forest : hasActive ? `${T.forest}12` : 'transparent',
                      color: isOpen ? T.parchment : hasActive ? T.forest : T.warmGray,
                      border: `1px solid ${isOpen ? T.forest : hasActive ? T.forest : T.border}`,
                      transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    {group.label}
                    {group.count > 0 && (
                      <span style={{
                        background: isOpen ? T.parchment : T.clay, color: isOpen ? T.forest : T.cream,
                        borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem',
                      }}>
                        {group.count}
                      </span>
                    )}
                    <span style={{ fontSize: '0.5rem', marginLeft: '2px' }}>{isOpen ? '▲' : '▾'}</span>
                  </button>
                )
              })}
            </div>

            {/* Collapsible chip panels */}
            <AnimatePresence>
              {openGroup && (
                <motion.div
                  key={openGroup}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ paddingTop: '0.875rem', paddingBottom: '1rem', borderTop: `1px solid ${T.border}` }}>

                    {openGroup === 'actions' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {ACTIONS.map((action) => (
                          <button key={action} onClick={() => toggleAction(action)}
                            style={chipStyle(selectedActions.includes(action))}>
                            {action}
                          </button>
                        ))}
                      </div>
                    )}

                    {openGroup === 'polarity' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {POLARITY_OPTIONS.map(({ value, label, color }) => (
                          <button key={value} onClick={() => setPolarity(value)}
                            style={chipStyle(selectedPolarity === value, color)}>
                            {label}
                          </button>
                        ))}
                      </div>
                    )}

                    {openGroup === 'stage' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {LIFE_STAGE_GROUPS.map((group) => (
                          <div key={group.label}>
                            <p style={{ fontFamily: FONT.mono, fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.sage, marginBottom: '6px' }}>
                              {group.label}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {group.stages.map(({ stage, label }) => (
                                <button key={stage} onClick={() => setStage(stage)}
                                  style={chipStyle(selectedStage === stage)}>
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {openGroup === 'tradition' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {TRADITIONS.map((t) => (
                          <button key={t} onClick={() => setTradition(t)}
                            style={chipStyle(selectedTradition === t)}>
                            {t}
                          </button>
                        ))}
                      </div>
                    )}

                    {openGroup === 'domain' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {DOMAINS.map(({ id, label, color }) => (
                          <button key={id} onClick={() => setDomain(id)}
                            style={chipStyle(selectedDomain === id, color)}>
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Active filters + result count ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', minHeight: '32px' }}>
          <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, marginRight: '4px' }}>
            {countText}
          </p>
          {activeFilters.map((f) => (
            <span key={`${f.key}-${f.value}`} style={{
              fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              background: f.color ? `${f.color}18` : `${T.sage}18`,
              color: f.color ?? T.forest,
              border: `1px solid ${f.color ? `${f.color}55` : `${T.sage}55`}`,
              padding: '3px 8px 3px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}>
              {f.label}
              <button onClick={() => removeFilter(f.key, f.value)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '0 1px',
                color: 'inherit', fontSize: '0.7rem', lineHeight: 1, opacity: 0.7,
              }}>×</button>
            </span>
          ))}
          {hasActiveFilters && (
            <button onClick={clearAll} style={{
              fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: T.clay, background: 'none',
              border: 'none', cursor: 'pointer', padding: '3px 4px', textDecoration: 'underline',
            }}>
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Results grid ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {filtered.map((herb, i) => (
              <ResultCard key={herb.slug} herb={herb} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Default export with Suspense ─────────────────────────────────────────────

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: T.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', color: T.warmGray, fontSize: '1.1rem' }}>
          Opening the archive…
        </p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
