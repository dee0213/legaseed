import type { LifeStage } from '../types'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BodyStageData {
  slug: string
  name: string
  tagline: string
  accent: string
  lifeStageKeys: LifeStage[]
  physiologyText: string
  traditionSays: { tradition: string; text: string }[]
  elderVoice: { quote: string; attribution: string }
  subStages?: string[]
  parentSlug?: string
  isSubStage?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const bodyStages: BodyStageData[] = [
  {
    slug: 'menarche',
    name: 'Menarche',
    tagline: 'The first blood — the body\'s opening declaration',
    accent: '#7a8c6e',
    lifeStageKeys: ['menarche'],
    physiologyText:
      'Estrogen and progesterone begin their monthly conversation for the first time. The hypothalamic-pituitary-ovarian axis is still calibrating, and cycles may be irregular for the first one to two years as the hormonal loop establishes its rhythm. Iron stores, cognitive landscape, and emotional depth all shift profoundly in this initiation — a threshold that every tradition in this archive marks as sacred.',
    traditionSays: [
      { tradition: 'Ayurveda', text: 'Menarche marks the arrival of rajasic power — a sacred activation, tended with rest, warmth, and iron-rich foods that honor the body\'s new labor.' },
      { tradition: 'Curanderismo', text: 'This crossing is honored with ceremony — the girl is seen, named in her power, and taught what her grandmothers know about living in a body that bleeds.' },
      { tradition: 'Indigenous North American', text: 'The first moon is a time of vision and sacred protection; girls are held in ceremony and apart from ordinary life for the duration of this threshold.' },
    ],
    elderVoice: {
      quote: 'Your first blood is not a problem to manage. It is the body\'s opening statement. Pay close attention to what it says — it is telling you who you are.',
      attribution: 'Oral tradition, Curanderismo lineage · Mexico',
    },
  },

  {
    slug: 'monthly-cycle',
    name: 'Monthly Cycle',
    tagline: 'The inner seasons — four phases, one rhythm',
    accent: '#3d5235',
    lifeStageKeys: ['follicular', 'ovulatory', 'luteal', 'menstrual'],
    subStages: ['follicular', 'ovulatory', 'luteal', 'menstrual'],
    physiologyText:
      'The menstrual cycle is not a single event but four distinct hormonal environments repeating across roughly 21–35 days. Estrogen, progesterone, FSH, and LH rise and fall in precise patterns, creating what traditions call the body\'s inner seasons — each phase with its own energy, cognition, emotional register, and relational quality. Understanding the cycle as a whole is the first medicine.',
    traditionSays: [
      { tradition: 'Traditional Chinese Medicine', text: 'The cycle reflects the movement of qi and blood through the body; each phase has its own treatment principle, from building to moving to releasing.' },
      { tradition: 'Ayurveda', text: 'The cycle moves through kapha (building), pitta (peak and heat), and vata (release and rest) qualities — each requiring different foods, herbs, and activity.' },
      { tradition: 'Western Herbalism', text: 'The inner seasons framework — winter, spring, summer, autumn — gives women a map for their energy, creativity, and need for solitude throughout the month.' },
    ],
    elderVoice: {
      quote: 'She knew herself by her cycle. Winter for rest, spring for planting, summer for speaking, autumn for turning inward. The calendar was in her body — not on the wall.',
      attribution: 'Alexandra Pope · Red School, United Kingdom',
    },
  },

  {
    slug: 'follicular',
    name: 'Follicular Phase',
    tagline: 'Rising estrogen — the inner spring',
    accent: '#3d5235',
    parentSlug: 'monthly-cycle',
    isSubStage: true,
    lifeStageKeys: ['follicular'],
    physiologyText:
      'FSH signals the ovary to begin maturing a cohort of follicles, one of which will become dominant. Estrogen rises steadily, rebuilding the uterine lining shed in menstruation. Energy, cognitive clarity, and outward-facing drive typically increase in this phase. The body is in its spring — generative, curious, capable of beginning.',
    traditionSays: [
      { tradition: 'Ayurveda', text: 'The follicular phase corresponds to kapha increasing — a building time, supported by light nourishing foods and gentle movement that opens energy without depleting it.' },
      { tradition: 'Western Herbalism', text: 'Herbs that support estrogen\'s healthy metabolism — liver tonics, adaptogens — are well-suited here as the system moves into its most active outward phase.' },
    ],
    elderVoice: {
      quote: 'The follicular phase is not just preparation for ovulation. It is preparation for yourself — who you want to be this month, this cycle, this life.',
      attribution: 'Lara Briden · Naturopathic physician',
    },
  },

  {
    slug: 'ovulatory',
    name: 'Ovulatory Phase',
    tagline: 'The surge — peak vitality, peak expression',
    accent: '#3d5235',
    parentSlug: 'monthly-cycle',
    isSubStage: true,
    lifeStageKeys: ['ovulatory'],
    physiologyText:
      'LH surges and the dominant follicle releases its egg. Estrogen peaks, testosterone spikes briefly, and the body\'s outward-facing energy reaches its zenith. Communication, attraction, and creative fire all heighten. The window of ovulation itself is narrow — 12 to 36 hours — but its hormonal signature extends across several days around it.',
    traditionSays: [
      { tradition: 'Traditional Chinese Medicine', text: 'Ovulation marks the kidney jing expressing itself fully — the creative force of the body at its height, calling for herbs that support rather than stimulate.' },
      { tradition: 'Ayurveda', text: 'The pitta quality peaks: heat, transformation, clarity, and will. Foods and herbs that cool and hydrate prevent excess fire from turning to depletion.' },
    ],
    elderVoice: {
      quote: 'This is not the time for herbs. This is the time to feel what your body already knows it is capable of.',
      attribution: 'Rosita Arvigo · Belizean healer',
    },
  },

  {
    slug: 'luteal',
    name: 'Luteal Phase',
    tagline: 'Progesterone rising — the inner autumn',
    accent: '#3d5235',
    parentSlug: 'monthly-cycle',
    isSubStage: true,
    lifeStageKeys: ['luteal'],
    physiologyText:
      'The follicle that released its egg becomes the corpus luteum, which produces progesterone to prepare the uterine lining for possible implantation. Inward energy, heightened sensitivity, and a desire for quiet are characteristic. Magnesium, B6, and nervous system support are well-studied for this phase. If implantation does not occur, both progesterone and estrogen fall sharply, beginning the next bleed.',
    traditionSays: [
      { tradition: 'Western Herbalism', text: 'Vitex (Chaste Tree) acts in the luteal phase specifically — supporting progesterone production at the hypothalamic level over long-term consistent use.' },
      { tradition: 'Ayurveda', text: 'Vata begins to rise in the luteal phase — a time for grounding, warming foods, and practices that anchor the nervous system before the bleed.' },
    ],
    elderVoice: {
      quote: 'The luteal phase teaches you what needs to die. Not harshly — it clears the room, quietly, so that something true can be born.',
      attribution: 'Miranda Gray · Red School',
    },
  },

  {
    slug: 'menstrual',
    name: 'Menstrual Phase',
    tagline: 'The release — inner winter, the body\'s reset',
    accent: '#3d5235',
    parentSlug: 'monthly-cycle',
    isSubStage: true,
    lifeStageKeys: ['menstrual'],
    physiologyText:
      'Progesterone and estrogen are at their lowest. The uterine lining releases. The veil between inner knowing and ordinary function is thinnest — many report heightened intuition, dreamlife, and access to feeling in this phase. Iron losses are significant. Most traditions consider this a time for rest, inward attention, and the reception of guidance rather than output and performance.',
    traditionSays: [
      { tradition: 'Indigenous North American', text: 'The menstrual time is a sacred rest — bleeding women were held apart not as punishment but as protection, recognized as most powerful and most permeable to the spirit world.' },
      { tradition: 'Traditional Chinese Medicine', text: 'Blood moving freely and without pain is the sign of a healthy cycle; warming, moving herbs support smooth release while nourishing blood herbs follow after.' },
      { tradition: 'Curanderismo', text: 'The menstrual blood is sacred medicine — some traditions return it to the earth as a gift, maintaining the reciprocal relationship between body and land.' },
    ],
    elderVoice: {
      quote: 'Rest is not laziness during your bleeding time. It is service — to your body, to your future capacity, to the women who will come after you.',
      attribution: 'Tami Lynn Kent · Holistic pelvic care',
    },
  },

  {
    slug: 'pregnancy',
    name: 'Pregnancy',
    tagline: 'The great transformation — three trimesters',
    accent: '#c49a8a',
    lifeStageKeys: ['pregnancy-t1', 'pregnancy-t2', 'pregnancy-t3'],
    subStages: ['pregnancy-t1', 'pregnancy-t2', 'pregnancy-t3'],
    physiologyText:
      'Pregnancy is one of the most profound hormonal events of the human lifespan. HCG, estrogen, progesterone, relaxin, oxytocin, and prolactin reshape every organ system — loosening joints, expanding blood volume by nearly 50%, rewiring the brain. The placenta becomes the body\'s largest endocrine gland. Herb use requires the highest caution and the most specific guidance during this window.',
    traditionSays: [
      { tradition: 'Ayurveda', text: 'Pregnancy is a state of heightened agni — digestive fire and immune sensitivity both increase; only the mildest, most nourishing herbs are indicated, and always with practitioner guidance.' },
      { tradition: 'Traditional Chinese Medicine', text: 'Building blood and qi while calming the shen (spirit) are the twin aims of herb support in pregnancy — raspberry leaf and ginger are among the most widely used.' },
      { tradition: 'Western Herbalism', text: 'The Wise Woman tradition considers pregnancy a time for nourishing infusions — nettles, oatstraw — rather than active herbal medicine except in specific circumstances.' },
    ],
    elderVoice: {
      quote: 'Your body knows how to make a human. What it needs from you — and from the plants — is not interference. It is support.',
      attribution: 'Susun Weed · Wise Woman Herbals',
    },
  },

  {
    slug: 'pregnancy-t1',
    name: 'First Trimester',
    tagline: 'Implantation through week 12 — the hidden building',
    accent: '#c49a8a',
    parentSlug: 'pregnancy',
    isSubStage: true,
    lifeStageKeys: ['pregnancy-t1'],
    physiologyText:
      'HCG rises sharply, signaling the corpus luteum to continue progesterone production until the placenta can take over. Nausea, fatigue, and heightened smell are common as the body redirects its full resources toward building the placenta and organizing the embryo. This is the most sensitive window for herb and drug interactions — the period of organogenesis when most of the embryo\'s structural systems form.',
    traditionSays: [
      { tradition: 'Western Herbalism', text: 'Ginger tea is among the few herbs with wide practitioner consensus for first-trimester nausea — always at food-level rather than medicinal doses.' },
      { tradition: 'Ayurveda', text: 'The first trimester calls for cooling, easy-to-digest foods; many Ayurvedic herbs are paused entirely during this window out of respect for the complexity of what is forming.' },
    ],
    elderVoice: {
      quote: 'The first trimester is the body\'s most private conversation. Protect it. Rest into it. Do not try to push through it.',
      attribution: 'Robin Rose Bennett · Weedwalk Herbals',
    },
  },

  {
    slug: 'pregnancy-t2',
    name: 'Second Trimester',
    tagline: 'Weeks 13–26 — the carrying',
    accent: '#c49a8a',
    parentSlug: 'pregnancy',
    isSubStage: true,
    lifeStageKeys: ['pregnancy-t2'],
    physiologyText:
      'The placenta takes over full hormone production. Estrogen and progesterone climb steadily. Energy often returns, digestion stabilizes, and the pregnancy becomes visible. Iron needs intensify significantly as blood volume has expanded by nearly 50% and the fetus begins drawing mineral stores in earnest. Moringa, nettle, and raspberry leaf are widely supported during this phase.',
    traditionSays: [
      { tradition: 'Traditional Chinese Medicine', text: 'Blood-building becomes the primary focus of the second trimester — moringa, dates, and nourishing soups are used across cultures for exactly this purpose.' },
      { tradition: 'Indigenous North American', text: 'Many traditions emphasize gentle movement, community connection, and singing to the child during this phase — the body is most open and the child is most receiving.' },
    ],
    elderVoice: {
      quote: 'The second trimester is when you learn to carry two lives at once. The plants can hold you while you learn.',
      attribution: 'Pam England · Birthing From Within',
    },
  },

  {
    slug: 'pregnancy-t3',
    name: 'Third Trimester',
    tagline: 'Weeks 27–40 — the deepening weight',
    accent: '#c49a8a',
    parentSlug: 'pregnancy',
    isSubStage: true,
    lifeStageKeys: ['pregnancy-t3'],
    physiologyText:
      'Relaxin and estrogen peak, softening ligaments and preparing the pelvis. Progesterone remains high until labor begins. Physical strain is significant — sleep disruption, heartburn, and Braxton Hicks contractions are common. Raspberry leaf tea in this trimester (under guidance) is among the most-studied traditional preparations for uterine preparation. The body is readying for the most intense hormonal drop in human experience.',
    traditionSays: [
      { tradition: 'Western Herbalism', text: 'Raspberry leaf tea in the third trimester is one of the few areas of wide consensus among herbalists — used to tone uterine muscle for labor, not to induce it.' },
      { tradition: 'Ayurveda', text: 'The final trimester calls for grounding and preparation: abhyanga (warm oil massage), gentle pranayama, and foods that build ojas — the essential vitality the infant will draw on after birth.' },
    ],
    elderVoice: {
      quote: 'The third trimester is not preparation for birth. It is the last conversation between just the two of you, before the world meets the one you have been growing.',
      attribution: 'Ina May Gaskin · The Farm Midwifery Center',
    },
  },

  {
    slug: 'postpartum',
    name: 'Postpartum & Lactation',
    tagline: 'After the birth — the fourth trimester',
    accent: '#c9a030',
    lifeStageKeys: ['postpartum'],
    physiologyText:
      'The sharpest hormonal drop in human experience: estrogen and progesterone fall precipitously within 24 hours of birth. Prolactin rises to support lactation. Oxytocin pulses with nursing and bonding. The brain is literally being rebuilt — studies show increased gray matter density in regions associated with caregiving. Iron, protein, nervous system support, and galactagogue herbs are critical in this window.',
    traditionSays: [
      { tradition: 'Traditional Chinese Medicine', text: 'The postpartum body is considered "open" — highly vulnerable and highly receptive; warming blood-building foods and herbs are given for 30–40 days, called "sitting the month" (zuo yue zi).' },
      { tradition: 'Ayurveda', text: 'Sutika paricharya — the 40-day postpartum period — prescribes warmth, rest, sesame oil, and specific tonics to restore ojas (vital essence) depleted through birth and lactation.' },
      { tradition: 'Curanderismo', text: 'La dieta — the postpartum diet — involves warmth, gentle foods, herbal baths (baños), and community holding; the new mother is not expected to function at full capacity for 40 days.' },
    ],
    elderVoice: {
      quote: 'No woman should birth alone, and no woman should recover alone. The fourth trimester is not a time to return to normal. It is a time to become what you now are.',
      attribution: 'Kimberly Ann Johnson · The Fourth Trimester',
    },
  },

  {
    slug: 'perimenopause',
    name: 'Perimenopause',
    tagline: 'The long transition — hormones in negotiation',
    accent: '#7a5c8c',
    lifeStageKeys: ['perimenopause'],
    physiologyText:
      'The ovaries\' follicle reserve declines, and the feedback loop between brain and ovaries begins to fluctuate. Estrogen does not decline smoothly — it surges and crashes, sometimes producing higher peaks than at any earlier point in life before the overall downward trend. Progesterone often declines first, creating a period of estrogen dominance. This phase can begin in the late 30s and last up to 10 years.',
    traditionSays: [
      { tradition: 'Ayurveda', text: 'Perimenopause is a vata-pitta transition — the body moving from the pitta (fire) years of reproductive life into the vata (air/ether) years; adaptogens, sesame oil, and grounding practices are central.' },
      { tradition: 'Traditional Chinese Medicine', text: 'Kidney yin and yang deficiency are the primary patterns in perimenopause; nourishing herbs are given in specific combinations based on whether heat or cold symptoms predominate.' },
      { tradition: 'Western Herbalism', text: 'Vitex, black cohosh, and shatavari — with careful attention to the specific symptom picture — are the most commonly indicated herbs for perimenopausal support.' },
    ],
    elderVoice: {
      quote: 'Perimenopause is not the beginning of the end. It is the end of one chapter and the arrival of what you have been building toward for decades. Most women find it is the most powerful chapter of all.',
      attribution: 'Dr. Christiane Northrup · Women\'s Bodies, Women\'s Wisdom',
    },
  },

  {
    slug: 'post-menopause',
    name: 'Post-Menopause',
    tagline: 'After the final blood — wisdom\'s opening',
    accent: '#b5694f',
    lifeStageKeys: ['post-menopause'],
    physiologyText:
      'Estrogen and progesterone production from the ovaries has ceased. The adrenal glands and adipose tissue continue producing smaller amounts of estrogens. The focus shifts from cycling to sustaining: bone density, cardiovascular health, cognitive clarity, and the profound recalibration of a body no longer organized around reproduction. Many traditions consider this the most spiritually available and creatively potent chapter of a woman\'s life.',
    traditionSays: [
      { tradition: 'Indigenous North American', text: 'Post-menopausal women are "double-medicine women" — now holding their power within rather than releasing it monthly, their presence is considered especially potent for healing and guidance.' },
      { tradition: 'Traditional Chinese Medicine', text: 'Post-menopause is a time to conserve and cultivate jing — the body\'s deep essence — through tonics, rest, and the gradual refinement of practice toward its most essential forms.' },
      { tradition: 'Ayurveda', text: 'The vata years call for warmth, oil, gentleness with the body, and deep nourishment through food and herb — the emphasis shifts entirely from stimulation to sustenance.' },
    ],
    elderVoice: {
      quote: 'After the bleeding stops, the power doesn\'t leave. It stays. It deepens. What was scattered across the month now lives in you, always, permanently. That is what the elders meant when they called it the opening.',
      attribution: 'Clarissa Pinkola Estés · Women Who Run With the Wolves',
    },
  },

  {
    slug: 'male-hormonal',
    name: 'Male Hormonal Journey',
    tagline: 'Testosterone cycles, andropause, and the long arc',
    accent: '#5a7a4a',
    lifeStageKeys: ['male-hormonal'],
    physiologyText:
      'Testosterone peaks in the late teens and early 20s, then declines approximately 1% per year from age 30. Diurnal rhythms, sleep quality, stress hormones (cortisol and testosterone are in direct opposition), metabolic health, and relationship patterns all profoundly shape the male hormonal journey. Andropause — the gradual decline of the third and fourth decades — is less dramatic than menopause but no less significant in its effects on energy, mood, body composition, and vitality.',
    traditionSays: [
      { tradition: 'Ayurveda', text: 'Shukra dhatu — the reproductive tissue and vital essence — is preserved through brahmacharya (management of vital energy), tonics like ashwagandha, and foods that build rather than deplete.' },
      { tradition: 'Traditional Chinese Medicine', text: 'Kidney yang and jing support are the primary aims in male hormonal decline — herbs like he shou wu, eucommia, and astragalus build the deep reserves that testosterone depends on.' },
      { tradition: 'Western Herbalism', text: 'Adaptogens — ashwagandha, rhodiola, panax ginseng — are the most studied herbs for male hormonal support, addressing the cortisol-testosterone relationship and adrenal resilience.' },
    ],
    elderVoice: {
      quote: 'A man\'s vitality is not a resource to be spent. It is a practice to be tended — like a fire. What you put in determines what burns, and for how long.',
      attribution: 'Malidoma Patrice Somé · African spiritual teacher',
    },
  },
]

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getStageBySlug(slug: string): BodyStageData | undefined {
  return bodyStages.find((s) => s.slug === slug)
}

export const timelineStages = bodyStages.filter((s) => !s.isSubStage)
