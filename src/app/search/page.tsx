'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { herbs } from '@/lib/data/herbs'
import { lifeStages, lifeStageLabels } from '@/lib/data/life-stages'
import type { LifeStage } from '@/lib/types'

// ─── Constants ────────────────────────────────────────────────────────────────

const POLARITIES = [
  { value: 'yin',      label: 'Yin' },
  { value: 'yang',     label: 'Yang' },
  { value: 'neutral',  label: 'Neutral' },
  { value: 'biphasic', label: 'Biphasic' },
] as const

const TRADITIONS = [
  'Ayurveda',
  'Traditional Chinese Medicine',
  'Western Herbalism',
  'Curanderismo',
  'Indigenous North American',
]

const TIERS = [
  { value: 'community', label: 'Community' },
  { value: 'verified',  label: 'Verified' },
  { value: 'endorsed',  label: 'Endorsed' },
] as const

// ─── Derive all unique pharmacological actions across all herbs ───────────────

const ALL_ACTIONS: string[] = Array.from(
  new Set(herbs.flatMap((h) => h.pharmacologicalActions))
).sort()

// ─── Animation variants ───────────────────────────────────────────────────────

const cardVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.045 },
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-text text-sage mb-3 border-b border-border pb-2">
      {children}
    </p>
  )
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'label-text px-2 py-1 border transition-colors duration-150 cursor-pointer',
        selected
          ? 'bg-sage text-cream border-sage'
          : 'bg-transparent text-forest border-border hover:border-sage',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedActions, setSelectedActions] = useState<string[]>([])
  const [selectedPolarity, setSelectedPolarity] = useState<string>('')
  const [selectedLifeStage, setSelectedLifeStage] = useState<LifeStage | ''>('')
  const [selectedTradition, setSelectedTradition] = useState<string>('')
  const [selectedTier, setSelectedTier] = useState<string>('')

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filteredHerbs = useMemo(() => {
    return herbs.filter((herb) => {
      // Text search
      if (query.trim()) {
        const q = query.toLowerCase()
        const nameMatch = herb.name.toLowerCase().includes(q)
        const botMatch  = herb.botanicalName.toLowerCase().includes(q)
        if (!nameMatch && !botMatch) return false
      }

      // Actions: herb must have ALL selected actions
      if (selectedActions.length > 0) {
        const hasAll = selectedActions.every((a) =>
          herb.pharmacologicalActions.includes(a)
        )
        if (!hasAll) return false
      }

      // Polarity
      if (selectedPolarity && herb.hormonalPolarity !== selectedPolarity) {
        return false
      }

      // Life stage
      if (selectedLifeStage) {
        const hasStage = herb.lifeStageMap.some(
          (entry) => entry.stage === selectedLifeStage
        )
        if (!hasStage) return false
      }

      // Tradition
      if (selectedTradition) {
        const hasTradition = herb.traditions.some(
          (t) => t.name === selectedTradition
        )
        if (!hasTradition) return false
      }

      // Verification tier
      if (selectedTier && herb.verificationTier !== selectedTier) {
        return false
      }

      return true
    })
  }, [
    query,
    selectedActions,
    selectedPolarity,
    selectedLifeStage,
    selectedTradition,
    selectedTier,
  ])

  // ── Filter toggle helpers ──────────────────────────────────────────────────

  function toggleAction(action: string) {
    setSelectedActions((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
    )
  }

  function togglePolarity(value: string) {
    setSelectedPolarity((prev) => (prev === value ? '' : value))
  }

  function toggleLifeStage(stage: LifeStage) {
    setSelectedLifeStage((prev) => (prev === stage ? '' : stage))
  }

  function toggleTradition(name: string) {
    setSelectedTradition((prev) => (prev === name ? '' : name))
  }

  function toggleTier(value: string) {
    setSelectedTier((prev) => (prev === value ? '' : value))
  }

  function clearAll() {
    setQuery('')
    setSelectedActions([])
    setSelectedPolarity('')
    setSelectedLifeStage('')
    setSelectedTradition('')
    setSelectedTier('')
  }

  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedActions.length > 0 ||
    selectedPolarity !== '' ||
    selectedLifeStage !== '' ||
    selectedTradition !== '' ||
    selectedTier !== ''

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-cream">
      {/* ── Page header ── */}
      <div className="px-6 md:px-16 pt-16 pb-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="label-text text-sage mb-3">Search the Archive</p>
          <h1
            className="font-serif font-light text-forest leading-tight tracking-[-0.01em] mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Find what you need
          </h1>

          {/* Text input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by herb name or botanical name…"
            className="w-full md:max-w-lg border border-border bg-parchment font-serif text-ink px-4 py-3 placeholder:text-warm-gray focus:outline-none focus:border-sage transition-colors duration-150"
            style={{ borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">

        {/* ── Left sidebar: filters ── */}
        <aside
          className="w-full md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-border px-6 py-8 md:sticky md:top-0 md:self-start md:max-h-screen md:overflow-y-auto"
          style={{ backgroundColor: '#f2ead8' }}
        >
          <p className="label-text text-forest mb-6">Filters</p>

          {/* ── Axis 1: Pharmacological Actions ── */}
          <div className="mb-7">
            <FilterLabel>Actions</FilterLabel>
            <div className="flex flex-wrap gap-1.5">
              {ALL_ACTIONS.map((action) => (
                <FilterChip
                  key={action}
                  label={action}
                  selected={selectedActions.includes(action)}
                  onClick={() => toggleAction(action)}
                />
              ))}
            </div>
          </div>

          {/* ── Axis 2: Hormonal Polarity ── */}
          <div className="mb-7">
            <FilterLabel>Polarity</FilterLabel>
            <div className="flex flex-wrap gap-1.5">
              {POLARITIES.map(({ value, label }) => (
                <FilterChip
                  key={value}
                  label={label}
                  selected={selectedPolarity === value}
                  onClick={() => togglePolarity(value)}
                />
              ))}
            </div>
          </div>

          {/* ── Axis 3: Life Stage ── */}
          <div className="mb-7">
            <FilterLabel>Life Stage</FilterLabel>
            <div className="flex flex-col gap-1">
              {lifeStages.map((stage) => (
                <FilterChip
                  key={stage}
                  label={lifeStageLabels[stage]}
                  selected={selectedLifeStage === stage}
                  onClick={() => toggleLifeStage(stage)}
                />
              ))}
            </div>
          </div>

          {/* ── Axis 4: Tradition ── */}
          <div className="mb-7">
            <FilterLabel>Tradition</FilterLabel>
            <div className="flex flex-col gap-1">
              {TRADITIONS.map((name) => (
                <FilterChip
                  key={name}
                  label={name}
                  selected={selectedTradition === name}
                  onClick={() => toggleTradition(name)}
                />
              ))}
            </div>
          </div>

          {/* ── Axis 5: Verification Tier ── */}
          <div className="mb-7">
            <FilterLabel>Verification</FilterLabel>
            <div className="flex flex-wrap gap-1.5">
              {TIERS.map(({ value, label }) => (
                <FilterChip
                  key={value}
                  label={label}
                  selected={selectedTier === value}
                  onClick={() => toggleTier(value)}
                />
              ))}
            </div>
          </div>

          {/* ── Clear filters ── */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="label-text text-clay border border-clay px-3 py-1.5 hover:bg-clay hover:text-cream transition-colors duration-150 cursor-pointer w-full mt-2"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* ── Right: results ── */}
        <main className="flex-1 px-6 md:px-10 py-8 bg-cream">
          {/* Results count */}
          <p className="label-text text-warm-gray mb-6">
            Showing {filteredHerbs.length} of {herbs.length} herbs
          </p>

          {filteredHerbs.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif italic text-warm-gray text-lg">
                No herbs match your filters.
              </p>
              <p className="font-serif text-warm-gray text-sm mt-2">
                Try adjusting them.
              </p>
            </div>
          ) : (
            <motion.div
              key={filteredHerbs.map((h) => h.slug).join(',')}
              variants={staggerContainer}
              initial="animate"
              animate="animate"
              className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            >
              <AnimatePresence mode="wait">
                {filteredHerbs.map((herb) => (
                  <motion.div
                    key={herb.slug}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                  >
                    <Link href={`/botica/${herb.slug}`}>
                      <div className="card p-6 cursor-pointer hover:bg-cream transition-colors duration-200 h-full flex flex-col">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {herb.pharmacologicalActions.slice(0, 3).map((action) => (
                            <span
                              key={action}
                              className="label-text text-sage border border-border px-2 py-0.5"
                            >
                              {action}
                            </span>
                          ))}
                          <span className="label-text text-warm-gray border border-border px-2 py-0.5 ml-auto">
                            {herb.hormonalPolarity}
                          </span>
                        </div>

                        {/* Names */}
                        <h2
                          className="font-serif text-forest font-normal leading-tight mb-1"
                          style={{ fontSize: '1.4rem' }}
                        >
                          {herb.name}
                        </h2>
                        <p className="font-serif italic text-warm-gray text-sm mb-3">
                          {herb.botanicalName}
                        </p>

                        {/* Summary */}
                        <p className="font-serif text-ink text-sm leading-relaxed line-clamp-3 flex-1">
                          {herb.plainSummary}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <span className="label-text text-warm-gray border border-border px-2 py-0.5">
                            {herb.verificationTier}
                          </span>
                          <span className="label-text text-clay">View entry →</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
