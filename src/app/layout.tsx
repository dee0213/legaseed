import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Mono, Libre_Baskerville } from 'next/font/google'
import GrainOverlay from '@/components/layout/GrainOverlay'
import Navigation from '@/components/layout/Navigation'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400'],
  style: ['normal'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-libre',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Legaseed — Ancestral & Indigenous Wellness Knowledge',
  description:
    'A living archive of ancestral and indigenous wellness traditions, herbs, and practices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmMono.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <GrainOverlay />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
