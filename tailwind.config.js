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
        'dark-100': '#302D3F',
        'dark-200': '#292636',
        'dark-300': '#211E2E',
        'lilac': '#936EE0',
      }
    },
  },
  plugins: [],
}

