import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Mono, Libre_Baskerville, EB_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import GrainOverlay from '@/components/layout/GrainOverlay'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { FloatingDust } from '@/components/Motion'
import { WanderingMoth } from '@/components/Wonder'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-eb',
  display: 'swap',
})

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
  metadataBase: new URL('https://legaseed.com'),
  openGraph: {
    siteName: 'Legaseed',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmMono.variable} ${libreBaskerville.variable} ${ebGaramond.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GrainOverlay />
        <FloatingDust />
        <WanderingMoth speed={0.16} opacity={0.65} />
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
