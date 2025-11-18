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

AOS.init({
  once: false,
  mirror: true,
})
