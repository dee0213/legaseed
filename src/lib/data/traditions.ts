import { Tradition } from '../types'

export const traditions: Tradition[] = [
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    region: 'South Asia',
    accentColor: '#c9a030',
    philosophy: 'Balance of doshas; food and herbs as primary medicine',
    keyTexts: ['Charaka Samhita', 'Sushruta Samhita'],
  },
  {
    id: 'tcm',
    name: 'Traditional Chinese Medicine',
    region: 'East Asia',
    accentColor: '#b5694f',
    philosophy: 'Harmonizing qi, yin, yang, and the five elements',
    keyTexts: ['Shennong Bencao Jing', 'Huangdi Neijing'],
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
    accentColor: '#8b4a2a',
    philosophy: 'Reciprocal relationship with plant nations; ceremony and healing intertwined',
    keyTexts: ['Oral traditions'],
  },
]
