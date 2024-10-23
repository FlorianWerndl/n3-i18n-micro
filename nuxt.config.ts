// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
        jsx: true,
      },
    },
  },
});
