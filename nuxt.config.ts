// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages:true,
  // nitro: {
  //   experimental: {
  //     websocket: true
  //   }
  // },
  plugins:["~/plugins/socket.client.js"],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-socket-io'
  ],
  serverMiddleware: [
    { path: '/api/binance', handler: '~/server/middleware/binance-proxy.js' }
  ]

})
