/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        campus: {
          ink: '#181D31',
          gold: '#E5BA73',
          paper: '#F7F5F0',
          mist: '#F7F8FC',
          night: '#050816',
          panel: '#0B1120',
          surface: '#0F172A',
        },
      },
      boxShadow: {
        'campus-sm': '0 10px 30px rgba(24, 29, 49, 0.08)',
        campus: '0 18px 45px rgba(24, 29, 49, 0.11)',
        'campus-dark': '0 20px 60px rgba(0, 0, 0, 0.34)',
      },
      borderRadius: {
        surface: '1rem',
      },
    },
  },
};
