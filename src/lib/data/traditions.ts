import type { Tradition } from '../types'

// ─── Core tradition objects (used by HerbEntry.traditions) ────────────────────

export const traditions: Tradition[] = [
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    region: 'South Asia',
    accentColor: '#c9a030',
    philosophy: 'Balance of doshas; food and herbs as primary medicine',
    keyTexts: ['Charaka Samhita', 'Sushruta Samhita', 'Ashtanga Hridayam'],
  },
  {
    id: 'tcm',
    name: 'Traditional Chinese Medicine',
    region: 'East Asia',
    accentColor: '#c49a8a',
    philosophy: 'Harmonizing qi, yin, yang, and the five elements',
    keyTexts: ['Shennong Bencao Jing', 'Huangdi Neijing', 'Bencao Gangmu'],
  },
  {
    id: 'western-herbalism',
    name: 'Western Herbalism',
    region: 'Europe & Americas',
    accentColor: '#5a7a4a',
    philosophy: 'Plant affinities for body systems; energetics and actions',
    keyTexts: ["Culpeper's Complete Herbal", "King's American Dispensatory"],
  },
  {
    id: 'curanderismo',
    name: 'Curanderismo',
    region: 'Latin America',
    accentColor: '#7a5c8c',
    philosophy: 'Spiritual, emotional, and physical healing as one practice',
    keyTexts: ['Oral traditions', 'Libros de Remedios'],
  },
  {
    id: 'indigenous-north-american',
    name: 'Indigenous North American',
    region: 'North America',
    accentColor: '#3d5235',
    philosophy: 'Reciprocal relationship with plant nations; ceremony and healing intertwined',
    keyTexts: ['Oral traditions'],
  },
  {
    id: 'khoisan',
    name: 'Khoi-San Traditional Medicine',
    region: 'Southern Africa',
    accentColor: '#c9a030',
    philosophy: 'Plant medicine as an extension of land and relationship',
    keyTexts: [],
  },
]

// ─── Rich page entry type ─────────────────────────────────────────────────────
// Used by the /traditions page. Distinct from Tradition which is used by HerbEntry.

export interface TraditionPageEntry {
  id: string
  name: string
  region: string       // Full, detailed region for display
  age: string
  accentColor: string
  accentDark: string   // ~30% darker, for hover border
  keyTexts: string     // Display string (comma-separated or single note)
  philosophy: string   // Full philosophy — card shows first sentence only
  herbCount: number    // Current archive count; update as entries grow
  href: string
}

// ─── Ten tradition page entries ───────────────────────────────────────────────

