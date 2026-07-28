<template>
  <LoadingScreen :visible="isLoading" :progress="progress" />
  <div id="app">
    <HeaderComponent />
    <BackToTop />
    <AcercaDeMi />
    <MiStack />
    <MisProyectos />
    <Contacto />
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import HeaderComponent from './components/MiHeader.vue'
import BackToTop from './components/BackToTop.vue'
import AcercaDeMi from './components/AcercaDeMi.vue'
import MiStack from './components/MiStack.vue'
import MisProyectos from './components/MisProyectos.vue'
import FooterComponent from './components/MiFooter.vue'
import Contacto from './components/MiContacto.vue'
import LoadingScreen from './components/LoadingScreen.vue'

const isLoading = ref(true)
const progress = ref(0)

const waitForImage = (img) =>
  new Promise((resolve) => {
    if (img.complete) return resolve()
    img.addEventListener('load', resolve, { once: true })
    img.addEventListener('error', resolve, { once: true })
  })

const waitForVideo = (video) =>
  new Promise((resolve) => {
    if (video.readyState >= 3) return resolve()
    video.addEventListener('canplaythrough', resolve, { once: true })
    video.addEventListener('loadeddata', resolve, { once: true })
    video.addEventListener('error', resolve, { once: true })
  })

onMounted(async () => {
  await nextTick()

  const isDark = localStorage.getItem('darkMode') === 'true'
  const heroVideo = document.querySelector(
    isDark ? '.portada-video-dark' : '.portada-video-light',
  )
  const heroImg = document.querySelector('.floating-img')

  const assets = [heroVideo, heroImg].filter(Boolean)
  const total = assets.length || 1
  let loaded = 0

  const track = (promise) =>
    promise.then(() => {
      loaded += 1
      progress.value = Math.round((loaded / total) * 100)
    })

  const assetsPromise = Promise.all(
    assets.map((el) => track(el.tagName === 'VIDEO' ? waitForVideo(el) : waitForImage(el))),
  )

  const minDelay = new Promise((resolve) => setTimeout(resolve, 5000))
  const safetyTimeout = new Promise((resolve) => setTimeout(resolve, 8000))

  await Promise.race([Promise.all([assetsPromise, minDelay]), safetyTimeout])

  progress.value = 100
  isLoading.value = false
})
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
