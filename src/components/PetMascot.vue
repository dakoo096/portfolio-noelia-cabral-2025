<template>
  <div class="pet-container" :class="{ visible: showPet }">
    <!-- Puerta Pixel Art -->
    <div class="pixel-door-frame" :class="{ open: isDoorOpen }">
      <div class="pixel-door-leaf">
        <div class="door-handle"></div>
      </div>
    </div>

    <!-- Mascota Pixel Art -->
    <div
      ref="petRef"
      class="pixel-pet-body"
      :class="{
        emerged: isEmerged,
        bouncing: isBouncing,
        blinking: isBlinking || isSleeping,
        drinking: isDrinkingCoffee,
        coding: isCoding,
        sleeping: isSleeping,
        listening: isListeningMusic,
        gaming: isGaming
      }"
      @click="interact"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Burbuja de diálogo Pixel Art -->
      <transition name="pop-speech">
        <div v-if="speechText" class="pixel-speech-bubble">
          {{ speechText }}
          <div class="pixel-bubble-arrow"></div>
        </div>
      </transition>

      <!-- Taza de café Pixel Art -->
      <transition name="pop-coffee">
        <div v-if="isDrinkingCoffee" class="pixel-coffee-mug">
          <div class="pixel-steam">♨️</div>
          <div class="mug-body"></div>
          <div class="mug-handle"></div>
        </div>
      </transition>

      <!-- Laptop Pixel Art (Modo Codeando) -->
      <transition name="pop-item">
        <div v-if="isCoding" class="pixel-laptop">
          <div class="laptop-screen">
            <div class="code-line l1"></div>
            <div class="code-line l2"></div>
          </div>
          <div class="laptop-keyboard"></div>
        </div>
      </transition>

      <!-- Auriculares + Notas Musicales Pixel Art (Modo Música) -->
      <transition name="pop-item">
        <div v-if="isListeningMusic" class="pixel-headphones-wrapper">
          <div class="pixel-headphones">
            <div class="hp-band"></div>
            <div class="hp-cup cup-left"></div>
            <div class="hp-cup cup-right"></div>
          </div>
          <div class="music-notes">
            <span class="note n1">🎵</span>
            <span class="note n2">🎶</span>
          </div>
        </div>
      </transition>

      <!-- GameBoy Pixel Art (Modo Gamer) -->
      <transition name="pop-item">
        <div v-if="isGaming" class="pixel-gameboy">
          <div class="gb-screen"></div>
          <div class="gb-dpad"></div>
          <div class="gb-btn"></div>
        </div>
      </transition>

      <!-- Letras Zzz Pixel Art (Modo Siesta) -->
      <transition name="pop-item">
        <div v-if="isSleeping" class="pixel-sleep-zzz">
          <span class="z-letter z1">Z</span>
          <span class="z-letter z2">z</span>
          <span class="z-letter z3">z</span>
        </div>
      </transition>

      <!-- Orejas Pixel -->
      <div class="pixel-ear pixel-ear-left">
        <div class="pixel-ear-inner"></div>
      </div>
      <div class="pixel-ear pixel-ear-right">
        <div class="pixel-ear-inner"></div>
      </div>

      <!-- Cara Pixel -->
      <div class="pixel-face">
        <!-- Ojo Izquierdo -->
        <div class="pixel-eye pixel-eye-left">
          <div
            class="pixel-pupil"
            :style="{
              transform: isSleeping ? 'none' : `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`
            }"
          >
            <div class="pixel-sparkle"></div>
          </div>
        </div>

        <!-- Ojo Derecho -->
        <div class="pixel-eye pixel-eye-right">
          <div
            class="pixel-pupil"
            :style="{
              transform: isSleeping ? 'none' : `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`
            }"
          >
            <div class="pixel-sparkle"></div>
          </div>
        </div>

        <!-- Mejillas Pixel -->
        <div class="pixel-blush pixel-blush-left"></div>
        <div class="pixel-blush pixel-blush-right"></div>

        <!-- Nariz y boca Pixel -->
        <div class="pixel-snout">
          <div class="pixel-nose"></div>
          <div class="pixel-mouth" :class="{ sleep: isSleeping }"></div>
        </div>
      </div>

      <!-- Patitas Pixel -->
      <div class="pixel-paws">
        <div class="pixel-paw"></div>
        <div
          class="pixel-paw paw-right"
          :class="{ waving: isWaving }"
        ></div>
      </div>

      <!-- Cola Pixel -->
      <div class="pixel-tail"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, reactive } from 'vue'

