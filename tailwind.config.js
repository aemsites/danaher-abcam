/** @type {import('tailwindcss').Config} */
const wrapper = (process.env.IMPORTANT_WRAPPER && process.env.IMPORTANT_WRAPPER !== '.undefined') ? process.env.IMPORTANT_WRAPPER : false;
module.exports = {
  important: wrapper,
  content: ['./eds/scripts/*.js', './404.html', './eds/fragments/header.html'],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: [
          'Noto Sans',
        ],
        heading: [
          'Lubalin Graph Std',
        ],
      },
      colors: {
        'gradient': 'linear-gradient(90.42deg, #4BA6B3 0.44%, #C9D3B7 35.08%, #FF8730 69.72%, #C54428 99.71%)',
      },
    },
  },
  plugins: [],
};

