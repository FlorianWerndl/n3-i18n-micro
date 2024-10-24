import availableLanguages from './app/locales/availableLanguages';
import pages from './app/locales/pages';

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
    locales: availableLanguages,
    autoDetectLanguage: true,
    autoDetectPath: '/',
    includeDefaultLocaleRoute: true,
    globalLocaleRoutes: pages,
    // globalLocaleRoutes: {
    //   'page': {
    //     en: '/page',
    //     de: '/seite',
    //   },
    //   'page-identifier': {
    //     en: '/page/:identifier()',
    //     de: '/seite/:identifier()',
    //   },
    // },
    defaultLocale: 'de',
    translationDir: './app/locales',
    meta: true,
  },
});
