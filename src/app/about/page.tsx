import type { Metadata } from 'next'
import { AboutContent } from './_content'

export const metadata: Metadata = {
  title: 'About — Legaseed',
  description:
    'What Legaseed is, why it was built, who governs it, and the source standard that holds the whole archive together.',
}

export default function AboutPage() {
  return <AboutContent />
}
