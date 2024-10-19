// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css', // Ruta a tu archivo CSS
    configPath: 'tailwind.config.js', // Ruta a tu archivo de configuración de Tailwind
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_BASE_URL
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },
  hooks: {
    'ready': () => {
      if (!process.env.VITE_API_BASE_URL) {
        throw new Error('❌ Error: Se debe configurar la variable de entorno VITE_API_BASE_URL para la URL base de la API.');
      }
    }
  }
})