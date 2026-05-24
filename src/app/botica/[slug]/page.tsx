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
    openGraph: {
      title: `${herb.name} — Legaseed`,
      description: herb.plainSummary,
      type: 'article',
      images: [
        {
          url: `/api/og?slug=${herb.slug}`,
          width: 1200,
          height: 630,
          alt: `${herb.name} — Legaseed`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${herb.name} — Legaseed`,
      description: herb.plainSummary,
      images: [`/api/og?slug=${herb.slug}`],
    },
    alternates: {
      canonical: `/botica/${herb.slug}`,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HerbDetailPage({ params }: PageProps) {
  const { slug } = await params
  const herb = herbs.find((h) => h.slug === slug)
  if (!herb) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${herb.name} — Legaseed`,
    description: herb.plainSummary,
    url: `https://legaseed.com/botica/${herb.slug}`,
    about: {
      '@type': 'Thing',
      name: herb.name,
      alternateName: herb.botanicalName,
      description: herb.plainSummary,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Legaseed',
      url: 'https://legaseed.com',
    },
    inLanguage: 'en',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HerbEntryClient herb={herb} />
    </>
  )
}
