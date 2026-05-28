import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        surface: '#1a1a1a',
        accent: '#FF6B47',
        'text-primary': '#f5f5f5',
        'text-muted': '#888888',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-syne)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
