'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { HerbEntry, LifeStage, Preparation, Source, Combination } from '@/lib/types'
import { herbs } from '@/lib/data/herbs'

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  forest:     '#2c3d26',
  moss:       '#4a6741',
  sage:       '#7a9a6b',
  fern:       '#5a7a3a',
  clay:       '#b5694f',
  terracotta: '#9c4f38',
  ochre:      '#c8963e',
  sienna:     '#7a3520',
  dustyRose:  '#c49a8a',
  plum:       '#7c5c8a',
  cream:      '#faf6ec',
  parchment:  '#f2ead8',
  warmWhite:  '#fdfaf3',
  border:     '#e0d8c8',
  warmGray:   '#9c9080',
  ink:        '#1a1810',
}

const FONT = {
  serif: `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:  `var(--font-dm-mono, 'DM Mono', monospace)`,
  libre: `var(--font-libre, 'Libre Baskerville', Georgia, serif)`,
}

// ─── Botanical SVG illustrations ──────────────────────────────────────────────

function AshwagandhaIllustration() {
  return (
    <svg viewBox="0 0 180 280" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ maxWidth: 180 }}>
      {/* Root tendrils */}
      <path d="M90 235 Q74 250 60 268 M90 235 Q87 254 88 272 M90 235 Q102 252 106 270 M90 235 Q108 247 122 263" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      {/* Taproot */}
      <path d="M90 195 Q87 215 90 235" stroke={T.forest} strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="90" cy="198" rx="11" ry="6" stroke={T.forest} strokeWidth="1.5" fill="none"/>
      {/* Main stem */}
      <path d="M90 50 Q87 120 90 195" stroke={T.forest} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Upper branches */}
      <path d="M90 75 Q113 65 136 57" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M90 75 Q67 67 44 61" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      {/* Upper leaves */}
      <path d="M136 57 Q150 50 148 62 Q140 66 136 57Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <path d="M44 61 Q30 54 32 66 Q40 70 44 61Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      {/* Berries — right */}
      <circle cx="142" cy="50" r="3.5" stroke={T.forest} strokeWidth="1" fill="none"/>
      <circle cx="148" cy="45" r="3.5" stroke={T.forest} strokeWidth="1" fill="none"/>
      <circle cx="144" cy="41" r="3.5" stroke={T.forest} strokeWidth="1" fill="none"/>
      <path d="M142 46 L142 43 M140 47 L138 45 M144 47 L146 45" stroke={T.sage} strokeWidth="0.6"/>
      {/* Berries — left */}
      <circle cx="38" cy="54" r="3.5" stroke={T.forest} strokeWidth="1" fill="none"/>
      <circle cx="32" cy="49" r="3.5" stroke={T.forest} strokeWidth="1" fill="none"/>
      <circle cx="35" cy="45" r="3.5" stroke={T.forest} strokeWidth="1" fill="none"/>
      <path d="M32 45 L32 42 M30 46 L28 44 M34 46 L36 44" stroke={T.sage} strokeWidth="0.6"/>
      {/* Middle branches */}
      <path d="M90 122 Q114 112 138 108" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M90 122 Q66 114 42 110" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M138 108 Q154 100 152 114 Q143 118 138 108Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="138" y1="108" x2="150" y2="112" stroke={T.sage} strokeWidth="0.5"/>
      <path d="M42 110 Q26 102 28 116 Q37 120 42 110Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="42" y1="110" x2="30" y2="114" stroke={T.sage} strokeWidth="0.5"/>
      {/* Lower branches */}
      <path d="M90 160 Q110 152 128 150" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M90 160 Q70 154 52 152" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M128 150 Q142 144 140 154 Q132 158 128 150Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <path d="M52 152 Q38 146 40 156 Q48 160 52 152Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      {/* Terminal tip */}
      <path d="M90 50 Q96 39 92 28 Q88 38 84 28 Q80 39 90 50Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="90" y1="50" x2="90" y2="30" stroke={T.sage} strokeWidth="0.6"/>
      {/* Stem nodes */}
      <circle cx="90" cy="98" r="1.5" stroke={T.sage} strokeWidth="0.8" fill="none"/>
      <circle cx="90" cy="142" r="1.5" stroke={T.sage} strokeWidth="0.8" fill="none"/>
    </svg>
  )
}

function ChamomileIllustration() {
  const petalAngles = [0, 45, 90, 135, 180, 225, 270, 315]
  const flower = (cx: number, cy: number, r: number, offset: number = 0) => petalAngles.map((deg, i) => {
    const a = ((deg + offset) * Math.PI) / 180
    const px = cx + r * Math.sin(a)
    const py = cy - r * Math.cos(a)
    return <ellipse key={i} cx={px} cy={py} rx="4" ry="6.5" transform={`rotate(${deg + offset} ${px} ${py})`} stroke={T.forest} strokeWidth="0.9" fill="none"/>
  })
  return (
    <svg viewBox="0 0 180 280" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ maxWidth: 180 }}>
      {/* Stems */}
      <path d="M90 268 Q88 230 80 185 Q74 155 82 110 Q86 85 84 55" stroke={T.forest} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M90 268 Q92 235 100 192 Q106 162 104 118 Q102 90 100 62" stroke={T.forest} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M90 268 Q90 240 90 210 Q90 175 90 140 Q90 100 90 35" stroke={T.forest} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Feathery pinnate leaves — left stem */}
      <path d="M81 105 Q68 97 66 86 M81 105 Q70 106 63 98" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M78 150 Q64 141 62 129 M78 150 Q66 151 58 143" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      {/* Feathery leaves — right stem */}
      <path d="M102 115 Q115 107 117 96 M102 115 Q114 116 120 108" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M102 158 Q116 149 118 137 M102 158 Q115 160 122 151" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      {/* Feathery leaves — center stem */}
      <path d="M87 135 Q74 127 72 116 M93 135 Q106 127 108 116" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      {/* Flower 1 — center tall stem */}
      <circle cx="90" cy="35" r="6.5" stroke={T.forest} strokeWidth="1.5" fill="none"/>
      {flower(90, 35, 14)}
      <circle cx="87" cy="33" r="1" stroke={T.sage} strokeWidth="0.5" fill="none"/>
      <circle cx="92" cy="36" r="1" stroke={T.sage} strokeWidth="0.5" fill="none"/>
      {/* Flower 2 — left stem */}
      <circle cx="84" cy="53" r="6" stroke={T.forest} strokeWidth="1.5" fill="none"/>
      {flower(84, 53, 12, 22)}
      {/* Flower 3 — right stem */}
      <circle cx="100" cy="60" r="6" stroke={T.forest} strokeWidth="1.5" fill="none"/>
      {flower(100, 60, 12, 10)}
    </svg>
  )
}

function ElderberryIllustration() {
  return (
    <svg viewBox="0 0 180 280" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ maxWidth: 180 }}>
      {/* Main stem */}
      <path d="M90 272 Q88 230 90 190 Q92 150 90 110 Q88 70 90 32" stroke={T.forest} strokeWidth="2" strokeLinecap="round"/>
      {/* Compound leaf — left */}
      <path d="M90 145 Q68 133 48 122" stroke={T.forest} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M48 122 Q36 112 34 98 M48 122 Q38 118 32 108 M48 122 Q41 128 36 121" stroke={T.forest} strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M34 98 Q43 92 41 103 Q35 107 34 98Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
      <path d="M32 108 Q41 102 39 113 Q33 117 32 108Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
      <path d="M36 121 Q45 116 43 126 Q37 130 36 121Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
      {/* Compound leaf — right */}
      <path d="M90 145 Q112 133 132 122" stroke={T.forest} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M132 122 Q144 112 146 98 M132 122 Q142 118 148 108 M132 122 Q139 128 144 121" stroke={T.forest} strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M146 98 Q137 92 139 103 Q145 107 146 98Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
      <path d="M148 108 Q139 102 141 113 Q147 117 148 108Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
      <path d="M144 121 Q135 116 137 126 Q143 130 144 121Z" stroke={T.forest} strokeWidth="0.8" fill="none"/>
      {/* Berry umbel — upper right */}
      <path d="M90 88 Q115 73 140 58" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M140 58 Q149 50 150 40 M140 58 Q153 55 157 45 M140 58 Q146 64 152 60" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M140 58 Q131 49 129 39 M140 58 Q128 55 124 45" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      <circle cx="150" cy="38" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <circle cx="157" cy="43" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <circle cx="153" cy="59" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <circle cx="129" cy="37" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <circle cx="124" cy="43" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <line x1="150" y1="34" x2="150" y2="31" stroke={T.sage} strokeWidth="0.6"/>
      <line x1="129" y1="33" x2="129" y2="30" stroke={T.sage} strokeWidth="0.6"/>
      {/* Berry umbel — upper left */}
      <path d="M90 88 Q65 75 40 60" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M40 60 Q31 52 30 42 M40 60 Q27 57 23 47 M40 60 Q34 66 28 62" stroke={T.sage} strokeWidth="0.8" strokeLinecap="round"/>
      <circle cx="30" cy="40" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <circle cx="23" cy="45" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <circle cx="27" cy="61" r="4.5" stroke={T.forest} strokeWidth="1.2" fill="none"/>
      <line x1="30" y1="36" x2="30" y2="33" stroke={T.sage} strokeWidth="0.6"/>
    </svg>
  )
}

function GenericHerbIllustration() {
  return (
    <svg viewBox="0 0 180 280" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ maxWidth: 180 }}>
      {/* Main stem */}
      <path d="M90 268 Q88 220 90 180 Q92 140 90 100 Q88 60 90 32" stroke={T.forest} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Leaf pair 1 — lower */}
      <path d="M90 198 Q70 190 54 178" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M54 178 Q38 168 40 152 Q47 157 57 166 Q62 172 54 178Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="54" y1="178" x2="44" y2="160" stroke={T.sage} strokeWidth="0.7"/>
      <path d="M90 198 Q110 190 126 178" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M126 178 Q142 168 140 152 Q133 157 123 166 Q118 172 126 178Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="126" y1="178" x2="136" y2="160" stroke={T.sage} strokeWidth="0.7"/>
      {/* Leaf pair 2 — middle */}
      <path d="M90 148 Q68 139 52 127" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M52 127 Q34 115 36 98 Q44 104 56 114 Q62 120 52 127Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="52" y1="127" x2="40" y2="108" stroke={T.sage} strokeWidth="0.7"/>
      <path d="M90 148 Q112 139 128 127" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M128 127 Q146 115 144 98 Q136 104 124 114 Q118 120 128 127Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="128" y1="127" x2="140" y2="108" stroke={T.sage} strokeWidth="0.7"/>
      {/* Leaf pair 3 — upper */}
      <path d="M90 96 Q72 87 59 74" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M59 74 Q45 62 48 48 Q55 54 63 63 Q67 70 59 74Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="59" y1="74" x2="52" y2="56" stroke={T.sage} strokeWidth="0.7"/>
      <path d="M90 96 Q108 87 121 74" stroke={T.forest} strokeWidth="1" strokeLinecap="round"/>
      <path d="M121 74 Q135 62 132 48 Q125 54 117 63 Q113 70 121 74Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="121" y1="74" x2="128" y2="56" stroke={T.sage} strokeWidth="0.7"/>
      {/* Terminal bud */}
      <path d="M90 32 Q97 22 90 12 Q83 22 90 32Z" stroke={T.forest} strokeWidth="1" fill="none"/>
      <line x1="90" y1="32" x2="90" y2="13" stroke={T.sage} strokeWidth="0.6"/>
      {/* Node dots */}
      <circle cx="90" cy="170" r="2" stroke={T.sage} strokeWidth="0.8" fill="none"/>
      <circle cx="90" cy="120" r="2" stroke={T.sage} strokeWidth="0.8" fill="none"/>
      <circle cx="90" cy="70" r="2" stroke={T.sage} strokeWidth="0.8" fill="none"/>
    </svg>
  )
}

function BotanicalIllustration({ slug }: { slug: string }) {
  if (slug === 'ashwagandha') return <AshwagandhaIllustration />
  if (slug === 'chamomile') return <ChamomileIllustration />
  if (slug === 'elderberry') return <ElderberryIllustration />
  return <GenericHerbIllustration />
}

// ─── Verification badge ───────────────────────────────────────────────────────

function VerificationBadge({ tier }: { tier: HerbEntry['verificationTier'] }) {
  const map = {
    community: { label: 'Community Record', color: T.warmGray,  border: T.border },
    verified:  { label: 'Verified',          color: T.ochre,     border: T.ochre },
    endorsed:  { label: 'Tradition-Endorsed', color: T.moss,     border: T.moss },
  }
  const s = map[tier]
  return (
    <span style={{
      fontFamily: FONT.mono, fontSize: '0.6rem', letterSpacing: '0.14em',
      textTransform: 'uppercase', color: s.color, border: `1px solid ${s.border}`,
      padding: '2px 8px', display: 'inline-block',
    }}>
      {s.label}
    </span>
  )
}

// ─── Polarity spectrum bar ────────────────────────────────────────────────────

function PolarityBar({ polarity }: { polarity: HerbEntry['hormonalPolarity'] }) {
  const positions = { yin: '8%', neutral: '50%', yang: '88%', biphasic: '50%' }
  const labels    = { yin: 'Yin — cooling, building', neutral: 'Neutral — balanced', yang: 'Yang — warming, activating', biphasic: 'Biphasic — context-dependent' }
  const pos = positions[polarity]

  return (
    <div>
      <div style={{ position: 'relative', height: '8px', borderRadius: '4px', width: '100%', maxWidth: '200px',
        background: `linear-gradient(to right, ${T.plum}, ${T.ochre}, ${T.fern})` }}>
        <div style={{
          position: 'absolute', top: '50%', left: pos,
          transform: 'translate(-50%, -50%)',
          width: '14px', height: '14px', borderRadius: '50%',
          background: T.cream, border: `2px solid ${T.ink}`,
        }} />
        {polarity === 'biphasic' && (
          <div style={{
            position: 'absolute', top: '50%', left: '35%',
            transform: 'translate(-50%, -50%)',
            width: '10px', height: '10px', borderRadius: '50%',
            background: T.cream, border: `1.5px solid ${T.warmGray}`, opacity: 0.6,
          }} />
        )}
      </div>
      <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', color: T.warmGray, marginTop: '6px', letterSpacing: '0.08em' }}>
        {labels[polarity]}
      </p>
    </div>
  )
}

// ─── Life stage strip ─────────────────────────────────────────────────────────

const ALL_LIFE_STAGES: { stage: LifeStage; label: string }[] = [
  { stage: 'menarche',       label: 'Menar.' },
  { stage: 'follicular',     label: 'Follic.' },
  { stage: 'ovulatory',      label: 'Ovulat.' },
  { stage: 'luteal',         label: 'Luteal' },
  { stage: 'menstrual',      label: 'Menses' },
  { stage: 'pregnancy-t1',   label: 'Preg.1' },
  { stage: 'pregnancy-t2',   label: 'Preg.2' },
  { stage: 'pregnancy-t3',   label: 'Preg.3' },
  { stage: 'postpartum',     label: 'Post.' },
  { stage: 'perimenopause',  label: 'Peri.' },
  { stage: 'post-menopause', label: 'P.Men.' },
  { stage: 'male-hormonal',  label: 'Male' },
]

const STATUS_COLORS = {
  supported:       T.fern,
  guidance:        T.ochre,
  contraindicated: T.sienna,
}

function LifeStageStrip({ lifeStageMap }: { lifeStageMap: HerbEntry['lifeStageMap'] }) {
  const statusMap = new Map(lifeStageMap.map((r) => [r.stage, r.status]))
  return (
    <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
      <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content' }}>
        {ALL_LIFE_STAGES.map(({ stage, label }) => {
          const status = statusMap.get(stage)
          const dotColor = status ? STATUS_COLORS[status] : T.border
          return (
            <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor, border: `1px solid ${status ? dotColor : T.warmGray}`, opacity: status ? 1 : 0.4 }} />
              <span style={{ fontFamily: FONT.mono, fontSize: '0.52rem', color: T.warmGray, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
            <span style={{ fontFamily: FONT.mono, fontSize: '0.5rem', color: T.warmGray, textTransform: 'capitalize' }}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Five-axis display ────────────────────────────────────────────────────────

function FiveAxisDisplay({ herb, combinationsCount }: { herb: HerbEntry; combinationsCount: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Axis 1 — Actions */}
      <div>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '7px' }}>
          Pharmacological Actions
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {herb.pharmacologicalActions.map((action) => (
            <span key={action} style={{
              fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', background: `${T.sage}22`, color: T.forest,
              border: `1px solid ${T.sage}55`, padding: '2px 7px', borderRadius: '1px',
            }}>
              {action}
            </span>
          ))}
        </div>
      </div>

      {/* Axis 2 — Polarity */}
      <div>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '7px' }}>
          Hormonal Polarity
        </p>
        <PolarityBar polarity={herb.hormonalPolarity} />
      </div>

      {/* Axis 3 — Life stages */}
      <div>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '7px' }}>
          Life Stage Map
        </p>
        <LifeStageStrip lifeStageMap={herb.lifeStageMap} />
      </div>

      {/* Axis 4 — Combinations */}
      <div>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '7px' }}>
          Known Combinations
        </p>
        <a href="#combinations" style={{
          fontFamily: FONT.mono, fontSize: '0.6rem', letterSpacing: '0.12em',
          color: T.clay, border: `1px solid ${T.clay}`, padding: '3px 10px',
          display: 'inline-block', textDecoration: 'none', borderRadius: '1px',
        }}>
          {combinationsCount > 0 ? `${combinationsCount} combination${combinationsCount > 1 ? 's' : ''}` : 'none documented'}
        </a>
      </div>

      {/* Axis 5 — Traditions */}
      {herb.traditionLenses.length > 0 && (
        <div>
          <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '7px' }}>
            Tradition Lenses
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {herb.traditionLenses.map((t) => (
              <span key={t.traditionId} style={{
                fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.1em',
                color: T.forest, border: `1px solid ${T.border}`, padding: '2px 8px', borderRadius: '1px',
              }}>
                {t.traditionId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Callout box ─────────────────────────────────────────────────────────────

function Callout({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{
      borderLeft: `3px solid ${T.clay}`, paddingLeft: '1rem',
      paddingTop: '0.75rem', paddingBottom: '0.75rem',
      backgroundColor: 'rgba(181,105,79,0.04)', borderRadius: '0 2px 2px 0',
    }}>
      {label && (
        <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.clay, marginBottom: '6px' }}>
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

// ─── Preparation card ─────────────────────────────────────────────────────────

function PreparationCard({ prep }: { prep: Preparation }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, background: T.parchment, padding: '1.25rem', borderRadius: 0 }}>
      <p style={{ fontFamily: FONT.mono, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.sage, marginBottom: '10px' }}>
        {prep.method}
      </p>
      <p style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.7 }}>
        {prep.instructions}
      </p>
      {(prep.dosage || prep.duration) && (
        <div style={{ display: 'flex', gap: '2rem', borderTop: `1px solid ${T.border}`, marginTop: '1rem', paddingTop: '1rem' }}>
          {prep.dosage && (
            <div>
              <p style={{ fontFamily: FONT.mono, fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, marginBottom: '4px' }}>Dosage</p>
              <p style={{ fontFamily: FONT.serif, fontSize: '0.9rem', color: T.ink }}>{prep.dosage}</p>
            </div>
          )}
          {prep.duration && (
            <div>
              <p style={{ fontFamily: FONT.mono, fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, marginBottom: '4px' }}>Duration</p>
              <p style={{ fontFamily: FONT.serif, fontSize: '0.9rem', color: T.ink }}>{prep.duration}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Source citation ──────────────────────────────────────────────────────────

function SourceCitation({ source }: { source: Source }) {
  const tierColors: Record<1 | 2 | 3, string> = { 1: T.forest, 2: T.moss, 3: T.warmGray }
  return (
    <div style={{ border: `1px solid ${T.border}`, background: T.parchment, padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: tierColors[source.tier], border: `1px solid ${tierColors[source.tier]}`, padding: '2px 7px' }}>
          Tier {source.tier}
        </span>
        <span style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, border: `1px solid ${T.border}`, padding: '2px 7px' }}>
          {source.type}
        </span>
      </div>
      <p style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.6 }}>{source.citation}</p>
      {source.author && (
        <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', color: T.warmGray, marginTop: '6px' }}>
          {source.author}{source.year ? `, ${source.year}` : ''}
        </p>
      )}
      {source.url && (
        <a href={source.url} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: FONT.mono, fontSize: '0.58rem', color: T.clay, display: 'block', marginTop: '4px', textDecoration: 'none' }}>
          {source.url}
        </a>
      )}
    </div>
  )
}

// ─── Combinations table ───────────────────────────────────────────────────────

function CombinationsTable({ combinations }: { combinations: Combination[] }) {
  if (combinations.length === 0) return (
    <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', color: T.warmGray, fontSize: '0.95rem' }}>
      No documented combinations yet.
    </p>
  )
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT.serif }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${T.border}` }}>
            {['Herbs', 'Protocol', 'Tradition', 'What Shifts', 'Life Stages'].map((h) => (
              <th key={h} style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.sage, padding: '8px 12px 8px 0', textAlign: 'left', fontWeight: 400 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {combinations.map((combo, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
              <td style={{ padding: '10px 12px 10px 0', verticalAlign: 'top' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {combo.herbSlugs.map((slug) => {
                    const h = herbs.find((x) => x.slug === slug)
                    return (
                      <Link key={slug} href={`/botica/${slug}`} style={{ fontFamily: FONT.serif, fontSize: '0.9rem', color: T.clay, textDecoration: 'none' }}>
                        {h?.name ?? slug}
                      </Link>
                    )
                  })}
                </div>
              </td>
              <td style={{ padding: '10px 12px 10px 0', fontFamily: FONT.serif, fontSize: '0.9rem', color: T.ink, verticalAlign: 'top' }}>
                {combo.protocolName}
              </td>
              <td style={{ padding: '10px 12px 10px 0', fontFamily: FONT.mono, fontSize: '0.6rem', color: T.warmGray, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                {combo.tradition}
              </td>
              <td style={{ padding: '10px 12px 10px 0', fontFamily: FONT.serif, fontSize: '0.9rem', color: T.ink, verticalAlign: 'top' }}>
                {combo.whatShifts}
              </td>
              <td style={{ padding: '10px 0 10px 0', verticalAlign: 'top' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {combo.lifeStages.map((stage) => (
                    <span key={stage} style={{ fontFamily: FONT.mono, fontSize: '0.52rem', color: T.warmGray, border: `1px solid ${T.border}`, padding: '1px 5px' }}>
                      {stage}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Right column section label ───────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '16px' }}>
      {children}
    </p>
  )
}

function SectionDivider() {
  return <div style={{ borderTop: `1px solid ${T.border}`, margin: '40px 0' }} />
}

// ─── Section animation wrapper ────────────────────────────────────────────────

function Section({ i, children, id }: { i: number; children: React.ReactNode; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HerbEntryClient({ herb }: { herb: HerbEntry }) {
  const [showDeeper, setShowDeeper] = useState(false)

  const quickPrep = herb.preparations[0]
    ? `${herb.preparations[0].method}: ${herb.preparations[0].instructions}`
    : null

  const hasPreventionOrRoot = herb.preventionNotes.trim() || herb.rootCauseNotes.trim()
  const hasSafety = herb.contraindications.length > 0 || herb.drugInteractions.length > 0 || herb.pregnancyNotes.trim()
  const hasDeeper = hasSafety || herb.preparations.length > 0 || herb.practitionerNotes.trim() || herb.symptomReliefNotes.trim()

  return (
    <article style={{ minHeight: '100vh', background: T.cream }}>

      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem 0', borderBottom: `1px solid ${T.border}` }}>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, paddingBottom: '1rem' }}>
          <Link href="/botica" style={{ color: T.warmGray, textDecoration: 'none' }} className="hover:text-forest">
            Botica
          </Link>
          {' / '}
          <span style={{ color: T.forest }}>{herb.name}</span>
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 4rem' }}
           className="md:flex md:gap-16 md:items-start">

        {/* ─── LEFT COLUMN ─── */}
        <div className="md:w-[35%]"
             style={{ paddingTop: '2.5rem' }}
             // sticky via className on the inner wrapper
        >
          <div className="md:sticky"
               style={{ top: '80px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: '4px' }}>

            {/* Botanical illustration */}
            <div style={{ width: '180px', margin: '0 auto 1.75rem' }}>
              <BotanicalIllustration slug={herb.slug} />
            </div>

            {/* Name block */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: FONT.serif, fontSize: '1.8rem', fontWeight: 400, color: T.forest, lineHeight: 1.15, marginBottom: '4px' }}>
                {herb.name}
              </h2>
              {herb.alternateNames.length > 0 && (
                <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', color: T.warmGray, letterSpacing: '0.1em', marginBottom: '6px' }}>
                  {herb.alternateNames.join(' · ')}
                </p>
              )}
              <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', color: T.clay, fontSize: '1rem' }}>
                {herb.botanicalName}
              </p>
            </div>

            {/* Verification badge */}
            <div style={{ marginBottom: '1.75rem' }}>
              <VerificationBadge tier={herb.verificationTier} />
            </div>

            {/* Five-axis */}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '1.5rem', marginBottom: '1.75rem' }}>
              <FiveAxisDisplay herb={herb} combinationsCount={herb.knownCombinations.length} />
            </div>

            {/* Quick prep */}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '1.5rem' }}>
              <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.sage, marginBottom: '8px' }}>
                Quick Preparation
              </p>
              <div style={{
                background: T.parchment, border: `1px solid ${T.border}`,
                padding: '12px 14px', borderRadius: 0,
              }}>
                <p style={{ fontFamily: FONT.serif, fontSize: '0.9rem', color: T.ink, lineHeight: 1.65 }}>
                  {quickPrep ?? 'Traditional preparation notes in development. Explore the full entry for guidance from classical sources.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="md:w-[65%]" style={{ paddingTop: '2.5rem' }}>

          {/* Entry header bar */}
          <Section i={0}>
            <div style={{ background: T.forest, padding: '1.5rem 1.75rem', marginBottom: 0 }}>
              <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${T.cream}80`, marginBottom: '8px' }}>
                {herb.domain} · {herb.region}
              </p>
              <h1 style={{ fontFamily: FONT.serif, fontSize: '2.2rem', fontWeight: 300, color: T.parchment, lineHeight: 1.1, marginBottom: '4px' }}>
                {herb.name}
              </h1>
              <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', color: `${T.parchment}80`, fontSize: '1.05rem' }}>
                {herb.botanicalName}
              </p>
              <p style={{ fontFamily: FONT.mono, fontSize: '0.55rem', color: `${T.cream}50`, marginTop: '12px', letterSpacing: '0.12em' }}>
                Last updated {herb.lastUpdated} · Contributed by {herb.contributedBy}
              </p>
            </div>
          </Section>

          <SectionDivider />

          {/* Tier 1 — What it is */}
          <Section i={1}>
            <SectionLabel>What it is</SectionLabel>
            <p style={{ fontFamily: FONT.serif, fontWeight: 300, fontSize: '1.05rem', color: T.ink, lineHeight: 1.85 }}>
              {herb.plainSummary}
            </p>
          </Section>

          {/* Prevention / Root Cause */}
          {hasPreventionOrRoot && (
            <>
              <SectionDivider />
              <Section i={2}>
                <SectionLabel>Applications</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {herb.preventionNotes.trim() && (
                    <Callout label="Prevention">
                      <p style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.7 }}>
                        {herb.preventionNotes}
                      </p>
                    </Callout>
                  )}
                  {herb.rootCauseNotes.trim() && (
                    <Callout label="Root Cause Treatment">
                      <p style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.7 }}>
                        {herb.rootCauseNotes}
                      </p>
                    </Callout>
                  )}
                </div>
              </Section>
            </>
          )}

          {/* Go Deeper toggle */}
          {hasDeeper && (
            <>
              <SectionDivider />
              <Section i={3}>
                <button
                  onClick={() => setShowDeeper((v) => !v)}
                  style={{
                    fontFamily: FONT.mono, fontSize: '0.62rem', letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: showDeeper ? T.parchment : T.clay,
                    background: showDeeper ? T.clay : 'transparent',
                    border: `1px solid ${T.clay}`, padding: '10px 20px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                    transition: 'all 0.2s ease', borderRadius: 0,
                  }}
                >
                  {showDeeper ? '← Close Practitioner Layer' : 'Go Deeper → Practitioner Layer'}
                </button>

                <AnimatePresence>
                  {showDeeper && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Practitioner notes */}
                        {herb.practitionerNotes.trim() && (
                          <div>
                            <SectionLabel>Practitioner Notes</SectionLabel>
                            <Callout>
                              <p style={{ fontFamily: FONT.serif, fontSize: '0.98rem', color: T.ink, lineHeight: 1.8 }}>
                                {herb.practitionerNotes}
                              </p>
                            </Callout>
                          </div>
                        )}

                        {/* Symptom relief */}
                        {herb.symptomReliefNotes.trim() && (
                          <div>
                            <SectionLabel>Symptom Relief Notes</SectionLabel>
                            <p style={{ fontFamily: FONT.serif, fontSize: '0.98rem', color: T.ink, lineHeight: 1.8 }}>
                              {herb.symptomReliefNotes}
                            </p>
                          </div>
                        )}

                        {/* Preparations */}
                        {herb.preparations.length > 0 && (
                          <div>
                            <SectionLabel>Preparation Variations</SectionLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {herb.preparations.map((prep, i) => (
                                <PreparationCard key={i} prep={prep} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contraindications */}
                        {herb.contraindications.length > 0 && (
                          <div>
                            <SectionLabel>Contraindications</SectionLabel>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
                              {herb.contraindications.map((item, i) => (
                                <li key={i} style={{ borderLeft: `3px solid ${T.sienna}`, paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', background: 'rgba(122,53,32,0.04)', fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.65 }}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Drug interactions */}
                        {herb.drugInteractions.length > 0 && (
                          <div>
                            <SectionLabel>Drug Interactions</SectionLabel>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
                              {herb.drugInteractions.map((item, i) => (
                                <li key={i} style={{ borderLeft: `3px solid ${T.ochre}`, paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', background: 'rgba(200,150,62,0.04)', fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.65 }}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Pregnancy notes */}
                        {herb.pregnancyNotes.trim() && (
                          <div>
                            <SectionLabel>Pregnancy &amp; Lactation</SectionLabel>
                            <Callout>
                              <p style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.7 }}>
                                {herb.pregnancyNotes}
                              </p>
                            </Callout>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Section>
            </>
          )}

          {/* Classical Sources — always visible */}
          <SectionDivider />
          <Section i={4}>
            <SectionLabel>Classical Sources</SectionLabel>
            {herb.sources.length === 0 ? (
              <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', color: T.warmGray, fontSize: '0.95rem' }}>
                Sources being verified and attributed.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {herb.sources.map((source, i) => (
                  <SourceCitation key={i} source={source} />
                ))}
              </div>
            )}
          </Section>

          {/* Combinations */}
          <SectionDivider />
          <Section i={5} id="combinations">
            <SectionLabel>Known Combinations</SectionLabel>
            <CombinationsTable combinations={herb.knownCombinations} />
          </Section>

          {/* Cross-links */}
          {(herb.relatedHerbs.length > 0 || herb.relatedPractices.length > 0) && (
            <>
              <SectionDivider />
              <Section i={6}>
                <SectionLabel>Related in the Archive</SectionLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {herb.relatedHerbs.map((slug) => {
                    const related = herbs.find((h) => h.slug === slug)
                    return (
                      <Link key={slug} href={`/botica/${slug}`} style={{
                        fontFamily: FONT.serif, fontSize: '0.95rem', color: T.forest,
                        border: `1px solid ${T.border}`, padding: '6px 14px',
                        background: T.parchment, textDecoration: 'none', display: 'inline-block',
                        transition: 'border-color 0.2s',
                      }}>
                        {related?.name ?? slug} →
                      </Link>
                    )
                  })}
                  {herb.relatedPractices.map((slug) => (
                    <Link key={slug} href={`/practices/${slug}`} style={{
                      fontFamily: FONT.serif, fontSize: '0.95rem', color: T.moss,
                      border: `1px solid ${T.border}`, padding: '6px 14px',
                      background: T.parchment, textDecoration: 'none', display: 'inline-block',
                    }}>
                      {slug} →
                    </Link>
                  ))}
                </div>
              </Section>
            </>
          )}

        </div>
      </div>
    </article>
  )
}
