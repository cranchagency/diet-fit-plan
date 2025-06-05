/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        orange: {
          primary: '#FF6B00',
        },
        custom: {
          yellow: '#FFF9E5',
          pink: '#FFF5F5',
          purple: '#F5F5FF',
          green: '#E5F5E5',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};