export const traditionPageEntries: TraditionPageEntry[] = [
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    region: 'South Asia — India, Sri Lanka, Nepal',
    age: '5,000+ years',
    accentColor: '#c9a030',
    accentDark:  '#8d7022',
    keyTexts: 'Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam',
    philosophy:
      'The science of life. Health is the balance of three constitutional forces — vata, pitta, kapha — in relationship with diet, season, and daily practice.',
    herbCount: 12,
    href: '/traditions/ayurveda',
  },
  {
    id: 'tcm',
    name: 'Traditional Chinese Medicine',
    region: 'China, Korea, Japan, Vietnam',
    age: '3,000+ years',
    accentColor: '#c49a8a',
    accentDark:  '#896c61',
    keyTexts: 'Huangdi Neijing, Shennong Bencao Jing, Bencao Gangmu',
    philosophy:
      'Qi, blood, yin, and yang in dynamic balance. Health as harmony between the body, the seasons, and the five elements. Food and herbs are never separated.',
    herbCount: 8,
    href: '/traditions/tcm',
  },
  {
    id: 'west-african',
    name: 'West African Traditional Medicine',
    region: 'Ghana, Nigeria, Senegal, Cameroon, and diaspora',
    age: 'Ancient — oral tradition',
    accentColor: '#b5694f',
    accentDark:  '#7f4a37',
    keyTexts:
      'Oral lineage — primarily undocumented by Western institutions. Documentation is ongoing.',
    philosophy:
      'The body in relationship with ancestors, community, and land. Healing is rarely individual — it is communal, spiritual, and ecological.',
    herbCount: 4,
    href: '/traditions/west-african',
  },
  {
    id: 'amazonian',
    name: 'Amazonian Plant Medicine',
    region: 'Amazon basin — Brazil, Peru, Colombia, Ecuador',
    age: 'Ancient — oral tradition',
    accentColor: '#5a7a4a',
    accentDark:  '#3f5534',
    keyTexts: 'Oral lineage of curanderos, vegetalistas, and plant dieta traditions.',
    philosophy:
      'Plants as teachers. The healer\'s relationship with a plant is developed through long periods of dietary restriction and direct communication. The Amazon holds the most biodiverse plant medicine knowledge on earth.',
    herbCount: 3,
    href: '/traditions/amazonian',
  },
  {
    id: 'caribbean',
    name: 'Caribbean Folk Medicine',
    region: 'Jamaica, Trinidad, Haiti, Barbados, Puerto Rico, Cuba',
    age: '400+ years — syncretic, born from African, indigenous, and European contact',
    accentColor: '#7a5c8c',
    accentDark:  '#554062',
    keyTexts:
      'Oral lineage. Partially documented in: Lans CA et al., Journal of Ethnobiology and Ethnomedicine.',
    philosophy:
      'Pragmatic and syncretic. Uses what grows locally and what the tradition remembers — blending African botanical knowledge with Taino, Arawak, and European folk traditions.',
    herbCount: 5,
    href: '/traditions/caribbean',
  },
  {
    id: 'andean',
    name: 'Andean Traditional Medicine',
    region: 'Peru, Bolivia, Ecuador, Chile — Quechua, Aymara nations',
    age: 'Ancient — pre-Columbian',
    accentColor: '#8b4a2a',
    accentDark:  '#61341d',
    keyTexts:
      'Oral lineage of curanderos and parteras. Partially documented in Peruvian ethnobotanical literature.',
    philosophy:
      'Pachamama (Mother Earth) as living medicine. The concept of ayni — reciprocal relationship with land and plant — underlies all healing practice.',
    herbCount: 2,
    href: '/traditions/andean',
  },
  {
    id: 'appalachian',
    name: 'Appalachian Folk Medicine',
    region: 'Appalachian mountains, Eastern United States',
    age: '300+ years — syncretic European, African, and Cherokee tradition',
    accentColor: '#7a8c6e',
    accentDark:  '#55624d',
    keyTexts:
      "Cavender A., Folk Medical Lexicon of South Central Appalachia; oral family lineage.",
    philosophy:
      'Kitchen medicine. What grows on the land or can be dried and stored. Practical, seasonal, often passed entirely through women in a family.',
    herbCount: 3,
    href: '/traditions/appalachian',
  },
  {
    id: 'unani',
    name: 'Unani / Islamic Medicine',
    region: 'Middle East, North Africa, South Asia, Central Asia',
    age: '1,000+ years in formal documentation; roots in ancient Greek medicine',
    accentColor: '#c9a030',
    accentDark:  '#8d7022',
    keyTexts:
      'Ibn Sina, Al-Qanun fi al-Tibb (Canon of Medicine); Al-Biruni, Kitab al-Saydala.',
    philosophy:
      'The four humors in balance. Medicine is a complete system of diet, temperament, environment, and herbal intervention. Some of the most rigorous medieval documentation of plant medicine exists in Unani texts.',
    herbCount: 6,
    href: '/traditions/unani',
  },
  {
    id: 'indigenous-north-american',
    name: 'Indigenous North American Medicine',
    region: 'Turtle Island — Lakota, Cherokee, Haudenosaunee, Anishinaabe, Navajo, and more',
    age: 'Ancient — oral tradition',
    accentColor: '#3d5235',
    accentDark:  '#2b3925',
    keyTexts:
      "Oral lineage. Moerman DE, Native American Ethnobotany (Timber Press, 1998) — the most comprehensive secondary source.",
    philosophy:
      'Plant medicine as relationship, not resource extraction. The plant is asked permission. Harvesting follows protocols of reciprocity. Many practices are sacred and not for public documentation — this archive will not publish ceremonially restricted knowledge.',
    herbCount: 2,
    href: '/traditions/indigenous-north-american',
  },
  {
    id: 'korean',
    name: 'Korean Traditional Medicine',
    region: 'Korea',
    age: '2,000+ years',
    accentColor: '#c49a8a',
    accentDark:  '#896c61',
    keyTexts:
      'Dongui Bogam (Treasured Mirror of Eastern Medicine), Heo Jun, 1613.',
    philosophy:
      'Shares roots with TCM but developed its own distinct materia medica and diagnostic framework. Emphasizes the four constitutional types — sasang medicine.',
    herbCount: 2,
    href: '/traditions/korean',
  },
]
