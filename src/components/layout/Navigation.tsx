'use client'

import Link from 'next/link'
import { useState } from 'react'

type DropdownItem = {
  label: string
  href: string
}

type NavItem = {
  label: string
  href: string
  dropdown: DropdownItem[]
  isClay?: boolean
}

const navItems: NavItem[] = [
  {
    label: 'Botica',
    href: '/botica',
    dropdown: [
      { label: 'Browse all herbs', href: '/botica' },
      { label: 'Search the archive', href: '/search' },
    ],
  },
  {
    label: 'Practices',
    href: '/practices',
    dropdown: [
      { label: 'All eight domains', href: '/practices' },
      { label: 'Browse practices', href: '/practices' },
    ],
  },
  {
    label: 'Body Through Time',
    href: '/body-through-time',
    dropdown: [
      { label: 'Life stage map', href: '/body-through-time' },
      { label: 'All stages', href: '/body-through-time' },
    ],
  },
  {
    label: 'Traditions',
    href: '/traditions',
    dropdown: [{ label: 'All traditions', href: '/traditions' }],
  },
  {
    label: 'Contribute',
    href: '/contribute',
    isClay: true,
    dropdown: [{ label: 'Share knowledge', href: '/contribute' }],
  },
]

const styles = {
  nav: {
    backgroundColor: '#fdfaf3',
    borderBottom: '1px solid #d8cebc',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    width: '100%',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  wordmark: {
    fontFamily: 'var(--font-cormorant), serif',
    fontSize: '1.25rem',
    fontWeight: 400,
    fontStyle: 'italic' as const,
    color: '#2c3d26',
    textDecoration: 'none',
  },
  navList: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItemWrapper: {
    position: 'relative' as const,
  },
  navLink: (isClay: boolean, isHovered: boolean) => ({
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '0.6rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: isHovered ? '#5a7a4a' : isClay ? '#b5694f' : '#2c3d26',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    whiteSpace: 'nowrap' as const,
  }),
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '12px',
    backgroundColor: '#fdfaf3',
    border: '1px solid #d8cebc',
    padding: '1rem',
    borderRadius: 0,
    boxShadow: 'none',
    minWidth: '180px',
    zIndex: 200,
  },
  dropdownList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.6rem',
  },
  dropdownLink: (isHovered: boolean) => ({
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '0.6rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: isHovered ? '#5a7a4a' : '#2c3d26',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
    display: 'block',
    whiteSpace: 'nowrap' as const,
  }),
}

function DropdownLinkItem({ item }: { item: DropdownItem }) {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <Link
        href={item.href}
        style={styles.dropdownLink(hovered)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item.label}
      </Link>
    </li>
  )
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const [labelHovered, setLabelHovered] = useState(false)

  return (
    <li
      style={styles.navItemWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        style={styles.navLink(!!item.isClay, labelHovered)}
        onMouseEnter={() => setLabelHovered(true)}
        onMouseLeave={() => setLabelHovered(false)}
      >
        {item.label}
      </Link>

      {open && (
        <div style={styles.dropdown}>
          <ul style={styles.dropdownList}>
            {item.dropdown.map((di) => (
              <DropdownLinkItem key={di.href + di.label} item={di} />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export default function Navigation() {
  return (
    <nav style={styles.nav} aria-label="Main navigation">
      <div style={styles.inner}>
        <Link href="/" style={styles.wordmark}>
          Legaseed
        </Link>

        {/* Desktop nav — hidden on small screens via media query class */}
        <ul style={styles.navList} className="nav-desktop-links">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  )
}
