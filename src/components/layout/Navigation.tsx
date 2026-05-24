'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string
  href: string
  sub?: string
}

interface DropdownGroup {
  heading?: string
  items: DropdownItem[]
}

interface NavEntry {
  id: string
  label: string
  href: string
  dropdownGroups: DropdownGroup[]
  isClay?: boolean
  mobileIcon: ReactNode
}

// ─── Design tokens (mirrors tailwind.config.ts) ───────────────────────────────

const T = {
  forest:    '#2c3d26',
  moss:      '#3d5235',
  sage:      '#7a8c6e',
  fern:      '#5a7a4a',
  clay:      '#b5694f',
  warmWhite: '#fdfaf3',
  parchment: '#f2ead8',
  border:    '#d8cebc',
  warmGray:  '#8a8070',
  ink:       '#1a1810',
} as const

const FONT = {
  serif: `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:  `var(--font-dm-mono, 'DM Mono', 'Courier New', monospace)`,
} as const

// ─── SVG Icons (no icon library) ─────────────────────────────────────────────

function IconBotica() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 2C9 2 5.5 5.5 5.5 9a3.5 3.5 0 007 0C12.5 5.5 9 2 9 2z"/>
      <path d="M9 12.5V16"/>
      <path d="M6.5 16h5"/>
    </svg>
  )
}

function IconPractices() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="M9 2.5V4.5M9 13.5v2M2.5 9h2M13.5 9h2"/>
    </svg>
  )
}

function IconBodyTime() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5"/>
      <path d="M9 5.5V9l2.5 1.8"/>
    </svg>
  )
}

function IconTraditions() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 1.5l2.2 5.5h5.3l-4.3 3.1 1.7 5.4L9 12l-4.9 3.5 1.7-5.4L1.5 7h5.3z"/>
    </svg>
  )
}

function IconContribute() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M9 3.5v11M3.5 9h11"/>
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 2l3 3-3 3"/>
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12"/>
    </svg>
  )
}

// ─── Navigation data ──────────────────────────────────────────────────────────

const NAV_ITEMS: NavEntry[] = [
  {
    id: 'botica',
    label: 'Botica',
    href: '/botica',
    mobileIcon: <IconBotica />,
    dropdownGroups: [
      {
        heading: 'Explore',
        items: [
          { label: 'Browse all herbs',   href: '/botica',  sub: '20 entries' },
          { label: 'Search the archive', href: '/search' },
        ],
      },
      {
        heading: 'Filter by',
        items: [
          { label: 'By tradition',  href: '/botica' },
          { label: 'By life stage', href: '/search' },
          { label: 'By action',     href: '/search' },
        ],
      },
    ],
  },
  {
    id: 'practices',
    label: 'Practices',
    href: '/practices',
    mobileIcon: <IconPractices />,
    dropdownGroups: [
      {
        heading: 'Eight domains',
        items: [
          { label: 'Body Rituals',        href: '/practices/body-rituals' },
          { label: 'Skin Care',           href: '/practices/skin-care' },
          { label: 'Hair Care',           href: '/practices/hair-care' },
          { label: 'Internal Cleansing',  href: '/practices/internal-cleansing' },
          { label: 'Reproductive Wisdom', href: '/practices/reproductive-wisdom' },
          { label: 'Energetic & Spiritual', href: '/practices/energetic-spiritual' },
          { label: 'Contemplative',       href: '/practices/contemplative' },
          { label: 'Seasonal',            href: '/practices/seasonal' },
        ],
      },
    ],
  },
  {
    id: 'body-through-time',
    label: 'Body Through Time',
    href: '/body-through-time',
    mobileIcon: <IconBodyTime />,
    dropdownGroups: [
      {
        heading: 'Life stages',
        items: [
          { label: 'Menarche',              href: '/body-through-time/menarche' },
          { label: 'Monthly cycle',         href: '/body-through-time/cycle', sub: 'Follicular · Ovulatory · Luteal' },
          { label: 'Pregnancy & Postpartum', href: '/body-through-time/pregnancy' },
          { label: 'Perimenopause',         href: '/body-through-time/perimenopause' },
          { label: 'Post-Menopause',        href: '/body-through-time/post-menopause' },
          { label: 'Male Hormonal Health',  href: '/body-through-time/male-hormonal' },
        ],
      },
    ],
  },
  {
    id: 'traditions',
    label: 'Traditions',
    href: '/traditions',
    mobileIcon: <IconTraditions />,
    dropdownGroups: [
      {
        heading: 'Living lineages',
        items: [
          { label: 'Ayurveda',                  href: '/traditions/ayurveda',                sub: 'South Asia' },
          { label: 'Traditional Chinese Medicine', href: '/traditions/tcm',               sub: 'East Asia' },
          { label: 'Curanderismo',              href: '/traditions/curanderismo',          sub: 'Latin America' },
          { label: 'Western Herbalism',         href: '/traditions/western-herbalism',     sub: 'Europe & Americas' },
          { label: 'Indigenous North American', href: '/traditions/indigenous-north-american', sub: 'North America' },
        ],
      },
    ],
  },
  {
    id: 'contribute',
    label: 'Contribute',
    href: '/contribute',
    isClay: true,
    mobileIcon: <IconContribute />,
    dropdownGroups: [
      {
        items: [
          { label: 'Share knowledge',     href: '/contribute', sub: 'Submit an entry' },
          { label: 'About the archive',   href: '/contribute' },
          { label: 'Verification process', href: '/contribute' },
        ],
      },
    ],
  },
]

// ─── Search field ─────────────────────────────────────────────────────────────

function SearchField() {
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
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="What is your body asking for?"
      aria-label="Search the archive"
      style={{
        fontFamily: FONT.serif,
        fontSize: '0.8125rem',
        fontStyle: 'italic',
        fontWeight: 300,
        color: T.ink,
        background: T.parchment,
        border: `1px solid ${focused ? T.sage : T.border}`,
        borderRadius: '2px',
        padding: '0.375rem 0.75rem',
        width: '210px',
        outline: 'none',
        transition: 'border-color 200ms ease',
        display: 'block',
      }}
    />
  )
}

// ─── Dropdown link item ───────────────────────────────────────────────────────

function DropdownLinkItem({ item }: { item: DropdownItem }) {
  const [hovered, setHovered] = useState(false)

  return (
    <li>
      <Link
        href={item.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'block',
          fontFamily: FONT.mono,
          fontSize: '0.55rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: hovered ? T.fern : T.forest,
          lineHeight: 1.4,
          transition: 'color 150ms ease',
        }}
      >
        {item.label}
        {item.sub && (
          <span style={{
            display: 'block',
            fontFamily: FONT.serif,
            fontSize: '0.725rem',
            fontStyle: 'italic',
            textTransform: 'none',
            letterSpacing: 0,
            color: T.warmGray,
            marginTop: '0.15rem',
          }}>
            {item.sub}
          </span>
        )}
      </Link>
    </li>
  )
}

// ─── Dropdown panel (Framer Motion animated) ──────────────────────────────────

function DropdownPanel({ groups }: { groups: DropdownGroup[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '1px',
        background: T.warmWhite,
        border: `1px solid ${T.border}`,
        borderRadius: 0,
        minWidth: '210px',
        padding: '0.875rem 1rem',
        zIndex: 200,
      }}
    >
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.heading && (
            <p style={{
              fontFamily: FONT.mono,
              fontSize: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: T.sage,
              marginBottom: '0.5rem',
              paddingBottom: '0.375rem',
              borderBottom: `1px solid ${T.border}`,
            }}>
              {group.heading}
            </p>
          )}
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            {group.items.map(item => (
              <DropdownLinkItem key={item.href + item.label} item={item} />
            ))}
          </ul>
          {gi < groups.length - 1 && (
            <div style={{
              height: '1px',
              background: T.border,
              margin: '0.75rem 0',
            }} />
          )}
        </div>
      ))}
    </motion.div>
  )
}

// ─── Desktop nav item ─────────────────────────────────────────────────────────

function DesktopNavItem({
  item,
  isActive,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavEntry
  isActive: boolean
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const color = isActive ? T.forest : item.isClay ? T.clay : T.warmGray

  return (
    <li
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.href}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          fontFamily: FONT.mono,
          fontSize: '0.55rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color,
          transition: 'color 200ms ease',
          whiteSpace: 'nowrap',
          paddingBottom: '1px',
        }}
      >
        {item.label}

        {/* Active underline — 1px clay line */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: T.clay,
                transformOrigin: 'left center',
              }}
            />
          )}
        </AnimatePresence>
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && <DropdownPanel groups={item.dropdownGroups} />}
      </AnimatePresence>
    </li>
  )
}

// ─── Desktop navigation ───────────────────────────────────────────────────────

function DesktopNav() {
  const pathname = usePathname()
  const [openItem, setOpenItem] = useState<string | null>(null)

  const isActive = (item: NavEntry) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

  return (
    <nav
      aria-label="Main navigation"
      className="hidden md:block"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        zIndex: 100,
        background: T.warmWhite,
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
        gap: '2rem',
      }}>

        {/* Wordmark — "Lega" forest, "seed" clay */}
        <Link href="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
          <span style={{
            fontFamily: FONT.serif,
            fontSize: '1.3rem',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
          }}>
            <span style={{ color: T.forest }}>Lega</span>
            <span style={{ color: T.clay }}>seed</span>
          </span>
        </Link>

        {/* Centre — five nav links */}
        <ul style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.25rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          height: '100%',
        }}>
          {NAV_ITEMS.map(item => (
            <DesktopNavItem
              key={item.id}
              item={item}
              isActive={isActive(item)}
              isOpen={openItem === item.id}
              onMouseEnter={() => setOpenItem(item.id)}
              onMouseLeave={() => setOpenItem(null)}
            />
          ))}
        </ul>

        {/* Right — always-visible search field */}
        <div style={{ flexShrink: 0 }}>
          <SearchField />
        </div>
      </div>
    </nav>
  )
}

// ─── Mobile bottom sheet ──────────────────────────────────────────────────────

function MobileBottomSheet({
  item,
  onClose,
}: {
  item: NavEntry
  onClose: () => void
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26, 24, 16, 0.45)',
          zIndex: 200,
        }}
      />

      {/* Sheet — slides up from bottom */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: T.warmWhite,
          borderTop: `1px solid ${T.border}`,
          zIndex: 210,
          maxHeight: '72vh',
          overflowY: 'auto',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Sheet header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem 0.875rem',
          borderBottom: `1px solid ${T.border}`,
          position: 'sticky',
          top: 0,
          background: T.warmWhite,
          zIndex: 1,
        }}>
          <span style={{
            fontFamily: FONT.mono,
            fontSize: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: T.sage,
          }}>
            {item.label}
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: T.warmGray,
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconClose />
          </button>
        </div>

        {/* Sheet body */}
        <div style={{ padding: '0.75rem 1.25rem 1.5rem' }}>
          {item.dropdownGroups.map((group, gi) => (
            <div key={gi} style={{ marginTop: gi > 0 ? '1.25rem' : 0 }}>
              {group.heading && (
                <p style={{
                  fontFamily: FONT.mono,
                  fontSize: '0.48rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: T.sage,
                  marginBottom: '0.625rem',
                }}>
                  {group.heading}
                </p>
              )}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {group.items.map(di => (
                  <li key={di.href + di.label} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Link
                      href={di.href}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 0',
                        fontFamily: FONT.serif,
                        fontSize: '1rem',
                        fontWeight: 300,
                        color: T.forest,
                        textDecoration: 'none',
                      }}
                    >
                      <span>
                        {di.label}
                        {di.sub && (
                          <span style={{
                            display: 'block',
                            fontFamily: FONT.mono,
                            fontSize: '0.48rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: T.warmGray,
                            marginTop: '0.2rem',
                          }}>
                            {di.sub}
                          </span>
                        )}
                      </span>
                      <span style={{ color: T.warmGray }}>
                        <IconChevronRight />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

// ─── Mobile navigation (bottom bar + bottom sheets) ───────────────────────────

function MobileNav() {
  const pathname = usePathname()
  const [openSheet, setOpenSheet] = useState<string | null>(null)

  const isActive = (item: NavEntry) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

  const activeItem = openSheet ? (NAV_ITEMS.find(i => i.id === openSheet) ?? null) : null

  const toggleSheet = (id: string) =>
    setOpenSheet(prev => (prev === id ? null : id))

  return (
    <>
      {/* Bottom navigation bar */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          zIndex: 100,
          background: T.warmWhite,
          borderTop: `1px solid ${T.border}`,
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <ul style={{
          display: 'flex',
          height: '100%',
          listStyle: 'none',
          margin: 0,
          padding: '0 0.25rem',
        }}>
          {NAV_ITEMS.map(item => {
            const active = isActive(item)
            return (
              <li key={item.id} style={{ flex: 1 }}>
                <button
                  onClick={() => toggleSheet(item.id)}
                  aria-label={`Open ${item.label}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.2rem',
                    width: '100%',
                    height: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: active ? T.forest : item.isClay ? T.clay : T.warmGray,
                    transition: 'color 200ms ease',
                    position: 'relative',
                    padding: 0,
                  }}
                >
                  {/* Active indicator — 1px clay line at top */}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      top: 0,
                      left: '22%',
                      right: '22%',
                      height: '1px',
                      background: T.clay,
                    }} />
                  )}
                  {item.mobileIcon}
                  <span style={{
                    fontFamily: FONT.mono,
                    fontSize: '0.43rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}>
                    {/* Shorten long labels for mobile */}
                    {item.id === 'body-through-time' ? 'Body · Time' : item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom sheets with AnimatePresence for exit animations */}
      <AnimatePresence>
        {activeItem && (
          <div className="md:hidden" key={activeItem.id}>
            <MobileBottomSheet
              item={activeItem}
              onClose={() => setOpenSheet(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function Navigation() {
  return (
    <>
      <DesktopNav />
      {/* Desktop layout spacer — offsets fixed nav height so content isn't hidden beneath it */}
      <div className="hidden md:block" style={{ height: '64px' }} aria-hidden="true" />

      <MobileNav />
      {/* Mobile layout spacer — offsets fixed bottom nav */}
      <div className="md:hidden" style={{ height: '60px' }} aria-hidden="true" />
    </>
  )
}
