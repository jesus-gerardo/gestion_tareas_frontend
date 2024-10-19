/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,vue,ts}',
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.{js,vue,ts}',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}', // Asegúrate de incluir todos los archivos que contienen clases de Tailwind
  ],
  theme: {
    extend: {
      // Si quieres agregar colores personalizados, hazlo aquí
      colors: {
        primary: '#3490dc',
      },
    },
  },
  plugins: [],
}

