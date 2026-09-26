/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f1115',
        surface: '#15171d',
        surface2: '#13161d',
        line: '#232732',
        accent: '#ccff00',
        accent2: '#c2f800',
        muted: '#9ca3af',
        muted2: '#8a92a0',
        soft: '#d1d5db',
        bright: '#e5e7eb',
      },
      fontFamily: {
        display: ['var(--font-oswald)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
