'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  forest:    '#2c3d26',
  moss:      '#3d5235',
  sage:      '#7a8c6e',
  fern:      '#5a7a4a',
  clay:      '#b5694f',
  ochre:     '#c9a030',
  cream:     '#faf6ec',
  parchment: '#f2ead8',
  border:    '#d8cebc',
  warmGray:  '#8a8070',
  ink:       '#1a1810',
}

const FONT = {
  serif: `var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)`,
  mono:  `var(--font-dm-mono, 'DM Mono', monospace)`,
  libre: `var(--font-libre, 'Libre Baskerville', Georgia, serif)`,
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRADITIONS = [
  { id: 'ayurveda',                 name: 'Ayurveda' },
  { id: 'tcm',                      name: 'Traditional Chinese Medicine' },
  { id: 'western-herbalism',        name: 'Western Herbalism' },
  { id: 'curanderismo',             name: 'Curanderismo' },
  { id: 'indigenous-north-american',name: 'Indigenous North American' },
  { id: 'west-african',             name: 'West African' },
  { id: 'amazonian',                name: 'Amazonian' },
  { id: 'andean',                   name: 'Andean' },
  { id: 'caribbean',                name: 'Caribbean' },
  { id: 'appalachian',              name: 'Appalachian' },
  { id: 'integrative',              name: 'Integrative / Modern' },
  { id: 'other',                    name: 'Other / Not listed' },
]

const SOURCE_TYPES = [
  { value: 'oral-tradition',       label: 'Oral tradition — passed down through people' },
  { value: 'family-transmission',  label: 'Family or community transmission' },
  { value: 'classical-text',       label: 'Classical text' },
  { value: 'practitioner-training',label: 'Practitioner training' },
  { value: 'published-research',   label: 'Published research' },
  { value: 'personal-practice',    label: 'Personal practice' },
]

const REVIEW_TIMEFRAMES: Record<string, string> = {
  'ayurveda':                  '3–4 weeks',
  'tcm':                       '3–4 weeks',
  'western-herbalism':         '2–3 weeks',
  'curanderismo':              '4–6 weeks',
  'indigenous-north-american': '6–8 weeks',
  'west-african':              '4–6 weeks',
  'amazonian':                 '4–6 weeks',
  'andean':                    '4–6 weeks',
  'caribbean':                 '4–6 weeks',
  'appalachian':               '2–3 weeks',
  'integrative':               '2–3 weeks',
  'other':                     '3–5 weeks',
}

// ─── Shared form field styling ────────────────────────────────────────────────

const fieldBase: React.CSSProperties = {
  width: '100%', fontFamily: FONT.serif, fontSize: '1rem', color: T.ink,
  background: T.parchment, border: `1px solid ${T.border}`,
  padding: '0.875rem 1rem', outline: 'none', borderRadius: 0,
  boxSizing: 'border-box', transition: 'border-color 0.2s',
}

const focusOn  = (e: React.FocusEvent<HTMLElement>) => ((e.target as HTMLElement).style.borderColor = T.forest)
const focusOff = (e: React.FocusEvent<HTMLElement>) => ((e.target as HTMLElement).style.borderColor = T.border)

// ─── Small primitives ─────────────────────────────────────────────────────────

function RequiredDot() {
  return (
    <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: T.clay, marginLeft: '6px', verticalAlign: 'middle', marginBottom: '2px' }} />
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p style={{ fontFamily: FONT.libre, fontStyle: 'italic', color: T.clay, fontSize: '0.875rem', marginTop: '5px' }}>
      {message}
    </p>
  )
}

function FieldLabel({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'block', fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.sage, marginBottom: '7px' }}>
      {children}{required && <RequiredDot />}
    </label>
  )
}

function Helper({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.88rem', color: T.warmGray, marginTop: '4px' }}>
      {children}
    </p>
  )
}

function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.75rem', paddingBottom: '0.875rem', borderBottom: `1px solid ${T.border}` }}>
        <span style={{ fontFamily: FONT.mono, fontSize: '0.56rem', color: T.warmGray, letterSpacing: '0.14em' }}>{number}</span>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.forest }}>
          {title}
        </p>
      </div>
      {children}
    </div>
  )
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: '1.5rem' }}>{children}</div>
}

