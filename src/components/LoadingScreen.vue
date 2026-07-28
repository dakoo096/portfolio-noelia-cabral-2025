<template>
  <transition name="fade-loading">
    <div v-if="visible" class="loading-screen" role="status" aria-live="polite">
      <div class="scanlines"></div>
      <div class="loading-content">
        <div class="pixel-logo">NC</div>
        <p class="loading-text">CARGANDO PORTFOLIO<span class="dots">{{ dots }}</span></p>
        <div class="pixel-bar">
          <div class="pixel-bar-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="loading-percent">{{ progress }}%</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  visible: Boolean,
  progress: { type: Number, default: 0 },
})

const dots = ref('')
let dotsInterval = null

onMounted(() => {
  let i = 0
  dotsInterval = setInterval(() => {
    i = (i + 1) % 4
    dots.value = '.'.repeat(i)
  }, 400)
})

onBeforeUnmount(() => {
  clearInterval(dotsInterval)
  document.body.classList.remove('loading-lock')
})

watch(
  () => props.visible,
  (isVisible) => {
    document.body.classList.toggle('loading-lock', isVisible)
  },
  { immediate: true },
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(243, 140, 190, 0.06) 0px,
    rgba(243, 140, 190, 0.06) 1px,
    transparent 2px,
    transparent 4px
  );
}

.loading-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  padding: 2rem;
}

.pixel-logo {
  font-family: 'Press Start 2P', monospace;
  font-size: 2.2rem;
  color: #f38cbe;
  text-shadow:
    4px 4px 0 #000,
    0 0 18px rgba(243, 140, 190, 0.6);
  letter-spacing: 4px;
  animation: pixel-pulse 1.2s steps(2) infinite;
}

.loading-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.85rem;
  color: #ffffff;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 #000;
  min-width: 21ch;
  text-align: center;
}

.dots {
  color: #f38cbe;
  display: inline-block;
  width: 1.5ch;
  text-align: left;
}

.pixel-bar {
  width: 240px;
  height: 18px;
  background: #1a1a1a;
  border: 3px solid #f38cbe;
  padding: 3px;
  box-shadow: 3px 3px 0 #000;
}

.pixel-bar-fill {
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    #f38cbe 0px,
    #f38cbe 8px,
    #e8b7cf 8px,
    #e8b7cf 16px
  );
  transition: width 0.25s steps(12);
}

.loading-percent {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.75rem;
  color: #e8b7cf;
  text-shadow: 2px 2px 0 #000;
}

@keyframes pixel-pulse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.fade-loading-enter-active,
.fade-loading-leave-active {
  transition: opacity 0.5s ease;
}

.fade-loading-enter-from,
.fade-loading-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .pixel-logo {
    font-size: 1.6rem;
  }

  .loading-text {
    font-size: 0.65rem;
    min-width: unset;
  }

  .pixel-bar {
    width: 180px;
  }
}
</style>
