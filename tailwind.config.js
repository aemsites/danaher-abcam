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
          'rockwell',
        ],
      },
    },
  },
  plugins: [],
};

