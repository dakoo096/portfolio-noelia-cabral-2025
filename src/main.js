import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/animations.css'
import './assets/boxicons.min.css'

import './assets/main.css'
import router from './router'
import { i18n } from './i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')

// Inicialización diferida de AOS para no competir con el First Contentful Paint ni generar forced reflow
const initAOS = () => {
  AOS.init({
    duration: 500, // Animación más rápida = más fluida
    easing: 'ease-out-cubic', // Transición suave y liviana
    once: true, // Evita que se repita en cada scroll (clave en mobile)
    offset: 80, // Empieza antes = se siente más responsivo
    mirror: false, // Evita animaciones al subir (pesado en mobile)
  })
}

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initAOS, { timeout: 1500 })
  } else {
    setTimeout(initAOS, 500)
  }
}
