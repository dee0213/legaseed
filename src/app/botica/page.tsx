'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { herbs } from '@/lib/data/herbs'

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function BoticaPage() {
  return (
    <div className="min-h-screen bg-cream px-6 py-16 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <p className="label-text text-sage mb-4">Materia Medica</p>
          <h1 className="font-serif font-light text-forest leading-tight tracking-[-0.01em] mb-3"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            The Botica
          </h1>
          <p className="font-serif italic text-warm-gray text-xl">
            An archive of ancestral plant medicines from traditions around the world.
          </p>
          <div className="mt-6 border-b border-border" />
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {herbs.map((herb) => (
            <motion.div
              key={herb.slug}
              variants={cardVariants}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Link href={`/botica/${herb.slug}`}>
                <div className="card p-6 cursor-pointer hover:bg-cream transition-colors duration-200 h-full flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {herb.pharmacologicalActions.slice(0, 2).map((action) => (
                      <span key={action} className="label-text text-sage border border-border px-2 py-0.5">
                        {action}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-serif text-forest font-normal leading-tight mb-1"
                      style={{ fontSize: '1.5rem' }}>
                    {herb.name}
                  </h2>
                  <p className="font-serif italic text-warm-gray text-sm mb-4">
                    {herb.botanicalName}
                  </p>
                  <p className="font-serif text-ink text-sm leading-relaxed line-clamp-3 flex-1">
                    {herb.plainSummary}
                  </p>

                  <p className="label-text text-clay mt-5">View entry →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
