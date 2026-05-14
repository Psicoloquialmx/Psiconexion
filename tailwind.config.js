/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#faf8f4',
        paper: '#ffffff',
        ink: '#1a1714',
        muted: '#7c7570',
        border: '#e2ddd6',
        accent: '#7c5c3e',
        gold: '#b89060',
        dim: '#c4bdb5',
        corrA: '#2e7a8a',
        corrB: '#6b3d8a',
        corrC: '#2e7a50',
        corrD: '#8a5c2e',
        corrE: '#8a2e2e',
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
