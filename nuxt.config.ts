// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxthub/core'],
  ui: {
    global: true
  },
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
    preference: 'light',
    dataValue: 'theme'
  },
  pages: false
})