// ─── Tag input ────────────────────────────────────────────────────────────────

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      if (!tags.includes(input.trim())) onChange([...tags, input.trim()])
      setInput('')
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) onChange(tags.slice(0, -1))
  }

  return (
    <div
      style={{ ...fieldBase, display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', minHeight: '50px', padding: '0.5rem 0.875rem', cursor: 'text' }}
      onClick={(e) => (e.currentTarget.querySelector('input') as HTMLInputElement | null)?.focus()}
    >
      {tags.map((tag) => (
        <span key={tag} style={{ fontFamily: FONT.serif, fontSize: '0.9rem', color: T.ink, background: `${T.border}80`, padding: '2px 8px 2px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          {tag}
          <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.warmGray, fontSize: '0.75rem', lineHeight: 1, padding: 0 }}>×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? 'Type a name and press Enter' : ''}
        style={{ flex: 1, minWidth: '140px', border: 'none', background: 'transparent', outline: 'none', fontFamily: FONT.serif, fontSize: '1rem', color: T.ink, padding: '3px 0' }}
      />
    </div>
  )
}

// ─── Source type chips ────────────────────────────────────────────────────────

function SourceTypeChips({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {SOURCE_TYPES.map((st) => {
        const selected = value === st.value
        return (
          <button
            key={st.value}
            type="button"
            onClick={() => onChange(selected ? '' : st.value)}
            style={{
              fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '6px 12px', borderRadius: 0,
              border: `1px solid ${selected ? T.forest : T.border}`,
              background: selected ? T.forest : 'transparent',
              color: selected ? T.parchment : T.warmGray,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {st.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── File upload zone ─────────────────────────────────────────────────────────

function UploadZone({ accept, label, file, onChange }: { accept: string; label: string; file: File | null; onChange: (f: File | null) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <div
        onClick={() => ref.current?.click()}
        style={{
          border: `1px dashed ${T.border}`, padding: '2.5rem 1.5rem',
          textAlign: 'center', background: T.parchment, cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.forest)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
      >
        <input ref={ref} type="file" accept={accept} style={{ display: 'none' }} onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
        {file ? (
          <>
            <p style={{ fontFamily: FONT.serif, fontSize: '1rem', color: T.forest, marginBottom: '4px' }}>{file.name}</p>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', color: T.warmGray, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Click to replace</p>
          </>
        ) : (
          <>
            <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.1rem', color: T.warmGray, marginBottom: '6px' }}>{label}</p>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.54rem', color: T.warmGray, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Click to browse</p>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function PermissionCheck({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '18px', height: '18px', border: `1px solid ${checked ? T.forest : T.border}`,
          background: checked ? T.forest : T.parchment, flexShrink: 0, marginTop: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s', cursor: 'pointer',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke={T.parchment} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.65 }}>
        {children}
        <RequiredDot />
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ display: 'none' }} />
    </label>
  )
}

// ─── Submit button ────────────────────────────────────────────────────────────

function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={submitting}
      whileTap={{ scale: 0.99 }}
      animate={submitting ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
      transition={submitting ? { repeat: Infinity, duration: 1.1, ease: 'easeInOut' } : { duration: 0.15 }}
      style={{
        width: '100%', fontFamily: FONT.mono, fontSize: '0.62rem', letterSpacing: '0.2em',
        textTransform: 'uppercase', background: submitting ? T.sage : T.forest,
        color: T.parchment, border: 'none', padding: '1.25rem 2rem',
        cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s', borderRadius: 0,
        textAlign: 'center' as const,
      }}
    >
      {submitting ? 'Submitting…' : 'Submit to the Archive →'}
    </motion.button>
  )
}

// ─── Type selection icons ─────────────────────────────────────────────────────

function HerbTypeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 36 48" width="36" height="48" fill="none">
      <path d="M18 44 Q17.5 32 18 20 Q18.5 10 18 4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M18 28 Q10 24 7 15 Q13 18 18 28Z" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M18 28 Q26 24 29 15 Q23 18 18 28Z" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M18 16 Q12 13 10 5 Q15 8 18 16Z" stroke={color} strokeWidth="0.8" fill="none"/>
      <path d="M18 16 Q24 13 26 5 Q21 8 18 16Z" stroke={color} strokeWidth="0.8" fill="none"/>
    </svg>
  )
}

function PracticeTypeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
      <path d="M20 20 Q20 14 26 14 Q32 14 32 20 Q32 29 20 29 Q8 29 8 20 Q8 9 20 9 Q24 9 24 12" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="2" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="20" y1="18" x2="20" y2="9" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  )
}

function ElderVoiceTypeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 36 44" width="36" height="44" fill="none">
      <path d="M18 6 Q12 6 12 14 L12 22 Q12 30 18 30 Q24 30 24 22 L24 14 Q24 6 18 6Z" stroke={color} strokeWidth="1.2" fill="none"/>
      <path d="M8 20 Q8 32 18 32 Q28 32 28 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <line x1="18" y1="32" x2="18" y2="40" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="40" x2="24" y2="40" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Entry type cards ─────────────────────────────────────────────────────────

const ENTRY_TYPES = [
  {
    id: 'herb',
    label: 'An herb or plant',
    description: 'A medicinal plant, root, bark, flower, or fungi with wellness application.',
    Icon: HerbTypeIcon,
  },
  {
    id: 'practice',
    label: 'A practice or ritual',
    description: 'A movement, ceremony, preparation method, or body practice from a living tradition.',
    Icon: PracticeTypeIcon,
  },
  {
    id: 'elder',
    label: "An elder's voice",
    description: 'A recording, transcript, or testimony from a tradition keeper or community elder.',
    Icon: ElderVoiceTypeIcon,
  },
]

function TypeCard({ type, selected, onSelect }: { type: typeof ENTRY_TYPES[0]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        flex: 1, minWidth: '220px', padding: '2rem 1.5rem', textAlign: 'left',
        border: `1px solid ${selected ? T.forest : T.border}`,
        background: selected ? T.forest : T.parchment,
        cursor: 'pointer', transition: 'all 0.2s', borderRadius: 0,
        borderLeft: `3px solid ${selected ? T.clay : T.border}`,
      }}
      onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = T.forest; e.currentTarget.style.transform = 'translateY(-2px)' }}}
      onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'translateY(0)' }}}
    >
      <div style={{ marginBottom: '1rem', color: selected ? T.clay : T.sage }}>
        <type.Icon color={selected ? T.clay : T.sage} />
      </div>
      <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.3rem', color: selected ? T.parchment : T.forest, marginBottom: '8px', lineHeight: 1.2 }}>
        {type.label}
      </p>
      <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.1em', color: selected ? `${T.cream}70` : T.warmGray, lineHeight: 1.55 }}>
        {type.description}
      </p>
    </button>
  )
}

// ─── Compact type selector row (shown after selection) ───────────────────────

function CompactTypeSelector({ type, onReset }: { type: typeof ENTRY_TYPES[0]; onReset: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.25rem', background: T.forest, marginBottom: '2.5rem' }}>
      <div style={{ opacity: 0.75 }}>
        <type.Icon color={T.clay} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: FONT.mono, fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: `${T.cream}60`, marginBottom: '3px' }}>
          Contributing
        </p>
        <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '1.05rem', color: T.parchment, lineHeight: 1.2 }}>
          {type.label}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        style={{
          fontFamily: FONT.mono, fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: `${T.cream}60`, background: 'none', border: `1px solid ${T.cream}25`,
          padding: '5px 11px', cursor: 'pointer', borderRadius: 0, flexShrink: 0, transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = T.cream; e.currentTarget.style.borderColor = `${T.cream}60` }}
        onMouseLeave={(e) => { e.currentTarget.style.color = `${T.cream}60`; e.currentTarget.style.borderColor = `${T.cream}25` }}
      >
        × Change
      </button>
    </div>
  )
}

