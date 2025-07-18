export default defineNuxtConfig({
  srcDir: 'src',
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@700&display=swap'
        }
      ]
    }
  },
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