const props = defineProps({
  ready: {
    type: Boolean,
    default: false
  }
})

const showPet = ref(false)
const isDoorOpen = ref(false)
const isEmerged = ref(false)
const isBouncing = ref(false)
const isBlinking = ref(false)

// Estados de acciones
const isDrinkingCoffee = ref(false)
const isCoding = ref(false)
const isSleeping = ref(false)
const isListeningMusic = ref(false)
const isGaming = ref(false)
const isWaving = ref(false)

const speechText = ref('')
const petRef = ref(null)

const pupilOffset = reactive({ x: 0, y: 0 })

let blinkInterval = null
let speechTimeout = null
let idleTimer = null

// Limpiar todas las acciones activas
const resetAllActions = () => {
  isDrinkingCoffee.value = false
  isCoding.value = false
  isSleeping.value = false
  isListeningMusic.value = false
  isGaming.value = false
}

// Iniciar temporizador de inactividad progresivo (10s café -> 22s laptop -> 35s siesta)
const resetIdleTimer = () => {
  if (idleTimer) clearTimeout(idleTimer)
  resetAllActions()

  if (isEmerged.value) {
    // 10s: Cafecito
    idleTimer = setTimeout(() => {
      startCoffee()
      // 22s: Laptop
      idleTimer = setTimeout(() => {
        startCoding()
        // 35s: Siesta
        idleTimer = setTimeout(() => {
          startSleeping()
        }, 13000)
      }, 12000)
    }, 10000)
  }
}

// ☕ Acción Café
const startCoffee = () => {
  resetAllActions()
  isDrinkingCoffee.value = true
  showSpeech('Un cafecito y seguimos ☕', 3500)
}

// 💻 Acción Laptop
const startCoding = () => {
  resetAllActions()
  isCoding.value = true
  showSpeech('Escribiendo código... 💻⌨️', 3500)
}

// 💤 Acción Siesta
const startSleeping = () => {
  resetAllActions()
  isSleeping.value = true
  showSpeech('Zzz... Hora de la siestita 😴', 4000)
}

// 🎧 Acción Música
const startMusic = () => {
  resetAllActions()
  isListeningMusic.value = true
  showSpeech('Vibing al ritmo 🎵🎶', 3500)
}

// 🎮 Acción Gamer
const startGaming = () => {
  resetAllActions()
  isGaming.value = true
  showSpeech('¡Modo Gamer! 🎮✨', 3500)
}

const showSpeech = (text, duration = 3000) => {
  speechText.value = text
  if (speechTimeout) clearTimeout(speechTimeout)
  speechTimeout = setTimeout(() => {
    speechText.value = ''
  }, duration)
}

// Frases Pixel Art interactivas
const messages = [
  "¡HOLA! 🌸",
  "¡BIENVENID@! 💖",
  "¡EXPLORA! 🚀",
  "¡Hacé click por ahí! 👀",
  "¿Ya viste mis proyectos? ✨",
  "Prometo que este código compila... 😅",
  "console.log('Hola!'); 💻",
  "Hay café detrás de cada proyecto ☕",
  "Full Stack en acción ⚡",
  "¡Scroll un poquito! ⬇️",
  "¿Te gustó el diseño? 🎨",
  "¡Gracias por visitar! 🌷",
  "¿Charlamos? 💌",
  "Git commit -m 'Portfolio listo' ✅",
  "¡Este portfolio fue hecho con cariño! 💕",
  "¡Pasá por About Me! 📖",
  "Mis proyectos te están esperando 🚀",
  "¡Que tengas un lindo día! 🌈",
]

// Manejador de hover (Saludo con la patita 👋)
const handleMouseEnter = () => {
  if (!isEmerged.value) return
  isWaving.value = true
  if (!speechText.value && !isSleeping.value) {
    showSpeech('¡Hola humano! 🐾', 2000)
  }
}

const handleMouseLeave = () => {
  isWaving.value = false
}

