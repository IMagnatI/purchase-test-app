/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grayf2: '#f2f2f2',
        graya8: '#a8a8a8',
        grayd9: '#d9d9d9',
        green6b: '#6bd501',
        green63: '#63a81b',
        redfa: '#fa3e3a',
      },
    },
  },
  plugins: [],
}
