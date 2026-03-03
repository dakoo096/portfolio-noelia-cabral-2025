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
  color: #555;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  width: 55px;
  height: 55px;
}

.boton-back-to-top button:hover {
  transform: translateY(-5px) scale(1.1);
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  color: #000;
}

.boton-back-to-top button:active {
  transform: scale(0.95);
}

.bx-tada {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@media (max-width: 400px) {
  .boton-back-to-top {
    right: 1.5rem;
    bottom: 1.5rem;
  }

  .boton-back-to-top button {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
}
</style>