// Seguimiento del cursor con movimiento pixelado en integer
const handleMouseMove = (e) => {
  if (!petRef.value || !isEmerged.value || isSleeping.value) return

  const rect = petRef.value.getBoundingClientRect()
  const eyeCenterX = rect.left + rect.width / 2
  const eyeCenterY = rect.top + rect.height / 3

  const deltaX = e.clientX - eyeCenterX
  const deltaY = e.clientY - eyeCenterY
  const angle = Math.atan2(deltaY, deltaX)
  const distance = Math.hypot(deltaX, deltaY)

  const maxDistance = 4
  const moveDist = Math.min(distance * 0.03, maxDistance)

  pupilOffset.x = Math.round(Math.cos(angle) * moveDist)
  pupilOffset.y = Math.round(Math.sin(angle) * moveDist)
}

// Reacción al hacer clic: alterna entre sorpresa, música, gaming y frases
let clickCount = 0
const interact = () => {
  clickCount++
  resetIdleTimer()

  isBouncing.value = true
  setTimeout(() => {
    isBouncing.value = false
  }, 500)

  // Disparar acciones especiales en clics específicos
  if (clickCount % 4 === 2) {
    startMusic()
  } else if (clickCount % 4 === 0) {
    startGaming()
  } else {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    showSpeech(randomMsg, 2800)
  }
}

// Secuencia de entrada
const startEntranceAnimation = () => {
  showPet.value = true

  setTimeout(() => {
    isDoorOpen.value = true
  }, 300)

  setTimeout(() => {
    isEmerged.value = true
    resetIdleTimer()
  }, 700)

  setTimeout(() => {
    isDoorOpen.value = false
  }, 1600)

  setTimeout(() => {
    showSpeech('HOLA! 🌸', 3000)
  }, 2000)
}

watch(
  () => props.ready,
  (isReady) => {
    if (isReady) {
      startEntranceAnimation()
    }
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })

  blinkInterval = setInterval(() => {
    if (!isSleeping.value) {
      isBlinking.value = true
      setTimeout(() => {
        isBlinking.value = false
      }, 160)
    }
  }, 3600)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (blinkInterval) clearInterval(blinkInterval)
  if (speechTimeout) clearTimeout(speechTimeout)
  if (idleTimer) clearTimeout(idleTimer)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pet-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9990;
  display: flex;
  align-items: flex-end;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s steps(4);
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.pet-container.visible {
  opacity: 1;
  pointer-events: auto;
}

/* ========================================= */
/*   PUERTA PIXEL ART                        */
/* ========================================= */
.pixel-door-frame {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 52px;
  height: 60px;
  background: #1e1b4b;
  border: 4px solid #000000;
  border-bottom: none;
  box-shadow: 4px 4px 0 #000000;
  perspective: 300px;
  z-index: 1;
}

.pixel-door-leaf {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f38cbe;
  border-right: 3px solid #e8b7cf;
  transform-origin: left;
  transition: transform 0.5s steps(6);
}

.door-handle {
  position: absolute;
  right: 6px;
  top: 50%;
  width: 6px;
  height: 6px;
  background: #facc15;
  border: 2px solid #000000;
}

.pixel-door-frame.open .pixel-door-leaf {
  transform: rotateY(-105deg);
}

/* ========================================= */
/*   MASCOTA PIXEL ART                       */
/* ========================================= */
.pixel-pet-body {
  position: relative;
  width: 56px;
  height: 54px;
  background: #ffffff;
  border: 4px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  cursor: pointer;
  z-index: 2;
  transform: translateX(-40px) scale(0.2);
  opacity: 0;
  transition:
    transform 0.6s steps(8),
    opacity 0.4s steps(4);
}

.pixel-pet-body.emerged {
  transform: translateX(12px) scale(1);
  opacity: 1;
}

.pixel-pet-body:hover {
  transform: translateX(12px) scale(1.08);
}

.pixel-pet-body.bouncing {
  animation: pixel-bounce 0.45s steps(6);
}

@keyframes pixel-bounce {
  0%, 100% { transform: translateX(12px) translateY(0); }
  40% { transform: translateX(12px) translateY(-14px); }
  70% { transform: translateX(12px) translateY(-4px); }
}

.pixel-pet-body.listening {
  animation: music-nod 0.8s steps(4) infinite;
}

@keyframes music-nod {
  0%, 100% { transform: translateX(12px) translateY(0) rotate(0deg); }
  50% { transform: translateX(12px) translateY(-5px) rotate(4deg); }
}

