// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    steamApiPath: process.env.STEAM_API_PATH,
    steamApiKey: process.env.STEAM_API_KEY,
    public: {
      steamId: process.env.STEAM_ID,
    },
  },
  typescript: {
    typeCheck: false,
    strict: true,
  },
});
