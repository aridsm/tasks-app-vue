// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  typescript: {
    typeCheck: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "dayjs-nuxt",
    "@vee-validate/nuxt",
  ],
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@/assets/css/main.css",
  ],
  plugins: ["~/plugins/fontawesome.ts"],
});
