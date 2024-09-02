/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        '.filenamelist-scrollbar::-webkit-scrollbar': {
          height: '1px',
        },
        '.filenamelist-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: theme('#ddd'),
        },
        '.filenamelist-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: theme('#ddd'),
        },
      });
    }),
  ],
};
