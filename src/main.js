import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'animate.css'
import 'boxicons/css/boxicons.min.css'

import './assets/main.css'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Inicialización AOS optimizada para móviles
AOS.init({
  duration: 500,        // Animación más rápida = más fluida
  easing: 'ease-out-cubic', // Transición suave y liviana
  once: true,           // Evita que se repita en cada scroll (clave en mobile)
  offset: 80,           // Empieza antes = se siente más responsivo
  mirror: false         // Evita animaciones al subir (pesado en mobile)
})
