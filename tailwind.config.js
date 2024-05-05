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
        'light-100': '#F5F6F9',
        'light-200': '#F1F1F6',
        'light-text': '#5F5E65',
        'light-light-text': '#818080',
        'lilac': '#5D52D7',
        'blue-light': '#766ED9',
        'light-pink': '#FFE4E4',
        'light-pink-text': '#954343'
      }
    },
  },
  darkMode: 'selector',
}

