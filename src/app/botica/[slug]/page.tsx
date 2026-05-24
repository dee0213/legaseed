import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { herbs } from '@/lib/data/herbs'
import HerbEntryClient from '@/components/herb/HerbEntryClient'

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return herbs.map((herb) => ({ slug: herb.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const herb = herbs.find((h) => h.slug === slug)
  if (!herb) return { title: 'Not found' }
  return {
    title: `${herb.name} — Legaseed`,
    description: herb.plainSummary,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HerbDetailPage({ params }: PageProps) {
  const { slug } = await params
  const herb = herbs.find((h) => h.slug === slug)
  if (!herb) notFound()

  return <HerbEntryClient herb={herb} />
}