/* ========================================= */
/*   BURBUJA DE DIÁLOGO PIXEL ART            */
/* ========================================= */
.pixel-speech-bubble {
  position: absolute;
  bottom: 118%;
  left: 0;
  transform: none;
  background: #ffffff;
  color: #000000;
  border: 3px solid #000000;
  padding: 8px 12px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.65rem;
  line-height: 1.6;
  white-space: normal;
  word-break: normal;
  overflow-wrap: normal;
  max-width: 250px;
  min-width: 120px;
  box-shadow: 4px 4px 0 #000000;
  pointer-events: none;
  z-index: 10;
}

.pixel-bubble-arrow {
  position: absolute;
  top: 100%;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #000000;
}

/* ========================================= */
/*   OREJAS PIXEL                            */
/* ========================================= */
.pixel-ear {
  position: absolute;
  top: -12px;
  width: 14px;
  height: 12px;
  background: #ffffff;
  border: 3px solid #000000;
  border-bottom: none;
}

.pixel-ear-left {
  left: 4px;
}

.pixel-ear-right {
  right: 4px;
}

.pixel-ear-inner {
  position: absolute;
  bottom: 0;
  left: 2px;
  width: 6px;
  height: 6px;
  background: #f38cbe;
}

/* ========================================= */
/*   OJOS Y CARA PIXEL                       */
/* ========================================= */
.pixel-face {
  position: relative;
  width: 100%;
  height: 100%;
}

.pixel-eye {
  position: absolute;
  top: 14px;
  width: 14px;
  height: 14px;
  background: #ffffff;
  border: 3px solid #000000;
}

.pixel-eye-left {
  left: 8px;
}

.pixel-eye-right {
  right: 8px;
}

.pixel-pet-body.blinking .pixel-eye,
.pixel-pet-body.sleeping .pixel-eye {
  height: 4px;
  top: 19px;
  background: #000000;
}

.pixel-pupil {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 5px;
  height: 5px;
  background: #000000;
  transition: transform 0.04s steps(2);
}

.pixel-sparkle {
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 2px;
  background: #ffffff;
}

.pixel-blush {
  position: absolute;
  top: 28px;
  width: 8px;
  height: 4px;
  background: #f38cbe;
}

.pixel-blush-left {
  left: 4px;
}

.pixel-blush-right {
  right: 4px;
}

