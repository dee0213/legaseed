import { HerbEntry } from '../types'

const makeStub = (
  id: string,
  name: string,
  botanicalName: string,
  region: string,
  pharmacologicalActions: string[],
  hormonalPolarity: HerbEntry['hormonalPolarity'],
  plainSummary: string,
): HerbEntry => ({
  id,
  slug: id,
  name,
  botanicalName,
  alternateNames: [],
  traditions: [],
  region,
  domain: 'apothecary',
  pharmacologicalActions,
  hormonalPolarity,
  lifeStageMap: [],
  knownCombinations: [],
  traditionLenses: [],
  plainSummary,
  practitionerNotes: '',
  preventionNotes: '',
  rootCauseNotes: '',
  symptomReliefNotes: '',
  preparations: [],
  contraindications: [],
  drugInteractions: [],
  pregnancyNotes: '',
  sources: [],
  verificationTier: 'community',
  contributedBy: 'Legaseed Archive',
  lastUpdated: '2025-01',
  relatedHerbs: [],
  relatedPractices: [],
  illustrationComponent: 'PlaceholderHerb',
})

export const herbs: HerbEntry[] = [
  // ── Ashwagandha ─────────────────────────────────────────────────────────────
  {
    id: 'ashwagandha',
    slug: 'ashwagandha',
    name: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    alternateNames: ['Indian Ginseng', 'Ginseng Indio', 'Winter Cherry'],
    traditions: [],
    region: 'South Asia',
    domain: 'apothecary',
    pharmacologicalActions: ['adaptogenic', 'nervine', 'immunomodulatory', 'thyroid-supporting'],
    hormonalPolarity: 'yang',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'A foundational Ayurvedic adaptogen used for over 3,000 years as a rejuvenating tonic for strength, endurance, and stress resilience. Helps the body regulate its response to chronic stress by supporting the adrenal-cortisol axis. Popular in US wellness — which means more research and more need for honest caution, especially around the liver.',
    practitionerNotes:
      'Chronic stress and elevated cortisol — one of its best-studied effects. Sleep quality and insomnia — among its strongest areas of evidence per NCCIH. Mental fatigue and burnout. Mild anxiety with accompanying low mood. Male fertility — may improve testosterone and sperm quality after 2–4 months. Athletic recovery and endurance. Effects build gradually over 4–8 weeks.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'capsule',
        instructions: '300–600 mg of root extract daily, often taken at night due to its mildly sedating effect.',
        dosage: '300–600 mg',
        duration: 'Most clinical studies use 8–12-week courses.',
      },
      {
        method: 'powder',
        instructions: '½–1 teaspoon mixed with warm milk, honey, and ghee — the traditional Ayurvedic "ashwagandha milk" (churna).',
        dosage: '½–1 tsp',
      },
      {
        method: 'tincture',
        instructions: 'Follow product instructions. Alcohol-based tinctures tend to be more bioavailable.',
      },
    ],
    contraindications: [
      'Pregnancy — documented abortifacient properties; avoid entirely',
      'Breastfeeding — insufficient safety data; avoid',
      'Autoimmune conditions (lupus, rheumatoid arthritis, multiple sclerosis, Hashimoto\'s) — stimulates immune activity and may worsen autoimmune flares',
      'Thyroid disorders — raises T3 and T4; people on thyroid medication risk being pushed into hyperthyroid range',
      'Liver disease or history of hepatotoxic drugs — rare but peer-reviewed cases of cholestatic hepatitis documented, typically presenting 2–12 weeks after starting',
      'Upcoming surgery — stop at least 2 weeks before due to sedative effects and anesthesia interaction',
      'Hormone-sensitive prostate cancer — may increase testosterone',
    ],
    drugInteractions: [
      'Sedative medications (benzodiazepines, sleep aids): additive sedative effect',
      'Immunosuppressants: ashwagandha stimulates immune activity and may counteract',
      'Diabetes medications (metformin, insulin): may lower blood sugar further',
      'Blood pressure medications: potential additive effect',
      'Thyroid medications: raises T3 and T4, requires close monitoring',
    ],
    pregnancyNotes:
      'Avoid entirely. Ashwagandha has documented abortifacient properties. Not safe at any dose during pregnancy. Insufficient safety data for breastfeeding — also avoid.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NCCIH: Ashwagandha — Usefulness and Safety',
        url: 'https://www.nccih.nih.gov/health/ashwagandha',
      },
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NIH LiverTox: Ashwagandha — Herb-Induced Liver Injury',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK548536/',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['shatavari', 'rhodiola', 'holy-basil'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Shatavari ────────────────────────────────────────────────────────────────
  makeStub(
    'shatavari',
    'Shatavari',
    'Asparagus racemosus',
    'South Asia',
    ['adaptogenic', 'phytoestrogenic', 'demulcent', 'galactagogue'],
    'yin',
    'The primary Ayurvedic herb for the female reproductive system. Deeply nourishing and cooling, it supports hormonal balance across all life stages.',
  ),

  // ── Turmeric ─────────────────────────────────────────────────────────────────
  {
    id: 'turmeric',
    slug: 'turmeric',
    name: 'Turmeric',
    botanicalName: 'Curcuma longa',
    alternateNames: ['Cúrcuma', 'Golden Root', 'Indian Saffron'],
    traditions: [],
    region: 'South Asia / Southeast Asia',
    domain: 'apothecary',
    pharmacologicalActions: ['anti-inflammatory', 'antioxidant', 'hepatoprotective', 'digestive'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'A golden root with millennia of use across Ayurvedic, Unani, and Southeast Asian traditions. Curcumin, its active compound, is one of the most studied anti-inflammatory substances in herbal medicine. The whole root as food is broadly safe. High-dose isolated curcumin supplements carry real risks the wellness market often downplays.',
    practitionerNotes:
      'Best-supported use: osteoarthritis and joint pain. Emerging evidence for non-alcoholic fatty liver disease (NAFLD). General anti-inflammatory support as a food spice. Pair with black pepper (increases curcumin absorption up to 20x) and fat (curcumin is fat-soluble).',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'food',
        instructions: 'Cook generously in curries, rice dishes, soups, egg scrambles, and marinades. Always pair with black pepper and a fat source.',
      },
      {
        method: 'tea',
        instructions: 'Simmer 1 inch of fresh grated turmeric root with ginger in water for 10 minutes. Strain, add honey and citrus.',
      },
      {
        method: 'powder',
        instructions: 'Golden milk (leche dorada): ½ tsp turmeric, pinch of black pepper, ¼ tsp cinnamon, ¼ tsp ginger with warm plant milk and honey.',
        dosage: '½ tsp in food or drinks daily',
      },
      {
        method: 'capsule',
        instructions: 'If using curcumin capsules therapeutically, consult a provider first. Standard doses in studies: 500–2,000 mg/day.',
        dosage: '500–2,000 mg (consult provider)',
      },
    ],
    contraindications: [
      'Gallstones or bile duct obstruction — stimulates bile production and can aggravate these conditions',
      'Estrogen-sensitive cancers at supplement doses — curcumin may influence estrogen pathways',
      'High-dose supplements during pregnancy — may stimulate uterine contractions; culinary amounts are safe',
      'Liver disease history with enhanced-bioavailability formulations (piperine-added) — documented hepatotoxicity in peer-reviewed case series',
    ],
    drugInteractions: [
      'Blood thinners (warfarin, aspirin, clopidogrel): inhibits platelet aggregation at supplement doses',
      'Diabetes medications (metformin, insulin): additive glucose-lowering effect causing hypoglycemia',
      'Chemotherapy agents, tamoxifen, sulfasalazine, tacrolimus, losartan, amlodipine: consult oncologist or prescribing doctor',
    ],
    pregnancyNotes:
      'Culinary turmeric is considered safe during pregnancy. High-dose curcumin supplements should be avoided — may stimulate uterine contractions and alter estrogen levels.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NCCIH: Turmeric — Usefulness and Safety',
        url: 'https://www.nccih.nih.gov/health/turmeric',
      },
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'PubMed: Drug-Induced Liver Injury Secondary to Turmeric Supplement',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12633785/',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['ginger', 'black-seed'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Astragalus ───────────────────────────────────────────────────────────────
  makeStub(
    'astragalus',
    'Astragalus',
    'Astragalus membranaceus',
    'East Asia',
    ['adaptogenic', 'immunomodulatory', 'tonic', 'antioxidant'],
    'yang',
    'A core tonic in Traditional Chinese Medicine, used to tonify the wei qi (protective energy) and build deep immunity. Considered superior to echinacea for long-term immune support.',
  ),

  // ── Elderberry ───────────────────────────────────────────────────────────────
  makeStub(
    'elderberry',
    'Elderberry',
    'Sambucus nigra',
    'Europe / North America',
    ['antiviral', 'immunostimulant', 'anti-inflammatory', 'antioxidant'],
    'neutral',
    'Dark purple berries with centuries of use in European folk medicine for colds, flu, and respiratory illness. One of the few herbs with clinical trials supporting its efficacy.',
  ),

  // ── Nettle ───────────────────────────────────────────────────────────────────
  {
    id: 'nettle',
    slug: 'nettle',
    name: 'Nettle',
    botanicalName: 'Urtica dioica',
    alternateNames: ['Stinging Nettle', 'Ortiga', 'Ortigão'],
    traditions: [],
    region: 'Europe / North America / Asia',
    domain: 'apothecary',
    pharmacologicalActions: ['nutritive', 'anti-inflammatory', 'diuretic', 'anti-allergenic'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'A nutritional powerhouse rich in iron, calcium, magnesium, potassium, vitamins A, C, and K, and a solid plant-based protein source. Despite its sting when fresh, once cooked or dried it becomes one of the most nourishing herbs available. Used in European folk medicine and increasingly reclaimed in Latin American herbalism for anemia, allergies, and urinary health.',
    practitionerNotes:
      'Iron-deficiency anemia — exceptional plant-based iron, best absorbed with vitamin C. Seasonal allergies — freeze-dried preparations have clinical support. BPH — combination with saw palmetto shows evidence for reducing nighttime urination. Urinary tract support — mild diuretic. Arthritis and inflammatory joint pain. General nutritional tonic for mineral deficiencies.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'tea',
        instructions: 'Steep 1–2 teaspoons of dried leaf in hot water for 10 minutes. For deeper mineral extraction, steep covered for 4–8 hours.',
        dosage: '1–3 cups daily',
      },
      {
        method: 'food',
        instructions: 'Blanch or steam fresh young leaves (use gloves when handling fresh) and use like spinach — in soups, tortillas, rice. Cooking destroys the sting completely.',
      },
      {
        method: 'capsule',
        instructions: 'Freeze-dried capsules for allergy support or BPH. Freeze-drying preserves anti-inflammatory compounds.',
        dosage: '300–600 mg',
      },
    ],
    contraindications: [
      'Blood pressure and diuretic medications: additive effects',
      'People with kidney disease: diuretic effect may stress kidneys further — consult a provider',
    ],
    drugInteractions: [
      'Blood thinners (warfarin): nettle contains vitamin K, which may reduce warfarin\'s effectiveness',
      'Diabetes medications: may lower blood sugar, increasing hypoglycemia risk',
      'Lithium: diuretic effect may reduce lithium excretion and raise blood levels to unsafe concentrations',
      'Blood pressure medications and diuretics: additive effect',
    ],
    pregnancyNotes:
      'Historically used to stimulate uterine contractions in high medicinal doses — avoid medicinal amounts in the first trimester. A nutritive tea in the second and third trimester is sometimes used by midwives as a mineral tonic, but discuss with your provider before use. Do not use independently at high doses.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'Memorial Sloan Kettering Cancer Center: Nettle',
        url: 'https://www.mskcc.org/cancer-care/integrative-medicine/herbs/nettle',
      },
      {
        tier: 2,
        type: 'peer-reviewed',
        citation: 'Healthline: Nettle Tea in Pregnancy — Safety, Benefits, Risks',
        url: 'https://www.healthline.com/health/pregnancy/nettle-tea-pregnancy',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['dandelion', 'raspberry-leaf'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Vitex ────────────────────────────────────────────────────────────────────
  makeStub(
    'vitex',
    'Vitex',
    'Vitex agnus-castus',
    'Mediterranean / West Asia',
    ['dopaminergic', 'progesterogenic', 'emmenagogue'],
    'biphasic',
    'Also called Chaste Tree or Chasteberry. Acts on the pituitary-hypothalamic axis to regulate progesterone. Used for PMS, PCOS, and luteal phase defects. Requires consistent, long-term use.',
  ),

  // ── Dong Quai ────────────────────────────────────────────────────────────────
  makeStub(
    'dong-quai',
    'Dong Quai',
    'Angelica sinensis',
    'East Asia',
    ['emmenagogue', 'blood-tonic', 'antispasmodic', 'phytoestrogenic'],
    'yin',
    'Called the "female ginseng" in TCM, Dong Quai nourishes and moves blood, making it foundational for menstrual irregularity, anemia, and menopausal symptoms. Always used in formulas, rarely alone.',
  ),

  // ── Reishi ───────────────────────────────────────────────────────────────────
  makeStub(
    'reishi',
    'Reishi',
    'Ganoderma lucidum',
    'East Asia',
    ['adaptogenic', 'immunomodulatory', 'nervine', 'hepatoprotective'],
    'yin',
    'The "mushroom of immortality" in Taoist medicine. Deeply calming to the shen (spirit/mind) while building immune resilience. Used for stress, insomnia, and long-term vitality.',
  ),

  // ── Moringa ──────────────────────────────────────────────────────────────────
  {
    id: 'moringa',
    slug: 'moringa',
    name: 'Moringa',
    botanicalName: 'Moringa oleifera',
    alternateNames: ['Árbol de la Vida', 'Miracle Tree', 'Drumstick Tree'],
    traditions: [],
    region: 'South Asia / Africa',
    domain: 'apothecary',
    pharmacologicalActions: ['nutritive', 'anti-inflammatory', 'antioxidant', 'galactagogue'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'Called the "miracle tree," moringa leaves contain more iron than spinach, more calcium than milk, and complete protein. A staple of African and South Asian nutritional medicine, and increasingly used in Latin American wellness communities. Only the leaves are used therapeutically — the root, bark, and flowers carry different and potentially unsafe compounds.',
    practitionerNotes:
      'Iron-deficiency anemia — exceptional plant-based iron content. Nursing mothers — systematic reviews support increased milk volume and prolactin. Nutritional gaps for plant-based diets. Blood sugar support — some evidence for antidiabetic activity. Postpartum recovery and fatigue. Always buy certified organic — mass-produced moringa has been found to contain heavy metals.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'powder',
        instructions: 'Add 1–2 teaspoons of moringa leaf powder to smoothies, soups, rice, or eggs. The flavor is grassy and mild.',
        dosage: '1–2 tsp daily',
      },
      {
        method: 'tea',
        instructions: 'Steep dried moringa leaves in hot water for 5 minutes. Add honey and lemon.',
      },
      {
        method: 'capsule',
        instructions: 'Leaf powder capsules as a nutritional supplement.',
        dosage: '400–800 mg daily',
      },
      {
        method: 'food',
        instructions: 'Fresh moringa leaves can be added to dals, stews, and stir-fries like any leafy green.',
      },
    ],
    contraindications: [
      'Moringa root, bark, or flowers — these parts contain compounds historically used to induce miscarriage; only the leaves are used during pregnancy',
      'Non-organic sourcing — risk of heavy metal and pesticide contamination',
      'Hypothyroidism on levothyroxine — some animal data suggests possible thyroid hormone interaction; discuss with your doctor',
    ],
    drugInteractions: [
      'Diabetes medications: may inhibit or compound glucose-lowering effects — monitor blood sugar closely',
      'Medications processed by CYP3A4 enzyme system — some antibiotics, antiretrovirals, statins, benzodiazepines, anticonvulsants; large doses may interfere',
      'Levothyroxine: possible thyroid interaction (animal data)',
    ],
    pregnancyNotes:
      'Only the leaves are considered safe during pregnancy, and ideally only in the second and third trimesters. The root, bark, and flowers must be avoided entirely — they contain spirochin and other compounds historically used to induce miscarriage.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NIH LiverTox: Moringa',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK605172/',
      },
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'PubMed: Moringa oleifera — Comprehensive Pharmacological Review',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9916933/',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['nettle', 'raspberry-leaf'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Holy Basil ───────────────────────────────────────────────────────────────
  makeStub(
    'holy-basil',
    'Holy Basil (Tulsi)',
    'Ocimum tenuiflorum',
    'South Asia',
    ['adaptogenic', 'nervine', 'antimicrobial', 'immunomodulatory'],
    'neutral',
    'Sacred in Hindu tradition and central to Ayurvedic medicine, Tulsi is the quintessential daily adaptogen. Uplifting and grounding, it clears mental fog while calming stress.',
  ),

  // ── Black Seed ───────────────────────────────────────────────────────────────
  makeStub(
    'black-seed',
    'Black Seed',
    'Nigella sativa',
    'Middle East / North Africa',
    ['anti-inflammatory', 'immunomodulatory', 'antimicrobial', 'antioxidant'],
    'neutral',
    'Known in Islamic medicine as a cure for everything except death. Thymoquinone, its active compound, is an emerging area of clinical research for inflammation, metabolic health, and immunity.',
  ),

  // ── Ginger ───────────────────────────────────────────────────────────────────
  {
    id: 'ginger',
    slug: 'ginger',
    name: 'Ginger',
    botanicalName: 'Zingiber officinale',
    alternateNames: ['Jengibre', 'Kion', 'Adrak'],
    traditions: [],
    region: 'Tropical Asia',
    domain: 'apothecary',
    pharmacologicalActions: ['anti-inflammatory', 'carminative', 'antiemetic', 'circulatory-stimulant'],
    hormonalPolarity: 'yang',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'One of the most universally used medicinal foods across cultures — warming and moving. Ginger relieves nausea, stimulates digestion, and reduces inflammation. Its active compounds (gingerols and shogaols) are among the most studied in herbal medicine. In the Caribbean and Latin American kitchen, it is food and medicine at once.',
    practitionerNotes:
      'Nausea from pregnancy (morning sickness) — best-studied antiemetic herb, considered safe at culinary doses. Menstrual cramps — studies show effect comparable to ibuprofen at 250 mg 4x daily. Indigestion, bloating, sluggish digestion. Cold and flu support — warming and diaphoretic. Joint stiffness and osteoarthritis.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'tea',
        instructions: 'Slice or grate 1–2 inches of fresh ginger root, steep in boiling water for 10 minutes with honey and lime.',
      },
      {
        method: 'food',
        instructions: 'Use generously in cooking — stir-fries, rice, marinades, broths. Culinary amounts are safe for most people.',
      },
      {
        method: 'powder',
        instructions: 'Add ¼–½ teaspoon of dried ginger powder to oatmeal, smoothies, soups, or golden milk.',
        dosage: '¼–½ tsp',
      },
      {
        method: 'capsule',
        instructions: 'Standardized extract for medicinal use — consult a provider for ongoing use.',
        dosage: '250–500 mg, 2–3 times daily',
      },
    ],
    contraindications: [
      'Gallstones or gallbladder disease — stimulates bile flow and can aggravate symptoms',
      'High-dose supplements above 4g/day with blood thinners — culinary amounts are generally fine',
      'Pre-surgery: stop medicinal-dose ginger at least 2 weeks before due to blood-thinning effects',
    ],
    drugInteractions: [
      'Blood thinners (warfarin, aspirin, clopidogrel): inhibits platelet aggregation at high doses',
      'Diabetes medications (metformin, insulin): may lower blood sugar further',
      'Blood pressure medications: potential additive effect at high doses',
    ],
    pregnancyNotes:
      'Culinary amounts and pregnancy-nausea doses under 1g/day are considered safe by most guidelines, including the American College of Obstetricians and Gynecologists. High medicinal doses in late pregnancy carry some evidence of increased bleeding risk — stay within culinary and standard nausea-relief doses.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NCCIH: Ginger — Usefulness and Safety',
        url: 'https://www.nccih.nih.gov/health/ginger',
      },
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'PubMed: Ginger Root — StatPearls',
        url: 'https://www.ncbi.nlm.nih.gov/sites/books/NBK565886/',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['turmeric', 'chamomile'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Rhodiola ─────────────────────────────────────────────────────────────────
  makeStub(
    'rhodiola',
    'Rhodiola',
    'Rhodiola rosea',
    'Arctic / Northern Europe / Central Asia',
    ['adaptogenic', 'nervine', 'cognitive-enhancing', 'antifatigue'],
    'yang',
    'A cold-climate adaptogen used by Vikings and Siberian healers. Rhodiola is specific for mental fatigue, burnout, and stress-induced exhaustion. Acts faster than most adaptogens.',
  ),

  // ── Maca ─────────────────────────────────────────────────────────────────────
  makeStub(
    'maca',
    'Maca',
    'Lepidium meyenii',
    'Andes / Peru',
    ['adaptogenic', 'nutritive', 'libido-enhancing', 'endocrine-supporting'],
    'biphasic',
    'A Peruvian root food used by Andean people for centuries to support fertility, endurance, and hormonal balance. Neither estrogenic nor androgenic — works by supporting the endocrine axis itself.',
  ),

  // ── Raspberry Leaf ───────────────────────────────────────────────────────────
  makeStub(
    'raspberry-leaf',
    'Raspberry Leaf',
    'Rubus idaeus',
    'Europe / North America',
    ['uterine-tonic', 'astringent', 'nutritive', 'emmenagogue'],
    'yin',
    'The most commonly used uterine tonic in Western herbalism. Rich in fragarine, a compound that tones and relaxes the uterine muscles. Used throughout pregnancy (with guidance) and for menstrual cramps.',
  ),

  // ── Dandelion ────────────────────────────────────────────────────────────────
  makeStub(
    'dandelion',
    'Dandelion',
    'Taraxacum officinale',
    'Europe / North America / Asia',
    ['hepatic', 'diuretic', 'nutritive', 'digestive-bitter'],
    'neutral',
    'Every part of the dandelion is medicine. The root supports liver detoxification; the leaf is a potassium-rich diuretic; the flower lifts the spirit. A weed only to those who have forgotten.',
  ),

  // ── Chamomile ────────────────────────────────────────────────────────────────
  {
    id: 'chamomile',
    slug: 'chamomile',
    name: 'Chamomile',
    botanicalName: 'Matricaria chamomilla',
    alternateNames: ['Manzanilla', 'German Chamomile', 'Camomilla'],
    traditions: [],
    region: 'Europe / West Asia / Latin America',
    domain: 'apothecary',
    pharmacologicalActions: ['nervine', 'antispasmodic', 'anti-inflammatory', 'carminative'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'One of the oldest medicinal herbs on record, used in ancient Egypt, Greece, Rome, and across Latin America as a first-reach remedy. The small white daisy flowers carry apigenin, a compound with gentle calming effects on the nervous system and gut. In Mexican and Caribbean households, a cup of manzanilla after meals is tradition as much as medicine.',
    practitionerNotes:
      'Digestive upset, gas, and bloating after meals. Mild anxiety and nervous tension. Trouble falling asleep. Mouth irritation and minor gum inflammation. Skin irritation, eczema, and minor wounds (topical). Gentle enough for children when allergies are ruled out.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'tea',
        instructions: 'Steep 1–2 teaspoons of dried flowers in hot (not boiling) water for 5–10 minutes, covered. Drink after meals for digestion or before bed for sleep.',
      },
      {
        method: 'compress',
        instructions: 'Brew a strong tea, let cool, soak a cloth, and apply to irritated skin, minor wounds, or tired eyes.',
      },
      {
        method: 'bath',
        instructions: 'Add a strong brew or a handful of dried flowers to a warm bath for skin soothing and nervous system unwinding.',
      },
      {
        method: 'tincture',
        instructions: 'Can be used as a mouthwash: brew and cool, swish in the mouth for gum irritation or mouth sores.',
      },
    ],
    contraindications: [
      'Allergy to ragweed, daisies, chrysanthemums, or marigolds — high cross-reactivity risk',
      'People on medications metabolized by liver enzymes (CYP450 system): potential interaction with drug clearance',
    ],
    drugInteractions: [
      'Blood thinners (warfarin): mild anticoagulant properties may increase bleeding risk',
      'Sedative medications (benzodiazepines, sleep aids): additive sedative effect',
      'Hormonal contraceptives or estrogen-sensitive cancer medications: mild estrogenic activity',
    ],
    pregnancyNotes:
      'Avoid regular use during pregnancy, especially in the second and third trimester. A 2009 clinical case series in Ultrasound in Obstetrics & Gynecology documented premature fetal ductus arteriosus constriction linked to regular chamomile tea consumption — the proposed mechanism is prostaglandin inhibition similar to NSAIDs. Occasional use is likely low risk, but regular therapeutic use should be avoided.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NCCIH: Chamomile — Usefulness and Safety',
        url: 'https://www.nccih.nih.gov/health/chamomile',
      },
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'PubMed: Chamomile — Traditional Uses, Phytochemistry, and Pharmacology',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9032859/',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['linden', 'lavender'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Echinacea ────────────────────────────────────────────────────────────────
  makeStub(
    'echinacea',
    'Echinacea',
    'Echinacea purpurea / angustifolia',
    'North America',
    ['immunostimulant', 'antimicrobial', 'anti-inflammatory', 'wound-healing'],
    'neutral',
    'A Native American remedy adopted by Eclectic physicians in the 1800s and now one of the most widely used herbs globally. Best used at the first sign of illness, not as a long-term daily herb.',
  ),

  // ── Milk Thistle ─────────────────────────────────────────────────────────────
  makeStub(
    'milk-thistle',
    'Milk Thistle',
    'Silybum marianum',
    'Mediterranean / Europe',
    ['hepatoprotective', 'antioxidant', 'anti-inflammatory', 'cholagogue'],
    'neutral',
    'The premier liver herb in Western herbalism. Silymarin, its active compound, has the rare ability to regenerate liver cells. Used for liver disease, medication side effects, and as a detox support.',
  ),

  // ── Rosemary ─────────────────────────────────────────────────────────────────
  {
    id: 'rosemary',
    slug: 'rosemary',
    name: 'Rosemary',
    botanicalName: 'Salvia rosmarinus',
    alternateNames: ['Romero', 'Rosmarin'],
    traditions: [],
    region: 'Mediterranean / Latin America',
    domain: 'apothecary',
    pharmacologicalActions: ['circulatory-stimulant', 'carminative', 'nervine', 'antimicrobial'],
    hormonalPolarity: 'yang',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'One of the most beloved herbs in European and Latin American traditional medicine, used long before it became a kitchen staple. In curandera traditions across Mexico and the Caribbean, romero is used in limpias (spiritual cleansings), teas for digestion and memory, and as a circulatory stimulant. Introduced to the Americas by Spanish colonizers, it grafted into indigenous healing practices and never left.',
    practitionerNotes:
      'Digestive discomfort, bloating, and dyspepsia — approved for this use by the German Commission E. Memory and cognitive focus (emerging evidence from aromatherapy and tea). Scalp health and hair thinning — clinical studies show topical rosemary oil comparable to minoxidil. Warming for cold hands and feet. Muscle and joint pain (topical) — approved for rheumatic complaints by the German Commission E.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'tea',
        instructions: 'Steep 1 teaspoon of fresh or dried leaves in hot water for 10 minutes. Drink after meals for digestion or in the morning for mental clarity.',
      },
      {
        method: 'topical',
        instructions: 'Infuse rosemary in olive oil for 4–6 weeks, or use diluted essential oil (2–3 drops per tablespoon of carrier oil) for scalp massage to support hair growth.',
      },
      {
        method: 'food',
        instructions: 'Use generously in cooking — roasted vegetables, beans, meats. Safe in food amounts for all adults.',
      },
      {
        method: 'tincture',
        instructions: 'Bundle fresh rosemary with other herbs (ruda, albahaca) for traditional limpias and energetic cleansing.',
      },
    ],
    contraindications: [
      'Epilepsy or seizure disorders — camphor content, especially in the essential oil, can trigger or worsen seizures; avoid the essential oil entirely',
      'Allergy to aspirin — rosemary contains salicylates and may cause similar reactions',
    ],
    drugInteractions: [
      'Blood thinners (warfarin, aspirin): may inhibit blood clotting at high doses',
      'Blood pressure medications and diuretics: potential interaction with both',
    ],
    pregnancyNotes:
      'Avoid medicinal doses during pregnancy. Rosemary in large amounts has historically been used as an emmenagogue (promotes menstruation) and can stimulate the uterus. Cooking with rosemary in normal food amounts is considered safe.',
    sources: [
      {
        tier: 2,
        type: 'practitioner',
        citation: 'Drugs.com: Rosemary — Uses, Benefits & Dosage',
        url: 'https://www.drugs.com/npp/rosemary.html',
      },
      {
        tier: 2,
        type: 'practitioner',
        citation: 'Gaia Herbs: Traditional Mexican Medicine & Herbalism (Curanderismo)',
        url: 'https://www.gaiaherbs.com/blogs/seeds-of-knowledge/curanderismo-traditional-mexican-medicine-herbs',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['chamomile', 'lavender'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Ceylon Cinnamon ──────────────────────────────────────────────────────────
  {
    id: 'ceylon-cinnamon',
    slug: 'ceylon-cinnamon',
    name: 'Ceylon Cinnamon',
    botanicalName: 'Cinnamomum verum',
    alternateNames: ['Canela de Ceylán', 'True Cinnamon', 'Canela'],
    traditions: [],
    region: 'Sri Lanka / Mexico / Caribbean',
    domain: 'apothecary',
    pharmacologicalActions: ['anti-inflammatory', 'hypoglycemic', 'carminative', 'warming'],
    hormonalPolarity: 'yang',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'Not all cinnamon is the same. Ceylon cinnamon (true cinnamon) is lighter in color, more delicate in flavor, and critically lower in coumarin than the cassia variety sold in most US grocery stores. This distinction matters for anyone using it therapeutically — high coumarin intake over time can stress the liver. Ceylon is the cinnamon most used in Mexican and Caribbean cooking and is the one worth seeking out.',
    practitionerNotes:
      'Blood sugar regulation and insulin sensitivity — studies support reduced fasting blood glucose in type 2 diabetes. Digestive warmth — bloating and post-meal heaviness. Mild anti-inflammatory support. Warming the body during cold or flu, combined with ginger. Identifying Ceylon: look for thin, layered multi-layer sticks vs. cassia\'s thick hollow single-layer tube.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'tea',
        instructions: 'Simmer one Ceylon cinnamon stick in 2 cups of water for 10–15 minutes. Add piloncillo or honey and a squeeze of orange.',
      },
      {
        method: 'food',
        instructions: 'Add ¼–½ teaspoon to oatmeal, atole, café de olla, smoothies, or yogurt daily.',
        dosage: '¼–½ tsp daily',
      },
      {
        method: 'powder',
        instructions: 'Golden milk: combine Ceylon cinnamon with turmeric, ginger, and warm plant milk for an anti-inflammatory evening drink.',
      },
      {
        method: 'capsule',
        instructions: 'For blood sugar support — consult a provider before supplementing.',
        dosage: '250–500 mg Ceylon extract',
      },
    ],
    contraindications: [
      'Cassia cinnamon (not Ceylon) in high daily doses — one teaspoon of cassia can exceed European safety thresholds for coumarin and stress the liver; verify you are buying Ceylon before therapeutic use',
    ],
    drugInteractions: [
      'Diabetes medications (metformin, insulin, glipizide): cinnamon lowers blood sugar — combining may cause hypoglycemia; monitor closely',
      'Blood thinners (warfarin): potential additive anticoagulant effect at higher doses',
    ],
    pregnancyNotes:
      'Culinary amounts are considered safe. Large supplemental doses of medicinal Ceylon cinnamon during pregnancy may be unsafe per NCCIH — avoid supplemental doses and stick to food amounts.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NCCIH: Cinnamon — Usefulness and Safety',
        url: 'https://www.nccih.nih.gov/health/cinnamon',
      },
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'PubMed: Medicinal Properties of True Cinnamon — Systematic Review',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3854496/',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['ginger', 'turmeric'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Calendula ────────────────────────────────────────────────────────────────
  {
    id: 'calendula',
    slug: 'calendula',
    name: 'Calendula',
    botanicalName: 'Calendula officinalis',
    alternateNames: ['Maravilla', 'Pot Marigold', 'Flor de Muerto'],
    traditions: [],
    region: 'Mediterranean / Europe / Latin America',
    domain: 'apothecary',
    pharmacologicalActions: ['vulnerary', 'anti-inflammatory', 'antimicrobial', 'antispasmodic'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'One of the most versatile and gentle wound-healing herbs in herbalism. Its bright orange petals carry anti-inflammatory, antimicrobial, and vulnerary (wound-closing) compounds. A staple in Ayurvedic, Unani, and European folk medicine, and in many Latin American households it is the first thing reached for a rash, burn, or skin irritation.',
    practitionerNotes:
      'Minor skin wounds, cuts, scrapes, and burns. Rashes, eczema, and dry or irritated skin. Nipple soreness during breastfeeding (topical). Diaper rash — gentle enough for babies when no allergy is present. Sore throat (tea or gargle). Mild digestive inflammation (internal tea). Topical use is its most supported and safest application.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'topical',
        instructions: 'Apply calendula-infused salve or cream to rashes, minor burns, dry skin, nipple soreness, or small wounds.',
      },
      {
        method: 'topical',
        instructions: 'Infused oil: cover dried petals with olive oil in a jar, let sit in a warm place for 4–6 weeks, strain. Use as a body oil or salve base.',
      },
      {
        method: 'tea',
        instructions: 'Steep 1–2 teaspoons of dried petals in hot water for 10 minutes for sore throats or mild digestive upset.',
      },
      {
        method: 'compress',
        instructions: 'Brew a strong tea, cool, and apply as a compress to inflamed or irritated skin.',
      },
    ],
    contraindications: [
      'Allergy to the daisy family (ragweed, chamomile, arnica, echinacea, chrysanthemums) — high cross-reactivity risk',
      'People trying to conceive — medicinal internal doses may interfere with conception',
    ],
    drugInteractions: [
      'Sedative medications: theoretical additive sedative effect',
      'Blood thinners: mild anticoagulant properties — stop before surgery',
    ],
    pregnancyNotes:
      'Avoid internal use entirely during pregnancy. Oral calendula may stimulate uterine contractions and has historically been used as an emmenagogue. Topical use in small areas is considered lower risk but discuss with your provider before any use during pregnancy.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'PubMed: Updated Review on the Therapeutic Potential of Calendula officinalis',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10142266/',
      },
      {
        tier: 2,
        type: 'peer-reviewed',
        citation: 'WebMD: Calendula — Uses, Side Effects, Precautions',
        url: 'https://www.webmd.com/vitamins-supplements/calendula',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['chamomile', 'nettle'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Mint / Yerba Buena ───────────────────────────────────────────────────────
  {
    id: 'mint',
    slug: 'mint',
    name: 'Mint',
    botanicalName: 'Mentha × piperita / Mentha spicata',
    alternateNames: ['Yerba Buena', 'Menta', 'Hierbabuena', 'Peppermint', 'Spearmint'],
    traditions: [],
    region: 'Latin America / Europe / North America',
    domain: 'apothecary',
    pharmacologicalActions: ['carminative', 'antispasmodic', 'anti-inflammatory', 'analgesic'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      '"Yerba buena" (literally "good herb") is one of the most universally beloved plants in Latin American folk medicine, used across generations and borders as a cooling digestive remedy and household cure. The term covers several mint species — spearmint in Latin American traditions, peppermint in more formalized herbal use. All share the characteristic menthol cooling and digestive affinity.',
    practitionerNotes:
      'Digestive upset, bloating, gas, and indigestion — one of the best-supported herbal uses. IBS — peppermint enteric-coated capsules have consistent clinical evidence. Nausea from chemotherapy, motion sickness, or general queasiness. Tension headaches (topical peppermint oil on temples). Mental clarity and alertness (aromatherapy). Mild cold symptoms — cooling and decongestant.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'tea',
        instructions: 'Steep a handful of fresh leaves (or 1–2 teaspoons dried) in hot water for 5–7 minutes. Drink after meals for digestion.',
      },
      {
        method: 'capsule',
        instructions: 'Enteric-coated peppermint oil capsules for IBS symptoms — enteric coating prevents heartburn.',
        dosage: 'Per product instructions',
      },
      {
        method: 'topical',
        instructions: 'Diluted peppermint oil (2–3 drops per tablespoon of carrier oil) applied to temples and forehead for tension headaches.',
      },
      {
        method: 'food',
        instructions: 'Add fresh mint to agua frescas, fruit salads, salsas, and chilled drinks — the most accessible daily use.',
      },
    ],
    contraindications: [
      'GERD (acid reflux) — peppermint relaxes the lower esophageal sphincter and will worsen heartburn',
      'Gallbladder problems or bile duct obstruction — mint stimulates bile flow and may aggravate',
      'Peppermint oil applied undiluted to skin — can cause burns and irritation',
    ],
    drugInteractions: [
      'Enteric-coated peppermint capsules with certain antibiotics and antifungals: potential interactions',
      'Anti-seizure drugs: potential interaction with peppermint oil capsules',
    ],
    pregnancyNotes:
      'Fresh leaf tea in reasonable amounts is generally considered safe during pregnancy. Very high amounts of spearmint may have uterine effects — avoid medicinal-dose concentrates. Never apply peppermint essential oil to or near the face of infants or young children — menthol can cause breathing difficulties.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NCCIH: Peppermint Oil — Usefulness and Safety',
        url: 'https://www.nccih.nih.gov/health/peppermint-oil',
      },
      {
        tier: 2,
        type: 'practitioner',
        citation: 'Drugs.com: Peppermint — Uses, Benefits & Side Effects',
        url: 'https://www.drugs.com/npp/peppermint.html',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['chamomile', 'ginger'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Linden Flower / Tilo ─────────────────────────────────────────────────────
  {
    id: 'linden',
    slug: 'linden',
    name: 'Linden Flower',
    botanicalName: 'Tilia species',
    alternateNames: ['Tilo', 'Lime Flower', 'Tilleul'],
    traditions: [],
    region: 'Europe / Latin America',
    domain: 'apothecary',
    pharmacologicalActions: ['nervine', 'diaphoretic', 'antispasmodic', 'mild-sedative'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'Known as tilo in Spanish, linden is perhaps best known as the tea your grandmother gave you when you could not sleep or when nerves ran high. The dried flowers brew into a pale, honey-scented infusion with mild sedative and diaphoretic properties. Used throughout Europe and Latin America for anxiety, insomnia, fevers, and headaches across generations.',
    practitionerNotes:
      'Mild anxiety and nervous tension. Insomnia and restless sleep. Feverish colds and flu — promotes sweating and mild temperature reduction. Tension headaches. Stress-related digestive upset. A very gentle calming herb suitable for children and elderly. Use in moderation — 2–3 cups per week; not intended for daily long-term consumption.',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'tea',
        instructions: 'Steep 1–2 teaspoons of dried linden flowers in hot water for 10–15 minutes, covered (covering preserves the volatile compounds). Drink warm before bed or during a cold.',
        duration: '2–3 cups per week maximum for ongoing use',
      },
      {
        method: 'tea',
        instructions: 'Blended: pairs beautifully with chamomile, passionflower, or rose for a deeper relaxing blend.',
      },
      {
        method: 'tincture',
        instructions: 'Follow product instructions — typically 2–4 ml in water, up to 3 times daily.',
        dosage: '2–4 ml',
      },
    ],
    contraindications: [
      'Heart disease or cardiac conditions — very frequent long-term use has been associated with cardiac stress in rare cases; people with existing heart conditions should use sparingly and consult their provider',
      'Known linden pollen allergy — a common seasonal allergen in Europe and South America',
    ],
    drugInteractions: [
      'Lithium — mild diuretic effect may raise lithium levels to unsafe concentrations; consult prescribing doctor',
      'Sedative medications (benzodiazepines, sleep aids, alcohol): additive sedative effect',
    ],
    pregnancyNotes:
      'Insufficient safety data during pregnancy and breastfeeding. Use minimally or avoid. Occasional very light use is likely low risk but there is no established safety threshold.',
    sources: [
      {
        tier: 2,
        type: 'peer-reviewed',
        citation: 'WebMD: Linden — Uses, Side Effects, Interactions',
        url: 'https://www.webmd.com/vitamins/ai/ingredientmono-550/linden',
      },
      {
        tier: 2,
        type: 'practitioner',
        citation: 'Traditional Medicinals: Linden Herb Library',
        url: 'https://www.traditionalmedicinals.com/blogs/herb-library/linden',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['chamomile', 'lavender'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },

  // ── Lavender ─────────────────────────────────────────────────────────────────
  {
    id: 'lavender',
    slug: 'lavender',
    name: 'Lavender',
    botanicalName: 'Lavandula angustifolia',
    alternateNames: ['Lavanda', 'Espliego', 'True Lavender'],
    traditions: [],
    region: 'Mediterranean / Europe / Latin America',
    domain: 'apothecary',
    pharmacologicalActions: ['nervine', 'anxiolytic', 'antispasmodic', 'antimicrobial'],
    hormonalPolarity: 'neutral',
    lifeStageMap: [],
    knownCombinations: [],
    traditionLenses: [],
    plainSummary:
      'One of the most globally recognized aromatic herbs, used across Mediterranean, Middle Eastern, and increasingly Latin American wellness traditions. Modern research has given lavender the credibility it deserves — oral lavender oil preparations have shown meaningful results for anxiety in clinical trials. But its beauty is also in its accessibility: the simplest aromatherapy is a sprig on the pillow.',
    practitionerNotes:
      'Mild to moderate anxiety — one of the better-studied herbal options, particularly oral preparations. Insomnia and restless sleep. Tension headaches (topical diluted essential oil). Skin irritation and minor wound healing (topical, diluted). Perimenopause symptoms including sleep disruption and mood shifts (preliminary evidence).',
    preventionNotes: '',
    rootCauseNotes: '',
    symptomReliefNotes: '',
    preparations: [
      {
        method: 'topical',
        instructions: 'Aromatherapy: add 3–5 drops of essential oil to a diffuser, or place a few drops on a pillow or sleep mask.',
      },
      {
        method: 'tea',
        instructions: 'Steep 1 teaspoon of dried lavender flowers in hot water for 5 minutes. Very light and floral — pair with chamomile or lemon balm.',
      },
      {
        method: 'capsule',
        instructions: 'Silexan (oral lavender oil, 80 mg/day) has the most clinical evidence for anxiety. This is a pharmaceutical product — not general lavender oil.',
        dosage: '80 mg/day (Silexan)',
      },
      {
        method: 'topical',
        instructions: 'Dilute in a carrier oil (2–3 drops per tablespoon) and apply to temples, wrists, or neck for anxiety or headaches. Add to bath water.',
      },
    ],
    contraindications: [
      'Undiluted lavender essential oil directly on skin — can cause burns and allergic reactions; always dilute in a carrier oil',
      'Lavender essential oil taken orally (non-formulated) — essential oils are not safe to ingest as a general practice',
    ],
    drugInteractions: [
      'Sedative medications (benzodiazepines, sleep aids, anticonvulsants): additive sedative effect; flag before surgery',
      'Blood-thinning medications: theoretical increased bleeding risk',
    ],
    pregnancyNotes:
      'Insufficient safety data for regular medicinal use during pregnancy or breastfeeding. Occasional aromatherapy at low concentrations is generally considered lower risk. Avoid internal medicinal doses entirely.',
    sources: [
      {
        tier: 1,
        type: 'peer-reviewed',
        citation: 'NCCIH: Lavender — Usefulness and Safety',
        url: 'https://www.nccih.nih.gov/health/lavender',
      },
      {
        tier: 2,
        type: 'practitioner',
        citation: 'Drugs.com: Lavender — Uses, Benefits & Dosage',
        url: 'https://www.drugs.com/npp/lavender.html',
      },
    ],
    verificationTier: 'verified',
    contributedBy: 'Legaseed Archive',
    lastUpdated: '2026-06',
    relatedHerbs: ['chamomile', 'linden'],
    relatedPractices: [],
    illustrationComponent: 'PlaceholderHerb',
  },
]
