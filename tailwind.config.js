/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Roboto Slab"', 'serif'],
        display: ['"Calistoga"', 'serif'],
      },
      colors: {
        paper: '#f4ebd0',
        denim: '#152238',
        toast: '#c05621',
        wood: '#1a110d',
      }
    },
  },
  plugins: [],
}