import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GoogleMap } from 'vue3-google-map' // Importa GoogleMap
import { Loader } from '@googlemaps/js-api-loader' //
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

const googleMapsLoader = new Loader({
  apiKey: 'AIzaSyBky4Bi1jZxJNgpXYmKMx - SQB80InwgT9w', // Reemplaza con tu clave de API
  version: 'weekly',
  libraries: ['places'], // Es crucial cargar la librería 'places'
})
app.config.globalProperties.$googleMapsLoader = googleMapsLoader

app.use(router)
app.use(pinia)

app.mount('#app')
