/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/pages/Home.js'],
  theme: {
    extend: {
      colors: {
        primary:"#728FCE",
        secondary:colors.lightblue,
        neutral:colors.lightgray
      }
    }
  },
  plugins: [],
}
