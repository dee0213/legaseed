import type { MetadataRoute } from 'next'
import { herbs } from '@/lib/data/herbs'
import { bodyStages } from '@/lib/data/body-stages'

const BASE = 'https://legaseed.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const herbUrls: MetadataRoute.Sitemap = herbs.map((h) => ({
    url: `${BASE}/botica/${h.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const stageUrls: MetadataRoute.Sitemap = bodyStages.map((s) => ({
    url: `${BASE}/body-through-time/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: BASE,                          lastModified: new Date(), changeFrequency: 'weekly',   priority: 1.0 },
    { url: `${BASE}/botica`,              lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${BASE}/search`,              lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.8 },
    { url: `${BASE}/body-through-time`,   lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE}/contribute`,          lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    ...herbUrls,
    ...stageUrls,
  ]
}
