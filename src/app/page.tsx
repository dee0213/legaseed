'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { herbs } from '@/lib/data/herbs'

// ─── Rooms data ────────────────────────────────────────────────────────────────

const rooms = [
  {
    label: 'MATERIA MEDICA',
    title: 'The Botica',
    description:
      'An encyclopedic archive of 200+ herbs, roots, and plant medicines from traditions around the world.',
    href: '/botica',
    dot: '●',
  },
  {
    label: 'EIGHT DOMAINS',
    title: 'Practices',
    description:
      'Body rituals, skin care, internal cleansing, reproductive wisdom, energetic work, and more.',
    href: '/practices',
    dot: '◆',
  },
  {
    label: 'LIFE STAGE MAP',
    title: 'Body Through Time',
    description:
      'What your body needs changes. Follow the map from menarche to post-menopause and beyond.',
    href: '/body-through-time',
    dot: '◎',
  },
  {
    label: 'LIVING LINEAGES',
    title: 'Traditions',
    description:
      'Ayurveda, TCM, Curanderismo, Indigenous North American, Western Herbalism, and many more.',
    href: '/traditions',
    dot: '○',
  },
]

// ─── Animation variants ────────────────────────────────────────────────────────

const heroVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const featuredHerbs = herbs.slice(0, 6)

  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-cream px-6 py-28 md:px-16 md:py-36">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="initial"
          animate="animate"
          variants={heroVariants}
        >
          <h1
            className="font-serif font-light text-forest leading-[0.88] tracking-[-0.025em] mb-8"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            The Archive of<br />Ancestral Wellness
          </h1>

          <p className="font-accent italic text-sage text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed">
            Twenty traditions. Hundreds of herbs. The knowledge your grandmother kept.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/botica" className="btn-primary">
              Enter the Botica
            </Link>
            <Link
              href="/practices"
              className="inline-block border border-forest text-forest font-mono uppercase tracking-[0.18em] px-5 py-[0.625rem] transition-colors duration-[220ms] ease-out hover:bg-forest hover:text-cream"
              style={{ fontSize: '0.6rem' }}
            >
              Browse Practices
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Four Rooms ────────────────────────────────────────────────── */}
      <section className="bg-parchment px-6 py-20 md:px-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-forest text-3xl md:text-4xl font-normal mb-12">
            Four rooms, one library
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {rooms.map((room) => (
              <motion.div key={room.href} variants={cardVariants}>
                <Link href={room.href} className="block h-full">
                  <motion.div
                    className="card h-full p-6 flex flex-col gap-4 cursor-pointer transition-colors duration-[220ms] ease-out hover:bg-cream"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <span className="text-sage text-lg leading-none" aria-hidden="true">
                      {room.dot}
                    </span>

                    <div>
                      <p className="label-text text-sage mb-2">{room.label}</p>
                      <h3 className="font-serif text-forest text-2xl font-normal leading-tight">
                        {room.title}
                      </h3>
                    </div>

                    <p className="font-serif text-warm-gray text-base leading-relaxed flex-1">
                      {room.description}
                    </p>

                    <span className="label-text text-clay mt-auto">
                      Explore →
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. Herb Grid ──────────────────────────────────────────────────── */}
      <section className="bg-cream px-6 py-20 md:px-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-forest text-3xl md:text-4xl font-normal mb-12">
            From the archive
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {featuredHerbs.map((herb) => (
              <motion.div key={herb.id} variants={cardVariants}>
                <div className="card p-6 flex flex-col gap-3 h-full">
                  <div>
                    <h3 className="font-serif text-forest text-2xl font-normal leading-tight">
                      {herb.name}
                    </h3>
                    <p className="font-serif italic text-warm-gray text-sm mt-0.5">
                      {herb.botanicalName}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {herb.pharmacologicalActions.slice(0, 3).map((action) => (
                      <span
                        key={action}
                        className="label-text text-sage border border-border px-2 py-0.5"
                      >
                        {action}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-2">
                    <Link
                      href={`/botica/${herb.slug}`}
                      className="font-mono text-clay hover:text-terracotta transition-colors duration-[220ms]"
                      style={{ fontSize: '0.7rem' }}
                    >
                      View entry →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Pull Quote ─────────────────────────────────────────────────── */}
      <section className="bg-parchment px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote>
            <p className="pull-quote mb-6">
              &ldquo;The plants were here before us. They will be here after. This archive exists
              because they deserve to be remembered.&rdquo;
            </p>
            <cite className="label-text text-sage not-italic">
              — Legaseed Archive
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── 5. Contribute CTA ─────────────────────────────────────────────── */}
      <section className="bg-forest px-6 py-20 md:px-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-cream text-3xl md:text-4xl font-normal mb-6">
            This archive grows with you
          </h2>
          <p className="font-serif text-cream/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Every entry is a gift forward. Share what your grandmother knew, what your healer
            practiced, what the land taught your people.
          </p>
          <Link
            href="/contribute"
            className="inline-block bg-cream text-forest font-mono uppercase tracking-[0.18em] px-6 py-3 border border-cream transition-colors duration-[220ms] ease-out hover:bg-parchment hover:border-parchment"
            style={{ fontSize: '0.6rem' }}
          >
            Contribute to the Archive
          </Link>
        </div>
      </section>
    </>
  )
}
