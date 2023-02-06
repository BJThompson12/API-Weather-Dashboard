/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js}",
    "./src/js/script.js",
    "./index.html"
],
  theme: {
    extend: {
      screens: {
        'md': '768px',
      // => @media (min-width: 768px) 
      }
    },
  },
  plugins: [],
}