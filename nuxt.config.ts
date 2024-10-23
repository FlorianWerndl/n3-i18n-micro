// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'nuxt-i18n-micro'],
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

  i18n: {
    disableWatcher: true,
    locales: [
      { code: 'de', iso: 'de-DE', dir: 'ltr' },
      { code: 'en', iso: 'en-US', dir: 'ltr' },
    ],
    autoDetectLanguage: true,
    autoDetectPath: '/',
    includeDefaultLocaleRoute: true,
    globalLocaleRoutes: {
      'page': {
        en: '/page',
        de: '/seite',
      },
      'page/[identifier]': {
        en: '/page/[identifier]',
        de: '/seite/[identifier]',
      },
    },
    defaultLocale: 'de',
    translationDir: './app/locales',
    meta: true,
  },
});