.pixel-snout {
  position: absolute;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pixel-nose {
  width: 4px;
  height: 3px;
  background: #f38cbe;
  border: 1px solid #000000;
}

.pixel-mouth {
  width: 6px;
  height: 2px;
  background: #000000;
  margin-top: 2px;
}

.pixel-mouth.sleep {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

/* ========================================= */
/*   PATITAS Y SALUDO (WAVE)                 */
/* ========================================= */
.pixel-paws {
  position: absolute;
  bottom: -4px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
}

.pixel-paw {
  width: 10px;
  height: 6px;
  background: #ffffff;
  border: 2px solid #000000;
  transition: transform 0.2s steps(2);
}

.pixel-paw.paw-right.waving {
  animation: paw-wave 0.5s steps(2) infinite;
}

@keyframes paw-wave {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(20deg); }
}

.pixel-tail {
  position: absolute;
  bottom: 8px;
  right: -12px;
  width: 14px;
  height: 8px;
  background: #ffffff;
  border: 3px solid #000000;
  border-left: none;
  animation: pixel-tail-step 2s steps(2) infinite;
}

@keyframes pixel-tail-step {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* ========================================= */
/*   ITEMS: CAFÉ, LAPTOP, AURICULARES, GAMEBOY, ZZZ */
/* ========================================= */

/* ☕ Cafecito */
.pixel-coffee-mug {
  position: absolute;
  bottom: 8px;
  right: -4px;
  width: 16px;
  height: 16px;
  z-index: 8;
  animation: coffee-sip 2.6s steps(4) infinite;
}

.mug-body {
  width: 12px;
  height: 12px;
  background: #f43f5e;
  border: 2px solid #000000;
  box-shadow: 2px 2px 0 #000000;
}

.mug-handle {
  position: absolute;
  right: -4px;
  top: 2px;
  width: 4px;
  height: 6px;
  border: 2px solid #000000;
  border-left: none;
}

.pixel-steam {
  position: absolute;
  top: -16px;
  left: -2px;
  font-size: 0.65rem;
  animation: steam-float 1.6s steps(3) infinite;
}

@keyframes coffee-sip {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  40%, 65% { transform: translateY(-8px) rotate(-12deg); }
}

@keyframes steam-float {
  0%, 100% { transform: translateY(0); opacity: 0.9; }
  50% { transform: translateY(-4px); opacity: 0.4; }
}

/* 💻 Laptop Codeando */
.pixel-laptop {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 20px;
  z-index: 9;
}

.laptop-screen {
  width: 28px;
  height: 16px;
  background: #0f172a;
  border: 2px solid #000000;
  margin: 0 auto;
  padding: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.code-line {
  height: 2px;
  background: #38bdf8;
  animation: typing-code 0.6s steps(3) infinite alternate;
}

.code-line.l2 {
  width: 60%;
  background: #f38cbe;
  animation-delay: 0.3s;
}

.laptop-keyboard {
  width: 32px;
  height: 4px;
  background: #cbd5e1;
  border: 2px solid #000000;
}

@keyframes typing-code {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

/* 🎧 Auriculares & Notas Musicales */
.pixel-headphones-wrapper {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 62px;
  height: 40px;
  pointer-events: none;
  z-index: 10;
}

.hp-band {
  position: absolute;
  top: 0;
  left: 6px;
  width: 50px;
  height: 18px;
  border: 4px solid #a855f7;
  border-bottom: none;
  border-radius: 20px 20px 0 0;
}

.hp-cup {
  position: absolute;
  top: 14px;
  width: 10px;
  height: 16px;
  background: #f38cbe;
  border: 2px solid #000000;
  border-radius: 4px;
}

.hp-cup.cup-left { left: 0; }
.hp-cup.cup-right { right: 0; }

.music-notes {
  position: absolute;
  top: -12px;
  right: -8px;
  display: flex;
  gap: 6px;
}

.note {
  font-size: 0.75rem;
  animation: note-bounce 1.2s steps(4) infinite alternate;
}

.note.n2 { animation-delay: 0.4s; }

@keyframes note-bounce {
  0% { transform: translateY(0) scale(0.9); }
  100% { transform: translateY(-8px) scale(1.2); }
}

/* 🎮 GameBoy */
.pixel-gameboy {
  position: absolute;
  bottom: 4px;
  right: -6px;
  width: 18px;
  height: 26px;
  background: #94a3b8;
  border: 2px solid #000000;
  z-index: 9;
  padding: 2px;
  box-shadow: 2px 2px 0 #000;
}

.gb-screen {
  width: 14px;
  height: 10px;
  background: #22c55e;
  border: 1px solid #000;
  animation: gb-flicker 0.8s steps(2) infinite;
}

.gb-dpad {
  width: 5px;
  height: 5px;
  background: #000;
  margin-top: 2px;
}

.gb-btn {
  position: absolute;
  bottom: 3px;
  right: 2px;
  width: 4px;
  height: 4px;
  background: #ef4444;
  border-radius: 50%;
}

@keyframes gb-flicker {
  0%, 100% { background: #22c55e; }
  50% { background: #86efac; }
}

/* 💤 Siesta Zzz */
.pixel-sleep-zzz {
  position: absolute;
  top: -24px;
  right: -10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: 'Press Start 2P', monospace;
  color: #a855f7;
  font-weight: bold;
}

.z-letter {
  animation: zzz-float 1.8s steps(4) infinite;
}

.z1 { font-size: 0.75rem; animation-delay: 0s; }
.z2 { font-size: 0.6rem; animation-delay: 0.4s; }
.z3 { font-size: 0.5rem; animation-delay: 0.8s; }

@keyframes zzz-float {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  40% { opacity: 1; }
  100% { transform: translateY(-16px) translateX(10px); opacity: 0; }
}

/* Transiciones Vue */
.pop-speech-enter-active,
.pop-speech-leave-active,
.pop-item-enter-active,
.pop-item-leave-active {
  transition: all 0.25s steps(3);
}

.pop-speech-enter-from,
.pop-speech-leave-to,
.pop-item-enter-from,
.pop-item-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.6);
}
</style>
