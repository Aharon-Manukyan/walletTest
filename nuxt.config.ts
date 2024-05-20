export default defineNuxtConfig({
  devtools: { enabled: true },
  pages:true,

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
  router:{
    extendRoutes(routes) {
      routes.push({
        name:'order book',
        path:'/',
        component:() => import ('~/pages/index.vue')
      },
      {
        name:'settings',
        path:'/settings',
        component:() => import ('~/pages/settings.vue')
      }
      )
    }
  }

})