// ─── Sidebar: what happens next ───────────────────────────────────────────────

function WhatHappensNext() {
  const steps = [
    { n: '01', text: 'Your submission is logged and timestamped in the archive queue.' },
    { n: '02', text: 'A tradition council reviewer is notified.' },
    { n: '03', text: 'You receive an email acknowledgement within 48 hours.' },
    { n: '04', text: 'Review takes 2–8 weeks depending on the tradition.' },
    { n: '05', text: 'You are contacted if the council has questions or needs clarification.' },
    { n: '06', text: 'When published, your attribution appears exactly as you chose to share it.' },
  ]
  return (
    <div style={{ background: T.parchment, border: `1px solid ${T.border}`, padding: '1.5rem' }}>
      <p style={{ fontFamily: FONT.mono, fontSize: '0.54rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.sage, marginBottom: '1.25rem', paddingBottom: '0.875rem', borderBottom: `1px solid ${T.border}` }}>
        What happens next
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {steps.map((step) => (
          <div key={step.n} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: FONT.mono, fontSize: '0.5rem', letterSpacing: '0.1em', color: T.border, flexShrink: 0, marginTop: '4px' }}>
              {step.n}
            </span>
            <p style={{ fontFamily: FONT.serif, fontSize: '0.88rem', color: T.ink, lineHeight: 1.7 }}>
              {step.text}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${T.border}` }}>
        <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.84rem', color: T.warmGray, lineHeight: 1.7 }}>
          This archive is tended with care. Nothing is rushed.
        </p>
      </div>
    </div>
  )
}

// ─── Shared source + submitter sections ───────────────────────────────────────

function SourceSection({
  teacher, setTeacher,
  community, setCommunity,
  sourceType, setSourceType,
  citation, setCitation,
  hasPermission, setHasPermission,
  permissionText,
  errors,
}: {
  teacher: string; setTeacher: (v: string) => void
  community: string; setCommunity: (v: string) => void
  sourceType: string; setSourceType: (v: string) => void
  citation: string; setCitation: (v: string) => void
  hasPermission: boolean; setHasPermission: (v: boolean) => void
  permissionText: string
  errors: Record<string, string>
}) {
  return (
    <FormSection number="III" title="Where You Learned This">
      <FieldRow>
        <FieldLabel htmlFor="teacher" required>Who taught you, or where did you encounter this?</FieldLabel>
        <input id="teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} onFocus={focusOn} onBlur={focusOff}
          placeholder="e.g. My grandmother, from Oaxaca" style={{ ...fieldBase }} />
        <Helper>Can be a person, a text, a community, or a place. Specificity is welcomed.</Helper>
        {errors.teacher && <FieldError message={errors.teacher} />}
      </FieldRow>
      <FieldRow>
        <FieldLabel htmlFor="community">From which community or lineage?</FieldLabel>
        <input id="community" value={community} onChange={(e) => setCommunity(e.target.value)} onFocus={focusOn} onBlur={focusOff}
          placeholder="e.g. Zapotec community, Oaxaca" style={{ ...fieldBase }} />
      </FieldRow>
      <FieldRow>
        <FieldLabel required>Source type</FieldLabel>
        <SourceTypeChips value={sourceType} onChange={setSourceType} />
        {errors.sourceType && <FieldError message={errors.sourceType} />}
      </FieldRow>
      {sourceType === 'classical-text' || sourceType === 'published-research' ? (
        <FieldRow>
          <FieldLabel htmlFor="citation">Citation</FieldLabel>
          <input id="citation" value={citation} onChange={(e) => setCitation(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Author, title, year, or DOI" style={{ ...fieldBase }} />
        </FieldRow>
      ) : null}
      <FieldRow>
        <PermissionCheck checked={hasPermission} onChange={setHasPermission}>
          {permissionText}
        </PermissionCheck>
        {errors.hasPermission && <FieldError message={errors.hasPermission} />}
      </FieldRow>
    </FormSection>
  )
}

function SubmitterSection({
  name, setName,
  credentials, setCredentials,
  email, setEmail,
  errors,
}: {
  name: string; setName: (v: string) => void
  credentials: string; setCredentials: (v: string) => void
  email: string; setEmail: (v: string) => void
  errors: Record<string, string>
}) {
  return (
    <FormSection number="IV" title="About You">
      <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.95rem', color: T.warmGray, marginBottom: '1.5rem', lineHeight: 1.7 }}>
        All fields in this section are optional. Attribution will appear exactly as you choose to share it.
      </p>
      <FieldRow>
        <FieldLabel htmlFor="sub-name">Your name</FieldLabel>
        <input id="sub-name" value={name} onChange={(e) => setName(e.target.value)} onFocus={focusOn} onBlur={focusOff}
          placeholder="As you'd like it to appear in the archive" style={{ ...fieldBase }} />
      </FieldRow>
      <FieldRow>
        <FieldLabel htmlFor="sub-credentials">Credentials or background</FieldLabel>
        <input id="sub-credentials" value={credentials} onChange={(e) => setCredentials(e.target.value)} onFocus={focusOn} onBlur={focusOff}
          placeholder="e.g. Herbalist, 20 years practice; or: Community member, not a practitioner" style={{ ...fieldBase }} />
      </FieldRow>
      <FieldRow>
        <FieldLabel htmlFor="sub-email" required>Email address</FieldLabel>
        <input id="sub-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={focusOn} onBlur={focusOff}
          placeholder="For review correspondence only — not published" style={{ ...fieldBase }} />
        <Helper>We will contact you if the review council has questions. Your email will never appear in the archive.</Helper>
        {errors.email && <FieldError message={errors.email} />}
      </FieldRow>
    </FormSection>
  )
}

// ─── Herb submission form ─────────────────────────────────────────────────────

function HerbForm({ onSubmit }: { onSubmit: (tradition: string) => void }) {
  const [commonName, setCommonName]         = useState('')
  const [botanicalName, setBotanicalName]   = useState('')
  const [alternateNames, setAlternateNames] = useState<string[]>([])
  const [tradition, setTradition]           = useState('')
  const [otherTradition, setOtherTradition] = useState('')
  const [region, setRegion]                 = useState('')
  const [plainSummary, setPlainSummary]     = useState('')
  const [prevention, setPrevention]         = useState('')
  const [preparation, setPreparation]       = useState('')
  const [contraindications, setContraindications] = useState('')
  const [teacher, setTeacher]               = useState('')
  const [community, setCommunity]           = useState('')
  const [sourceType, setSourceType]         = useState('')
  const [citation, setCitation]             = useState('')
  const [hasPermission, setHasPermission]   = useState(false)
  const [name, setName]                     = useState('')
  const [credentials, setCredentials]       = useState('')
  const [email, setEmail]                   = useState('')
  const [errors, setErrors]                 = useState<Record<string, string>>({})
  const [submitting, setSubmitting]         = useState(false)

  const validate = useCallback(() => {
    const e: Record<string, string> = {}
    if (!commonName.trim())        e.commonName       = 'Common name is required.'
    if (!plainSummary.trim())      e.plainSummary     = 'Please describe this herb.'
    if (!contraindications.trim()) e.contraindications= 'Safety notes are required, even if the herb is generally considered safe.'
    if (!teacher.trim())           e.teacher          = 'Tell us where this knowledge comes from.'
    if (!sourceType)               e.sourceType       = 'Please select a source type.'
    if (!hasPermission)            e.hasPermission    = 'You must confirm you have the right to share this knowledge.'
    if (!email.trim())             e.email            = 'An email address is required for review correspondence.'
    return e
  }, [commonName, plainSummary, contraindications, teacher, sourceType, hasPermission, email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    const t = TRADITIONS.find((t) => t.id === tradition)
    onSubmit(t?.name ?? 'the community')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormSection number="I" title="Identity">
        <FieldRow>
          <FieldLabel htmlFor="common-name" required>Common name</FieldLabel>
          <input id="common-name" value={commonName} onChange={(e) => setCommonName(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="The name you or your community uses" style={{ ...fieldBase }} />
          {errors.commonName && <FieldError message={errors.commonName} />}
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="botanical-name">Botanical name</FieldLabel>
          <input id="botanical-name" value={botanicalName} onChange={(e) => setBotanicalName(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Genus species" style={{ ...fieldBase, fontStyle: 'italic' }} />
          <Helper>If unknown, describe the plant as you know it — leaf shape, smell, color, season.</Helper>
        </FieldRow>
        <FieldRow>
          <FieldLabel>Names in other languages or traditions</FieldLabel>
          <TagInput tags={alternateNames} onChange={setAlternateNames} />
          <Helper>Type a name and press Enter. Add as many as you know.</Helper>
        </FieldRow>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldRow>
            <FieldLabel htmlFor="tradition">Tradition of origin</FieldLabel>
            <div style={{ position: 'relative' }}>
              <select id="tradition" value={tradition} onChange={(e) => setTradition(e.target.value)}
                onFocus={focusOn} onBlur={focusOff}
                style={{ ...fieldBase, appearance: 'none', cursor: 'pointer', paddingRight: '2.5rem' }}>
                <option value="">Select a tradition</option>
                {TRADITIONS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: T.warmGray, fontSize: '0.7rem' }}>▾</span>
            </div>
          </FieldRow>
          <FieldRow>
            <FieldLabel htmlFor="region">Region</FieldLabel>
            <input id="region" value={region} onChange={(e) => setRegion(e.target.value)} onFocus={focusOn} onBlur={focusOff}
              placeholder="e.g. Southern India, Appalachian Mountains" style={{ ...fieldBase }} />
          </FieldRow>
        </div>
        <AnimatePresence>
          {tradition === 'other' && (
            <motion.div
              key="other-tradition"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.22 }}
            >
              <FieldRow>
                <FieldLabel htmlFor="other-tradition-text">Describe the tradition</FieldLabel>
                <input
                  id="other-tradition-text"
                  value={otherTradition}
                  onChange={(e) => setOtherTradition(e.target.value)}
                  onFocus={focusOn}
                  onBlur={focusOff}
                  placeholder="Name and briefly describe the tradition of origin"
                  style={{ ...fieldBase }}
                />
              </FieldRow>
            </motion.div>
          )}
        </AnimatePresence>
      </FormSection>

      <FormSection number="II" title="Your Knowledge">
        <FieldRow>
          <FieldLabel htmlFor="summary" required>What is this herb? Describe it plainly.</FieldLabel>
          <textarea id="summary" value={plainSummary} onChange={(e) => setPlainSummary(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Describe it as you would to someone who has never heard of it. What does it do? What does it smell like? When do people use it?"
            style={{ ...fieldBase, minHeight: '140px', resize: 'vertical', lineHeight: 1.75 }} />
          {errors.plainSummary && <FieldError message={errors.plainSummary} />}
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="prevention">What does it prevent or address at the root?</FieldLabel>
          <textarea id="prevention" value={prevention} onChange={(e) => setPrevention(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Long-term uses, underlying imbalances it addresses, what it builds or protects over time"
            style={{ ...fieldBase, minHeight: '100px', resize: 'vertical', lineHeight: 1.75 }} />
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="preparation">How is it prepared?</FieldLabel>
          <textarea id="preparation" value={preparation} onChange={(e) => setPreparation(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Tea, decoction, tincture, food, poultice — describe how your tradition prepares and uses it, including dosage if you know it"
            style={{ ...fieldBase, minHeight: '110px', resize: 'vertical', lineHeight: 1.75 }} />
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="contraindications" required>When should it NOT be used?</FieldLabel>
          <textarea id="contraindications" value={contraindications} onChange={(e) => setContraindications(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Contraindications, cautions, drug interactions, populations to avoid — even if you believe it is generally safe, please note that here"
            style={{ ...fieldBase, minHeight: '110px', resize: 'vertical', lineHeight: 1.75, borderColor: errors.contraindications ? T.clay : T.border }} />
          <Helper>This field is required. Safety information protects the knowledge and the community. If you know of no cautions, say so explicitly.</Helper>
          {errors.contraindications && <FieldError message={errors.contraindications} />}
        </FieldRow>
      </FormSection>

      <SourceSection
        teacher={teacher} setTeacher={setTeacher}
        community={community} setCommunity={setCommunity}
        sourceType={sourceType} setSourceType={setSourceType}
        citation={citation} setCitation={setCitation}
        hasPermission={hasPermission} setHasPermission={setHasPermission}
        permissionText="I have the right to share this knowledge and I am not sharing anything ceremonially restricted, tradition-withheld, or that I do not have permission to share."
        errors={errors}
      />

      <SubmitterSection name={name} setName={setName} credentials={credentials} setCredentials={setCredentials} email={email} setEmail={setEmail} errors={errors} />

      <div style={{ paddingTop: '1rem' }}>
        <SubmitButton submitting={submitting} />
      </div>
    </form>
  )
}

// ─── Practice submission form ─────────────────────────────────────────────────

function PracticeForm({ onSubmit }: { onSubmit: (tradition: string) => void }) {
  const [practiceName, setPracticeName]   = useState('')
  const [altNames, setAltNames]           = useState<string[]>([])
  const [tradition, setTradition]         = useState('')
  const [region, setRegion]               = useState('')
  const [description, setDescription]     = useState('')
  const [addresses, setAddresses]         = useState('')
  const [howPerformed, setHowPerformed]   = useState('')
  const [contraindications, setContraindications] = useState('')
  const [teacher, setTeacher]             = useState('')
  const [community, setCommunity]         = useState('')
  const [sourceType, setSourceType]       = useState('')
  const [citation, setCitation]           = useState('')
  const [hasPermission, setHasPermission] = useState(false)
  const [name, setName]                   = useState('')
  const [credentials, setCredentials]     = useState('')
  const [email, setEmail]                 = useState('')
  const [errors, setErrors]               = useState<Record<string, string>>({})
  const [submitting, setSubmitting]       = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!practiceName.trim()) errs.practiceName = 'Practice name is required.'
    if (!description.trim())  errs.description  = 'Please describe this practice.'
    if (!contraindications.trim()) errs.contraindications = 'Safety notes are required.'
    if (!teacher.trim())      errs.teacher       = 'Please tell us where this knowledge comes from.'
    if (!sourceType)          errs.sourceType    = 'Please select a source type.'
    if (!hasPermission)       errs.hasPermission = 'You must confirm you have the right to share this knowledge.'
    if (!email.trim())        errs.email         = 'An email is required for correspondence.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    const t = TRADITIONS.find((t) => t.id === tradition)
    onSubmit(t?.name ?? 'the community')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormSection number="I" title="Identity">
        <FieldRow>
          <FieldLabel htmlFor="practice-name" required>Name of the practice</FieldLabel>
          <input id="practice-name" value={practiceName} onChange={(e) => setPracticeName(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="The name used in its tradition of origin" style={{ ...fieldBase }} />
          {errors.practiceName && <FieldError message={errors.practiceName} />}
        </FieldRow>
        <FieldRow>
          <FieldLabel>Names in other languages or traditions</FieldLabel>
          <TagInput tags={altNames} onChange={setAltNames} />
        </FieldRow>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldRow>
            <FieldLabel htmlFor="prac-tradition">Tradition of origin</FieldLabel>
            <div style={{ position: 'relative' }}>
              <select id="prac-tradition" value={tradition} onChange={(e) => setTradition(e.target.value)} onFocus={focusOn} onBlur={focusOff}
                style={{ ...fieldBase, appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}>
                <option value="">Select a tradition</option>
                {TRADITIONS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: T.warmGray, fontSize: '0.7rem' }}>▾</span>
            </div>
          </FieldRow>
          <FieldRow>
            <FieldLabel htmlFor="prac-region">Region</FieldLabel>
            <input id="prac-region" value={region} onChange={(e) => setRegion(e.target.value)} onFocus={focusOn} onBlur={focusOff}
              placeholder="Geographic or cultural origin" style={{ ...fieldBase }} />
          </FieldRow>
        </div>
      </FormSection>

      <FormSection number="II" title="Your Knowledge">
        <FieldRow>
          <FieldLabel htmlFor="prac-desc" required>What is this practice?</FieldLabel>
          <textarea id="prac-desc" value={description} onChange={(e) => setDescription(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Describe it as you would to someone encountering it for the first time. What is it? What does it involve? When is it done?"
            style={{ ...fieldBase, minHeight: '140px', resize: 'vertical', lineHeight: 1.75 }} />
          {errors.description && <FieldError message={errors.description} />}
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="prac-addresses">What does it address or support?</FieldLabel>
          <textarea id="prac-addresses" value={addresses} onChange={(e) => setAddresses(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Physical, emotional, spiritual, or community aspects this practice supports"
            style={{ ...fieldBase, minHeight: '100px', resize: 'vertical', lineHeight: 1.75 }} />
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="prac-how">How is it performed?</FieldLabel>
          <textarea id="prac-how" value={howPerformed} onChange={(e) => setHowPerformed(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Steps, materials, timing, setting, who facilitates it, whether it requires initiation or training"
            style={{ ...fieldBase, minHeight: '110px', resize: 'vertical', lineHeight: 1.75 }} />
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="prac-contra" required>Who should not do this?</FieldLabel>
          <textarea id="prac-contra" value={contraindications} onChange={(e) => setContraindications(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Conditions, life stages, situations, or contexts where this practice is cautioned or not appropriate"
            style={{ ...fieldBase, minHeight: '100px', resize: 'vertical', lineHeight: 1.75 }} />
          {errors.contraindications && <FieldError message={errors.contraindications} />}
        </FieldRow>
      </FormSection>

      <SourceSection
        teacher={teacher} setTeacher={setTeacher}
        community={community} setCommunity={setCommunity}
        sourceType={sourceType} setSourceType={setSourceType}
        citation={citation} setCitation={setCitation}
        hasPermission={hasPermission} setHasPermission={setHasPermission}
        permissionText="I have the right to share this practice and it is not ceremonially restricted, tradition-withheld, or otherwise protected from public sharing."
        errors={errors}
      />

      <SubmitterSection name={name} setName={setName} credentials={credentials} setCredentials={setCredentials} email={email} setEmail={setEmail} errors={errors} />

      <div style={{ paddingTop: '1rem' }}>
        <SubmitButton submitting={submitting} />
      </div>
    </form>
  )
}

// ─── Elder voice form ─────────────────────────────────────────────────────────

function ElderVoiceForm({ onSubmit }: { onSubmit: (tradition: string) => void }) {
  const [elderName, setElderName]           = useState('')
  const [elderTradition, setElderTradition] = useState('')
  const [tradition, setTradition]           = useState('')
  const [subject, setSubject]               = useState('')
  const [submissionType, setSubmissionType] = useState<'recording' | 'transcript' | 'recollection' | ''>('')
  const [audioFile, setAudioFile]           = useState<File | null>(null)
  const [transcript, setTranscript]         = useState('')
  const [context, setContext]               = useState('')
  const [hasElderPermission, setHasElderPermission] = useState(false)
  const [hasSharePermission, setHasSharePermission] = useState(false)
  const [name, setName]                     = useState('')
  const [credentials, setCredentials]       = useState('')
  const [email, setEmail]                   = useState('')
  const [errors, setErrors]                 = useState<Record<string, string>>({})
  const [submitting, setSubmitting]         = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!elderName.trim())    errs.elderName = 'The elder\'s name or designation is required.'
    if (!subject.trim())      errs.subject   = 'Please describe the subject of this knowledge.'
    if (!submissionType)      errs.submissionType = 'Please select a submission type.'
    if (submissionType === 'recording' && !audioFile && !transcript.trim())
      errs.transcript = 'Please provide a recording file or a written transcript.'
    if ((submissionType === 'transcript' || submissionType === 'recollection') && !transcript.trim())
      errs.transcript = 'This field is required.'
    if (!hasElderPermission)  errs.hasElderPermission = 'You must confirm the elder\'s permission.'
    if (!hasSharePermission)  errs.hasSharePermission = 'You must confirm this knowledge may be shared.'
    if (!email.trim())        errs.email     = 'An email is required for correspondence.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    const t = TRADITIONS.find((t) => t.id === tradition)
    onSubmit(t?.name ?? 'the community')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormSection number="I" title="About the Elder">
        <FieldRow>
          <FieldLabel htmlFor="elder-name" required>Name or designation of the elder</FieldLabel>
          <input id="elder-name" value={elderName} onChange={(e) => setElderName(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="How they should be credited — or 'Elder from [place], name withheld at their request'" style={{ ...fieldBase }} />
          {errors.elderName && <FieldError message={errors.elderName} />}
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="elder-tradition">Their tradition and lineage</FieldLabel>
          <input id="elder-tradition" value={elderTradition} onChange={(e) => setElderTradition(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="e.g. Yoruba traditional healer, Ogun State, Nigeria" style={{ ...fieldBase }} />
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="elder-archive-tradition">Tradition category for the archive</FieldLabel>
          <div style={{ position: 'relative' }}>
            <select id="elder-archive-tradition" value={tradition} onChange={(e) => setTradition(e.target.value)} onFocus={focusOn} onBlur={focusOff}
              style={{ ...fieldBase, appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}>
              <option value="">Select a tradition</option>
              {TRADITIONS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: T.warmGray, fontSize: '0.7rem' }}>▾</span>
          </div>
        </FieldRow>
        <FieldRow>
          <FieldLabel htmlFor="elder-subject" required>What knowledge is being shared?</FieldLabel>
          <textarea id="elder-subject" value={subject} onChange={(e) => setSubject(e.target.value)} onFocus={focusOn} onBlur={focusOff}
            placeholder="Briefly describe the subject — herb, practice, life stage, or teaching this voice speaks to"
            style={{ ...fieldBase, minHeight: '100px', resize: 'vertical', lineHeight: 1.75 }} />
          {errors.subject && <FieldError message={errors.subject} />}
        </FieldRow>
      </FormSection>

      <FormSection number="II" title="The Submission">
        <FieldRow>
          <FieldLabel required>What are you submitting?</FieldLabel>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {(['recording', 'transcript', 'recollection'] as const).map((opt) => {
              const labels: Record<string, string> = { recording: 'A recording', transcript: 'A transcript', recollection: 'A recollection' }
              const sel = submissionType === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSubmissionType(opt)}
                  style={{
                    fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase', padding: '7px 14px', borderRadius: 0,
                    border: `1px solid ${sel ? T.forest : T.border}`,
                    background: sel ? T.forest : 'transparent',
                    color: sel ? T.parchment : T.warmGray,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {labels[opt]}
                </button>
              )
            })}
          </div>
          {errors.submissionType && <FieldError message={errors.submissionType} />}
        </FieldRow>

        <AnimatePresence mode="wait">
          {submissionType === 'recording' && (
            <motion.div key="recording" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <FieldRow>
                <FieldLabel>Audio or video recording</FieldLabel>
                <UploadZone accept="audio/*,video/*" label="Upload a recording of the elder's voice" file={audioFile} onChange={setAudioFile} />
                <Helper>Accepted: MP3, WAV, MP4, MOV. Preferred: original, unedited.</Helper>
              </FieldRow>
              <FieldRow>
                <FieldLabel htmlFor="transcript-rec">Transcript (optional)</FieldLabel>
                <textarea id="transcript-rec" value={transcript} onChange={(e) => setTranscript(e.target.value)} onFocus={focusOn} onBlur={focusOff}
                  placeholder="If you have a written transcription of the recording, include it here"
                  style={{ ...fieldBase, minHeight: '140px', resize: 'vertical', lineHeight: 1.8 }} />
                {errors.transcript && <FieldError message={errors.transcript} />}
              </FieldRow>
              <FieldRow>
                <FieldLabel htmlFor="elder-context-rec">Context</FieldLabel>
                <textarea id="elder-context-rec" value={context} onChange={(e) => setContext(e.target.value)} onFocus={focusOn} onBlur={focusOff}
                  placeholder="When and where was this recorded? What were the circumstances? Any editorial notes?"
                  style={{ ...fieldBase, minHeight: '90px', resize: 'vertical', lineHeight: 1.75 }} />
              </FieldRow>
            </motion.div>
          )}

          {submissionType === 'transcript' && (
            <motion.div key="transcript" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <FieldRow>
                <FieldLabel htmlFor="transcript-text" required>Transcript</FieldLabel>
                <textarea id="transcript-text" value={transcript} onChange={(e) => setTranscript(e.target.value)} onFocus={focusOn} onBlur={focusOff}
                  placeholder="Full written transcript of the elder's knowledge. If translated, note the original language."
                  style={{ ...fieldBase, minHeight: '200px', resize: 'vertical', lineHeight: 1.8 }} />
                {errors.transcript && <FieldError message={errors.transcript} />}
              </FieldRow>
              <FieldRow>
                <FieldLabel htmlFor="elder-context-tr">Context</FieldLabel>
                <textarea id="elder-context-tr" value={context} onChange={(e) => setContext(e.target.value)} onFocus={focusOn} onBlur={focusOff}
                  placeholder="When and where was this recorded or written? Any editorial notes?"
                  style={{ ...fieldBase, minHeight: '90px', resize: 'vertical', lineHeight: 1.75 }} />
              </FieldRow>
            </motion.div>
          )}

          {submissionType === 'recollection' && (
            <motion.div key="recollection" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ background: T.parchment, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.warmGray}`, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <p style={{ fontFamily: FONT.mono, fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, marginBottom: '5px' }}>
                  Community Record designation
                </p>
                <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.88rem', color: T.warmGray, lineHeight: 1.7 }}>
                  Knowledge shared from memory or second-hand account will be published as a Community Record — attributed to its source, and noted as recollection rather than a direct recording or document.
                </p>
              </div>
              <FieldRow>
                <FieldLabel htmlFor="transcript-rec2" required>Write what you know</FieldLabel>
                <textarea id="transcript-rec2" value={transcript} onChange={(e) => setTranscript(e.target.value)} onFocus={focusOn} onBlur={focusOff}
                  placeholder="Write the knowledge as completely as you can. Include the elder's words if you can recall them, and note where you are paraphrasing."
                  style={{ ...fieldBase, minHeight: '200px', resize: 'vertical', lineHeight: 1.8 }} />
                {errors.transcript && <FieldError message={errors.transcript} />}
              </FieldRow>
              <FieldRow>
                <FieldLabel htmlFor="elder-context-rc">Context</FieldLabel>
                <textarea id="elder-context-rc" value={context} onChange={(e) => setContext(e.target.value)} onFocus={focusOn} onBlur={focusOff}
                  placeholder="When and from whom did you receive this knowledge? How long ago?"
                  style={{ ...fieldBase, minHeight: '90px', resize: 'vertical', lineHeight: 1.75 }} />
              </FieldRow>
            </motion.div>
          )}
        </AnimatePresence>
      </FormSection>

      <FormSection number="III" title="Permission">
        <FieldRow>
          <PermissionCheck checked={hasElderPermission} onChange={setHasElderPermission}>
            I have the explicit, informed permission of the elder whose voice or knowledge I am submitting. They know this will be archived and made accessible to others.
          </PermissionCheck>
          {errors.hasElderPermission && <FieldError message={errors.hasElderPermission} />}
        </FieldRow>
        <div style={{ marginTop: '1rem' }}>
          <PermissionCheck checked={hasSharePermission} onChange={setHasSharePermission}>
            This knowledge is not ceremonially restricted, tradition-withheld, or otherwise designated as non-public by the elder or their community.
          </PermissionCheck>
          {errors.hasSharePermission && <FieldError message={errors.hasSharePermission} />}
        </div>
      </FormSection>

      <SubmitterSection name={name} setName={setName} credentials={credentials} setCredentials={setCredentials} email={email} setEmail={setEmail} errors={errors} />

      <div style={{ paddingTop: '1rem' }}>
        <SubmitButton submitting={submitting} />
      </div>
    </form>
  )
}

// ─── Confirmation screen ──────────────────────────────────────────────────────

function ConfirmationScreen({ tradition, onReset }: { tradition: string; onReset: () => void }) {
  const timeframe = REVIEW_TIMEFRAMES[
    TRADITIONS.find((t) => t.name === tradition)?.id ?? 'other'
  ] ?? '3–5 weeks'

  return (
    <div style={{ minHeight: '100vh', background: T.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: '560px', width: '100%', background: T.parchment, border: `1px solid ${T.border}`, padding: '4rem 3rem', textAlign: 'center' }}
      >
        {/* Botanical mark */}
        <svg viewBox="0 0 40 56" width="32" height="45" fill="none" style={{ margin: '0 auto 2rem', display: 'block' }}>
          <path d="M20 52 Q19.5 38 20 24 Q20.5 12 20 5" stroke={T.sage} strokeWidth="1" strokeLinecap="round"/>
          <path d="M20 34 Q12 29 9 20 Q15 23 20 34Z" stroke={T.sage} strokeWidth="0.9" fill="none"/>
          <path d="M20 34 Q28 29 31 20 Q25 23 20 34Z" stroke={T.sage} strokeWidth="0.9" fill="none"/>
          <path d="M20 20 Q14 16 12 8 Q17 11 20 20Z" stroke={T.sage} strokeWidth="0.8" fill="none"/>
          <path d="M20 20 Q26 16 28 8 Q23 11 20 20Z" stroke={T.sage} strokeWidth="0.8" fill="none"/>
        </svg>

        <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: T.sage, marginBottom: '1.5rem' }}>
          Submission received
        </p>
        <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: T.forest, lineHeight: 1.65, marginBottom: '1rem' }}>
          Your submission has been received.
        </p>
        <p style={{ fontFamily: FONT.serif, fontSize: '1.05rem', color: T.ink, lineHeight: 1.8, marginBottom: '2.5rem' }}>
          It will be reviewed by the{' '}
          <span style={{ fontStyle: 'italic' }}>{tradition}</span>{' '}
          council and you will hear back within{' '}
          <span style={{ color: T.forest }}>{timeframe}</span>.
          Thank you for keeping this alive.
        </p>

        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={onReset}
            style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.clay, background: 'none', border: `1px solid ${T.clay}`, padding: '9px 20px', cursor: 'pointer', borderRadius: 0 }}
          >
            Submit another entry
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ContributePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [submitted, setSubmitted]       = useState(false)
  const [tradition, setTradition]       = useState('')

  const activeType = ENTRY_TYPES.find((t) => t.id === selectedType) ?? null

  const handleSubmit = (t: string) => {
    setTradition(t)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setSubmitted(false)
    setSelectedType(null)
    setTradition('')
  }

  if (submitted) return <ConfirmationScreen tradition={tradition} onReset={handleReset} />

  return (
    <div style={{ minHeight: '100vh', background: T.cream }}>

      {/* ── Forest header ── */}
      <div style={{ background: T.forest, padding: '4rem 1.5rem 3.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${T.cream}65`, marginBottom: '1rem' }}
          >
            Contribute to the archive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            style={{ fontFamily: FONT.serif, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: T.parchment, lineHeight: 1.1, letterSpacing: '-0.01em' }}
          >
            Add your knowledge to the living archive
          </motion.h1>
        </div>
      </div>

      {/* ── Intro ── */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
        >
          <p style={{ fontFamily: FONT.serif, fontWeight: 300, fontSize: '1.15rem', color: T.ink, lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '640px' }}>
            Legaseed is a living archive — and archives grow through the people who carry knowledge. If you have been taught something about a plant, a practice, or an elder&apos;s wisdom that does not yet live here, this is how you add it.
          </p>

          {/* Verification tiers */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '1.25rem' }}>
              How knowledge is verified
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { dot: T.warmGray, label: 'Community Record', text: 'Knowledge submitted from oral tradition, personal practice, or family lineage. Attributed to its source, published with a community record designation.' },
                { dot: T.ochre,    label: 'Verified',          text: 'Cross-referenced against classical texts, published literature, or corroborated by multiple practitioners from within the tradition.' },
                { dot: T.fern,     label: 'Tradition-Endorsed', text: 'Reviewed and confirmed by a recognized practitioner or tradition keeper from the culture of origin.' },
              ].map((tier) => (
                <div key={tier.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem 0', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tier.dot, flexShrink: 0, marginTop: '7px' }} />
                  <div>
                    <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: tier.dot, marginBottom: '5px' }}>
                      {tier.label}
                    </p>
                    <p style={{ fontFamily: FONT.serif, fontSize: '0.95rem', color: T.ink, lineHeight: 1.7 }}>
                      {tier.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.95rem', color: T.warmGray, marginTop: '1.25rem', lineHeight: 1.7 }}>
              All submissions receive attribution. Your name, lineage, or designation will appear exactly as you choose to share it — or not at all if you prefer to remain unnamed.
            </p>
          </div>
        </motion.div>

        {/* ── Entry type selection (hidden once a type is chosen) ── */}
        <AnimatePresence>
          {!selectedType && (
            <motion.div
              key="type-cards"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: 0.25 }}
            >
              <p style={{ fontFamily: FONT.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.sage, marginBottom: '1.25rem' }}>
                What are you contributing?
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '3rem' }}>
                {ENTRY_TYPES.map((type) => (
                  <TypeCard
                    key={type.id}
                    type={type}
                    selected={selectedType === type.id}
                    onSelect={() => setSelectedType(type.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Form + sidebar ── */}
        <AnimatePresence mode="wait">
          {selectedType && activeType && (
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Compact selector row */}
              <CompactTypeSelector type={activeType} onReset={() => setSelectedType(null)} />

              {/* Required fields note */}
              <p style={{ fontFamily: FONT.mono, fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.warmGray, marginBottom: '0.5rem' }}>
                Fields marked with a{' '}
                <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: T.clay, verticalAlign: 'middle', margin: '0 2px 2px' }} />
                {' '}are required
              </p>
              <p style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: '0.9rem', color: T.warmGray, marginBottom: '2.5rem', lineHeight: 1.65 }}>
                Take the time this deserves. There is no rush.
              </p>

              {/* Form + sidebar layout */}
              <div className="flex flex-col lg:flex-row lg:items-start" style={{ gap: '2rem', marginBottom: '4rem' }}>
                {/* Form */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {selectedType === 'herb'     && <HerbForm     onSubmit={handleSubmit} />}
                  {selectedType === 'practice' && <PracticeForm onSubmit={handleSubmit} />}
                  {selectedType === 'elder'    && <ElderVoiceForm onSubmit={handleSubmit} />}
                </div>

                {/* Sidebar */}
                <aside className="lg:w-60 lg:flex-shrink-0">
                  <WhatHappensNext />
                </aside>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
