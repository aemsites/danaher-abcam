/** @type {import('tailwindcss').Config} */
const wrapper = (process.env.IMPORTANT_WRAPPER && process.env.IMPORTANT_WRAPPER !== '.undefined') ? process.env.IMPORTANT_WRAPPER : false;
module.exports = {
  important: wrapper,
  content: ['./scripts/*.js', './404.html'],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: [
          'rockwell',
        ]
      },
    },
  },
  plugins: [],
};

