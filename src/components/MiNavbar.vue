<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">

      <!-- Botón hamburguesa -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item"><a class="nav-link" href="#" @click.prevent="scrollToSection('body')">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#acerca-de-mi"
              @click.prevent="scrollToSection('#acerca-de-mi')">Acerca de mí</a></li>
          <li class="nav-item"><a class="nav-link" href="#mi-stack" @click.prevent="scrollToSection('#mi-stack')">Mis
              Habilidades</a></li>
          <li class="nav-item"><a class="nav-link" href="#mis-proyectos"
              @click.prevent="scrollToSection('#mis-proyectos')">Mis Proyectos</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacto"
              @click.prevent="scrollToSection('#contacto')">Contacto</a></li>

          <!-- Botón modo oscuro -->
          <li class="nav-item">
            <button class="dark-mode-btn" @click="toggleDarkMode">
              {{ isDark ? '☀️' : '🌙' }}
            </button>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark-mode', isDark.value)
  localStorage.setItem('darkMode', isDark.value)
}

// Custom smooth scroll for slower speed
const scrollToSection = (targetSelector) => {
  const target = document.querySelector(targetSelector)
  if (!target) return

  // Offset para tener en cuenta el navbar fijo
  const navbarHeight = document.querySelector('.navbar').offsetHeight
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
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

onMounted(() => {
  const saved = localStorage.getItem('darkMode') === 'true'
  isDark.value = saved
  document.body.classList.toggle('dark-mode', saved)
})
</script>


<style scoped>
.dark-mode-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0.2rem;
  transition: transform 0.2s;
}


/* Navbar base */
.navbar {
  background-color: #e3c3e8;
  padding: 0;
  border-bottom: 2px solid #e3c3e8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  overflow-x: hidden;
  z-index: 9999;
  width: 100%;
}


.navbar a,
.navbar button {
  padding: 1rem 1.5rem;
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  border-bottom: 2px solid #e3c3e8;
  transition: all 0.3s;
}

.container-fluid {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.navbar a:hover,
.navbar button:hover {
  color: #ffffff;
  background-color: #DAA0D2;
  border-bottom: 2px solid #4b4b4b;
}

.navbar a:active,
.navbar button:active {
  color: #ffffff;
  background-color: #da91daaf;
}



@media (max-width: 768px) {
  .navbar {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }

  .navbar .container,
  .navbar .container-fluid {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }

  .navbar-toggler {
    margin-left: 0 !important;
  }
}


@media (max-width: 600px) {
  .navbar a {
    font-size: 1.3rem;
  }
}
</style>
