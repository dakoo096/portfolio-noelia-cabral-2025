<template>
  <section class="boton-back-to-top">
    <button v-show="visible" @click="scrollTop" id="myBtn" title="Go to top"
      class="btn rounded align-items-center p-3 bg-gradient bg-opacity-75">
      <i class="bx bxs-up-arrow-alt bx-tada"></i>
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const toggleVisibility = () => {
  visible.value = window.scrollY > 300 // aparece después de 300px
}

// Custom smooth scroll for slower speed
const smoothScrollToTop = () => {
  const startPosition = window.scrollY
  const distance = -startPosition
  const duration = 1000 // 1000ms = 1 second for a slow scroll
  let startTime = null

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  // Easing function for smooth acceleration and deceleration
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

const scrollTop = () => {
  smoothScrollToTop()
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})

</script>

<style scoped>
.boton-back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9;

  width: auto;
  display: inline-flex;
}


.boton-back-to-top button {
  font-size: 1.5rem;
  color: #fff;
  background-color: #e3c3e8;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}

.boton-back-to-top button:active {
  background-color: #e8b7cf;
}

@media (max-width: 400px) {
  .boton-back-to-top {
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
