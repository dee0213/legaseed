import { LifeStage } from '../types'

export const lifeStages: LifeStage[] = [
  'menarche',
  'follicular',
  'ovulatory',
  'luteal',
  'menstrual',
  'pregnancy-t1',
  'pregnancy-t2',
  'pregnancy-t3',
  'postpartum',
  'perimenopause',
  'post-menopause',
  'male-hormonal',
]

export const lifeStageLabels: Record<LifeStage, string> = {
  'menarche': 'Menarche',
  'follicular': 'Follicular Phase',
  'ovulatory': 'Ovulatory Phase',
  'luteal': 'Luteal Phase',
  'menstrual': 'Menstrual Phase',
  'pregnancy-t1': 'Pregnancy — First Trimester',
  'pregnancy-t2': 'Pregnancy — Second Trimester',
  'pregnancy-t3': 'Pregnancy — Third Trimester',
  'postpartum': 'Postpartum',
  'perimenopause': 'Perimenopause',
  'post-menopause': 'Post-Menopause',
  'male-hormonal': 'Male Hormonal Health',
}
