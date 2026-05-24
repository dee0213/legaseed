import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { bodyStages, getStageBySlug } from '@/lib/data/body-stages'
import StageDetailClient from '@/components/body-time/StageDetailClient'

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return bodyStages.map((stage) => ({ stage: stage.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ stage: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stage: slug } = await params
  const stage = getStageBySlug(slug)
  if (!stage) return { title: 'Not found' }
  return {
    title: `${stage.name} — Body Through Time — Legaseed`,
    description: stage.physiologyText.slice(0, 160),
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function StageDetailPage({ params }: PageProps) {
  const { stage: slug } = await params
  const stage = getStageBySlug(slug)
  if (!stage) notFound()

  const parentStage = stage.parentSlug ? getStageBySlug(stage.parentSlug) : undefined

  return <StageDetailClient stage={stage} parentStage={parentStage} />
}
