/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#faf7f5',
          100: '#f3ede8',
          200: '#e6d9cf',
          300: '#d5bfae',
          400: '#c2a08a',
          500: '#b3876e',
          600: '#a67362',
          700: '#8b5e52',
          800: '#724e46',
          900: '#5e423c',
        },
      },
    },
  },
  plugins: [],
}