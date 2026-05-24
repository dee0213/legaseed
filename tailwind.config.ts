import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#2c3d26',
        moss: '#3d5235',
        sage: '#7a8c6e',
        fern: '#5a7a4a',
        cream: '#faf6ec',
        parchment: '#f2ead8',
        'warm-white': '#fdfaf3',
        clay: '#b5694f',
        terracotta: '#c4714a',
        ochre: '#c9a030',
        sienna: '#8b4a2a',
        'dusty-rose': '#c49a8a',
        plum: '#7a5c8c',
        ink: '#1a1810',
        'warm-gray': '#8a8070',
        border: '#d8cebc',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
        accent: ['Libre Baskerville', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.88', letterSpacing: '-0.025em' }],
        h1: ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h2: ['1.5rem', { lineHeight: '1.3' }],
        body: ['1rem', { lineHeight: '1.8' }],
        'body-lg': ['1.1rem', { lineHeight: '1.75' }],
        caption: ['0.875rem', { lineHeight: '1.6' }],
        label: ['0.6rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
    },
  },
  plugins: [],
} satisfies Config
