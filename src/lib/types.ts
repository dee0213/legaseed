// Life stages
export type LifeStage =
  | 'menarche'
  | 'follicular'
  | 'ovulatory'
  | 'luteal'
  | 'menstrual'
  | 'pregnancy-t1'
  | 'pregnancy-t2'
  | 'pregnancy-t3'
  | 'postpartum'
  | 'perimenopause'
  | 'post-menopause'
  | 'male-hormonal'

export interface LifeStageRating {
  stage: LifeStage
  status: 'supported' | 'guidance' | 'contraindicated'
  notes: string
  source: string
}

export interface Source {
  tier: 1 | 2 | 3
  type: 'classical-text' | 'oral-tradition' | 'peer-reviewed' | 'practitioner' | 'book'
  citation: string
  author?: string
  year?: string
  url?: string
}

export interface Combination {
  herbSlugs: string[]
  protocolName: string
  tradition: string
  whatShifts: string
  source: string
  lifeStages: LifeStage[]
}

export interface TraditionLens {
  traditionId: string
  perspective: string
  keyUse: string
}

export interface Preparation {
  method: string  // e.g. 'decoction', 'tincture', 'tea', 'poultice'
  instructions: string
  dosage?: string
  duration?: string
}

export interface Tradition {
  id: string
  name: string
  region: string
  accentColor: string
  philosophy: string
  keyTexts: string[]
}

export interface HerbEntry {
  id: string
  slug: string
  name: string
  botanicalName: string
  alternateNames: string[]
  traditions: Tradition[]
  region: string
  domain: 'apothecary'

  // Five-axis tags
  pharmacologicalActions: string[]
  hormonalPolarity: 'yin' | 'neutral' | 'yang' | 'biphasic'
  lifeStageMap: LifeStageRating[]
  knownCombinations: Combination[]
  traditionLenses: TraditionLens[]

  // Content layers
  plainSummary: string
  practitionerNotes: string

  // Prevention / treatment
  preventionNotes: string
  rootCauseNotes: string
  symptomReliefNotes: string

  // Preparation
  preparations: Preparation[]

  // Safety
  contraindications: string[]
  drugInteractions: string[]
  pregnancyNotes: string

  // Sources
  sources: Source[]
  verificationTier: 'community' | 'verified' | 'endorsed'
  contributedBy: string
  lastUpdated: string

  // Cross-links
  relatedHerbs: string[]
  relatedPractices: string[]

  // Illustration
  illustrationComponent: string
}

export type PracticeDomain =
  | 'body-rituals'
  | 'skin-care'
  | 'hair-care'
  | 'internal-cleansing'
  | 'reproductive-wisdom'
  | 'energetic-spiritual'
  | 'contemplative'
  | 'seasonal'

export interface PracticeEntry extends Omit<HerbEntry, 'domain' | 'botanicalName' | 'hormonalPolarity'> {
  domain: PracticeDomain
  botanicalName?: string
  hormonalPolarity?: HerbEntry['hormonalPolarity']
}
