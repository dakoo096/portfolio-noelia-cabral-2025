<template>
  <nav class="navbar navbar-expand-lg" :class="{ scrolled: scrolled }">
    <div class="container-fluid px-3">
      <!-- Logo Brand -->
      <a class="navbar-brand d-flex align-items-center" href="#" @click.prevent="scrollToSection('body')">
        <span class="logo-initials">NC</span>
        <span class="logo-name">Noelia Cabral</span>
      </a>

      <!-- Botón hamburguesa -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="scrollToSection('body')">{{
              $t('navbar.inicio')
            }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#acerca-de-mi" @click.prevent="scrollToSection('#acerca-de-mi')">{{
              $t('navbar.acerca_de_mi') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#mi-stack" @click.prevent="scrollToSection('#mi-stack')">{{
              $t('navbar.mis_habilidades')
            }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#mis-proyectos" @click.prevent="scrollToSection('#mis-proyectos')">{{
              $t('navbar.mis_proyectos') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contacto" @click.prevent="scrollToSection('#contacto')">{{
              $t('navbar.contacto')
            }}</a>
          </li>

          <!-- Botón de idioma -->
          <li class="nav-item mx-2 d-flex align-items-center">
            <button class="lang-btn" @click="toggleLanguage">
              {{ currentLang === 'es' ? 'EN' : 'ES' }}
            </button>
          </li>

          <!-- Botón modo oscuro -->
          <li class="nav-item d-flex align-items-center">
            <button class="dark-mode-btn" @click="toggleDarkMode">
              <i :class="['bx', isDark ? 'bx-sun' : 'bx-moon']"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isDark = ref(false)
const scrolled = ref(false)

const currentLang = computed(() => locale.value)

const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
  localStorage.setItem('language', locale.value)
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark-mode', isDark.value)
  localStorage.setItem('darkMode', isDark.value)
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 40
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
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

onMounted(() => {
  const saved = localStorage.getItem('darkMode') === 'true'
  isDark.value = saved
  document.body.classList.toggle('dark-mode', saved)

  window.addEventListener('scroll', handleScroll)
  handleScroll() // Trigger initially to catch load state
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Navbar base */
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.8rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: 9999;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Transición al hacer scroll */
.navbar.scrolled {
  top: 1.25rem;
  left: 50% !important;
  transform: translateX(-50%);
  width: 90% !important;
  max-width: 1200px;
  border-radius: 18px;
  border: 1.5px solid #cbd5e1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  background-color: rgba(248, 250, 252, 0.92);
  padding: 0.4rem 1.5rem;
}

/* Logo Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 0 !important;
}

.logo-initials {
  background: linear-gradient(135deg, #e8b7cf, #875785);
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.5px;
}

.logo-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #343a40 20%, #f38cbe 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: filter 0.3s ease;
}

.logo-name:hover {
  filter: brightness(1.2);
}

/* Links */
.navbar-nav .nav-link {
  position: relative;
  padding: 0.5rem 1rem !important;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  background: linear-gradient(135deg, #343a40 20%, #f38cbe 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.25s ease;
  text-decoration: none;
}

.navbar-nav .nav-link::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #f38cbe;
  transition: all 0.25s ease;
  transform: translateX(-50%);
}

.navbar-nav .nav-link:hover::after {
  width: 60%;
}

.navbar-nav .nav-link:hover {
  filter: brightness(1.25);
  transform: translateY(-1px);
}

/* Botón de idioma (Estilo outline como captura) */
.lang-btn {
  background: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  color: #0f172a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  padding: 5px 9px;
  line-height: 1;
}

.lang-btn:hover {
  background-color: #0f172a;
  border-color: #0f172a;
  color: #ffffff;
  transform: translateY(-1px);
}

/* Botón modo oscuro */
.dark-mode-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  padding: 0;
  transition: all 0.25s ease;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.dark-mode-btn i {
  transition: transform 0.25s ease;
  display: inline-block;
}

.dark-mode-btn:hover {
  color: #0f172a;
  background-color: rgba(0, 0, 0, 0.03);
}

.dark-mode-btn:hover i {
  transform: scale(1.1) rotate(15deg);
}

/* Adaptación para pantallas oscuras */
body.dark-mode .navbar {
  background-color: rgba(30, 30, 30, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

body.dark-mode .navbar.scrolled {
  background-color: rgba(18, 18, 18, 0.9);
  border-color: #334155;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

body.dark-mode .logo-name {
  background: linear-gradient(135deg, #f1f5f9 20%, #f38cbe 80%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

body.dark-mode .navbar-nav .nav-link {
  background: linear-gradient(135deg, #cbd5e1 20%, #f38cbe 80%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

body.dark-mode .navbar-nav .nav-link:hover {
  filter: brightness(1.25);
}

body.dark-mode .lang-btn {
  color: #f1f5f9 !important;
  border-color: #475569 !important;
}

body.dark-mode .lang-btn:hover {
  background-color: #f1f5f9 !important;
  color: #0f172a !important;
  border-color: #f1f5f9 !important;
}

body.dark-mode .dark-mode-btn {
  color: #cbd5e1 !important;
}

body.dark-mode .dark-mode-btn:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.05) !important;
}

/* Responsive */
@media (max-width: 991px) {
  .navbar.scrolled {
    width: 95% !important;
    left: 50% !important;
    transform: translateX(-50%);
    border-radius: 12px;
    padding: 0.5rem 1rem;
  }

  .navbar-collapse {
    background-color: #ffffff;
    text-align: center;
    border-radius: 12px;
    padding: 1rem;
    margin-top: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .navbar-nav {
    align-items: stretch !important;
    gap: 0.5rem;
  }

  .navbar-nav .nav-item {
    width: 100%;
  }

  .navbar-nav .nav-link {
    padding: 0.6rem 0.5rem !important;
  }

  .lang-btn {
    width: 100%;
    margin: 0.5rem 0;
  }

  .dark-mode-btn {
    width: 100%;
    justify-content: center;
    padding: 0.6rem 0.5rem;
  }
}
</style>
