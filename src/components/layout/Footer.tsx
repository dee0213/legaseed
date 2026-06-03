'use client'

import Link from 'next/link'
import { FooterOrnament, Mark } from '@/components/Botanicals'

const T = {
  forest:    '#2c3d26',
  parchment: '#f3ead8',
  clay:      '#b5694f',
  grayWarm:  '#6f6657',
  border:    'rgba(243,234,216,0.15)',
}

const FONT = {
  serif:  `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:   `var(--font-dm-mono, 'DM Mono', monospace)`,
}

const COLS = [
  {
    title: 'About Legaseed',
    links: [
      { label: 'Who we are',            href: '/about' },
      { label: 'Our editorial standards', href: '/about#source-standard' },
      { label: 'Sourcing tiers',        href: '/about#source-standard' },
      { label: 'The five-axis schema',  href: '/about#schema' },
      { label: 'Press · interviews',    href: '/' },
    ],
  },
  {
    title: 'The Archive',
    links: [
      { label: 'The Herbal',     href: '/botica' },
      { label: 'The Practices',  href: '/practices' },
      { label: 'By tradition',   href: '/traditions' },
      { label: 'By body system', href: '/body-through-time' },
      { label: 'By season',      href: '/practices/seasonal' },
    ],
  },
  {
    title: 'Traditions',
    links: [
      { label: 'Ayurveda',                href: '/traditions/ayurveda' },
      { label: 'Traditional Chinese',     href: '/traditions/tcm' },
      { label: 'European folk',           href: '/traditions/western-herbalism' },
      { label: 'West African',            href: '/traditions/west-african' },
      { label: 'Indigenous Americas',     href: '/traditions/indigenous-north-american' },
    ],
  },
  {
    title: 'Contribute',
    links: [
      { label: 'Submit an entry',         href: '/contribute' },
      { label: 'Verify a source',         href: '/contribute' },
      { label: 'Apply to the council',    href: '/contribute' },
      { label: 'Translate the archive',   href: '/contribute' },
      { label: 'Support the work',        href: '/contribute' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      {/* Background ornament */}
      <div
        className="slow-rotate"
        style={{
          position: 'absolute', left: '50%', top: 60,
          transform: 'translateX(-50%)',
          color: T.parchment, opacity: 0.07,
          pointerEvents: 'none', animationDuration: '480s',
        }}
      >
        <div className="breathe" style={{ animationDuration: '12s' }}>
          <FooterOrnament size={400} sw={0.6}/>
        </div>
      </div>

      <div className="container" style={{ position: 'relative' }}>
        {/* Top: brand + columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) repeat(4, minmax(0, 1fr))',
          gap: 48, alignItems: 'flex-start', paddingBottom: 64,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: T.parchment }}>
              <Mark size={36} sw={1}/>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                <span style={{ fontFamily: FONT.serif, fontSize: 28, fontWeight: 500, color: T.parchment }}>
                  Legaseed
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: '9.5px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(243,234,216,0.6)' }}>
                  The Garden Library
                </span>
              </div>
            </div>
            <p style={{
              marginTop: 28, color: 'rgba(243,234,216,0.75)',
              fontSize: 17, lineHeight: 1.7, maxWidth: 360,
              fontStyle: 'italic', fontFamily: FONT.serif,
            }}>
              A long-form, slow-built archive of the herbs, rituals, and practices that older traditions trusted to time. Made by hand, in conversation with elders.
            </p>
          </div>

          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: FONT.mono, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.clay }}>
                {col.title}
              </div>
              <ul style={{ marginTop: 20, padding: 0, listStyle: 'none' }}>
                {col.links.map(l => (
                  <li key={l.label} style={{ padding: '6px 0' }}>
                    <Link
                      href={l.href}
                      style={{ color: 'rgba(243,234,216,0.78)', fontSize: 16, fontFamily: FONT.serif, transition: 'color 200ms' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = T.parchment)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,234,216,0.78)')}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dedication */}
        <div style={{ padding: '64px 0 48px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: FONT.mono, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(243,234,216,0.5)' }}>
            Dedicated to
          </div>
          <div style={{ marginTop: 16, fontFamily: FONT.serif, fontSize: 28, fontStyle: 'italic', color: T.parchment, fontWeight: 300 }}>
            the grandmothers, herbalists, midwives, monks, and farmers
          </div>
          <div style={{ marginTop: 4, fontFamily: FONT.serif, fontSize: 20, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', fontWeight: 300 }}>
            who kept this knowledge alive when no one was watching.
          </div>
        </div>

        {/* Legal strip */}
        <div style={{
          paddingTop: 32, paddingBottom: 24,
          borderTop: `1px solid ${T.border}`,
          display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: FONT.mono, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(243,234,216,0.4)' }}>
            A living archive · legaseed.com · Not medical advice · Knowledge belongs to its traditions
          </span>
          <span style={{ fontFamily: FONT.mono, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(243,234,216,0.4)' }}>
            © {year} · Volume I, edition one
          </span>
        </div>
      </div>
    </footer>
  )
}
