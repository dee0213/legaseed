import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import { herbs } from '@/lib/data/herbs'

export const dynamic = 'force-dynamic'

function loadFont(): ArrayBuffer | null {
  try {
    const buf = readFileSync(join(process.cwd(), 'public/fonts/cormorant-light-italic.ttf'))
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') ?? ''
  const herb = herbs.find((h) => h.slug === slug)

  const name       = herb?.name          ?? 'Legaseed'
  const botanical  = herb?.botanicalName ?? 'Ancestral wellness archive'
  const summary    = (herb?.plainSummary ?? '').slice(0, 130)

  const fontData = loadFont()

  type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  type FontStyle  = 'normal' | 'italic'
  type FontEntry  = { name: string; data: ArrayBuffer; weight: FontWeight; style: FontStyle }

  const fonts: FontEntry[] = fontData
    ? [{ name: 'Cormorant', data: fontData, weight: 300, style: 'italic' }]
    : []

  const serif = fontData ? 'Cormorant, Georgia, serif' : 'Georgia, serif'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#2c3d26',
          padding: '72px 80px 60px',
          position: 'relative',
        }}
      >
        {/* Inner border frame */}
        <div
          style={{
            position: 'absolute',
            inset: 32,
            border: '1px solid rgba(218,206,188,0.12)',
            display: 'flex',
          }}
        />

        {/* Accent line — clay left edge */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            bottom: 80,
            left: 80,
            width: 4,
            background: '#b5694f',
            display: 'flex',
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingLeft: 36,
          }}
        >
          {/* Archive label */}
          <p
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              fontSize: 14,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(122,140,110,0.85)',
              margin: '0 0 32px 0',
            }}
          >
            Legaseed · Ancestral Wellness Archive
          </p>

          {/* Herb name — large italic */}
          <h1
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: herb ? 100 : 72,
              lineHeight: 1,
              color: '#faf6ec',
              margin: '0 0 20px 0',
              letterSpacing: '-0.02em',
            }}
          >
            {name}
          </h1>

          {/* Botanical name */}
          <p
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              fontSize: 26,
              color: 'rgba(201,160,48,0.85)',
              margin: '0 0 44px 0',
              letterSpacing: '0.01em',
            }}
          >
            {botanical}
          </p>

          {/* Rule */}
          <div
            style={{
              width: 64,
              height: 1,
              background: 'rgba(218,206,188,0.25)',
              margin: '0 0 36px 0',
              display: 'flex',
            }}
          />

          {/* Summary */}
          {summary && (
            <p
              style={{
                fontFamily: serif,
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 21,
                color: 'rgba(250,246,236,0.55)',
                lineHeight: 1.65,
                maxWidth: 680,
                margin: 0,
              }}
            >
              {summary}
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 36,
            paddingTop: 32,
            borderTop: '1px solid rgba(218,206,188,0.1)',
          }}
        >
          <span
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              fontSize: 15,
              color: 'rgba(250,246,236,0.28)',
            }}
          >
            legaseed.com
          </span>

          {/* Wordmark */}
          <span
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              fontSize: 26,
              display: 'flex',
            }}
          >
            <span style={{ color: '#faf6ec' }}>Lega</span>
            <span style={{ color: '#b5694f' }}>seed</span>
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    },
  )
}
