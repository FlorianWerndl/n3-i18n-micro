import availableLanguages from './app/locales/availableLanguages';
import { createPages } from './app/locales/pages';

const pages = createPages();
// console.log('pages :>> ', pages);
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
    autoDetectLanguage: true,
    autoDetectPath: '/',
    defaultLocale: 'de',
    disableWatcher: true,
    globalLocaleRoutes: pages,
    includeDefaultLocaleRoute: true,
    locales: availableLanguages,
    meta: true,
    translationDir: './app/locales',
  },
});
