/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#FFD1DC',
        'soft-pink-darker': '#FFB6C1',
      }
    },
  },
  plugins: [],
}
