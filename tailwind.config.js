/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4ebd0',
        denim: '#152238',
        'denim-light': '#1e293b',
        toast: '#c05621',
        'wood-dark': '#1a110d',
        'wood-light': '#3e2723',
      },
      fontFamily: {
        serif: ['"Roboto Slab"', 'serif'],
        display: ['"Calistoga"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'denim-patch': "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
      }
    },
  },
  plugins: [],
}