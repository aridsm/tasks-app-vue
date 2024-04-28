/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  css: ['~/assets/css/main.css'],
  theme: {
    extend: {
      colors: {
        'dark-text': '#A1A1B6',
        'dark-100': '#3C4155',
        'dark-200': '#313547',
        'dark-300': '#262936',
        'lilac': '#5D52D7',
      }
    },
  },
  plugins: [],
}

