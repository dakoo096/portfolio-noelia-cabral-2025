<template>
  <NavbarComponent />
  <div class="portada animate__animated animate__fadeIn">
    <!-- Video de fondo (MP4 optimizado: se descarga únicamente el correspondiente al tema activo) -->
    <video
      ref="heroVideoRef"
      class="portada-video"
      :class="isDark ? 'portada-video-dark' : 'portada-video-light'"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
      :key="isDark ? 'video-dark' : 'video-light'"
    >
      <source :src="isDark ? '/portfolio-noelia-cabral-2025/img/videoPortadadarkMode.mp4' : '/portfolio-noelia-cabral-2025/img/videoPortada.mp4'" type="video/mp4" />
    </video>

    <!-- Texto Portada -->
    <div class="container-portada">
      <h1>{{ $t('header.hola') }}</h1>
      <h2 class="" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="1800">
        {{ $t('header.rol') }}
      </h2>
    </div>

    <!-- Imagen Portada con animación de flote -->
    <div class="container-portada-img" data-aos="fade-in" data-aos-delay="1800">
      <img
        src="/img/caricatura-2.webp"
        alt="Caricatura de Noelia Cabral"
        class="floating-img"
        width="422"
        height="540"
        fetchpriority="high"
        loading="eager"
        decoding="async"
      />
    </div>

    <!-- Redes -->
    <div class="redes animate__animated animate__fadeIn animate__delay-2s">
      <p>
        <a
          href="https://github.com/dakoo096"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil de GitHub de Noelia Cabral (Cabecera)"
        >
          <img src="/img/githubfooter.webp" alt="GitHub" width="45" height="45" loading="eager" decoding="async" />
        </a>
      </p>
      <p>
        <a
          href="https://www.linkedin.com/in/noelia-cabral-381723140"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil de LinkedIn de Noelia Cabral (Cabecera)"
        >
          <img src="/img/linkedinfooter.webp" alt="LinkedIn" width="45" height="45" loading="eager" decoding="async" />
        </a>
      </p>
      <p>
        <a
          href="./img/cv/Cv_Cabral_Noelia_2026.pdf"
          download
          aria-label="Descargar Curriculum Vitae de Noelia Cabral (Cabecera)"
        >
          <img src="/img/cv.webp" alt="CV" width="45" height="45" loading="eager" decoding="async" />
        </a>
      </p>
    </div>
  </div>
  <Redes />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavbarComponent from './MiNavbar.vue'

const heroVideoRef = ref(null)
const isDark = ref(false)
let bodyObserver = null

onMounted(() => {
  isDark.value =
    document.body.classList.contains('dark-mode') ||
    localStorage.getItem('darkMode') === 'true'

  bodyObserver = new MutationObserver(() => {
    isDark.value = document.body.classList.contains('dark-mode')
  })
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  if (bodyObserver) {
    bodyObserver.disconnect()
  }
})
</script>

<style scoped>
.portada {
  position: relative;
  border-bottom: 2px solid #7a7a7a6b;
  height: 45rem;
  overflow: hidden;
  cursor: default;
}

.portada-video {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0 !important;
  display: block;
}

.portada::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.15) 100%);
  z-index: 1;
  pointer-events: none;
}

.container-portada,
.container-portada-img,
.redes {
  z-index: 2;
}

/* Texto Portada */
.container-portada {
  position: absolute;
  top: 30%;
  left: 3rem;
}

.container-portada h1 {
  font-size: 4rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  white-space: nowrap;
  border-right: 4px solid;
  width: 25ch;
  overflow: hidden;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
  animation:
    typing 1.5s steps(24),
    blink 0.5s infinite step-end alternate;
}

.container-portada h2 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 2rem;
  margin-top: 1rem;
  padding-left: 3rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
}

/* Imagen Portada */
.container-portada-img {
  position: absolute;
  bottom: 0;
  right: 0;
}

.container-portada-img img {
  height: 32rem;
  width: auto;
  aspect-ratio: 422 / 540;
  object-fit: contain;
}

/* Redes sociales */
.redes {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  gap: 2rem;
}

.redes p a {
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.redes p a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

/* Íconos más grandes */
.redes img {
  width: 45px;
  height: 45px;
}

.redes p {
  transition: all 0.3s;
}

/* Hover más potente */
.redes p:hover {
  transform: scale(1.1);
}

/* Animación de flote para la caricatura */
.floating-img {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(15px);
  }

  100% {
    transform: translateY(0px);
  }
}

/* Animaciones de texto (GPU composited con clip-path) */
@keyframes typing {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

/* MEDIA QUERIES */
@media (max-width: 1200px) {
  .container-portada h1 {
    font-size: 3rem;
  }

  .container-portada h2 {
    font-size: 1.5rem;
  }

  .container-portada-img img {
    height: 45vw;
    width: auto;
    aspect-ratio: 422 / 540;
    object-fit: contain;
  }

  .redes img {
    width: 40px;
    height: 40px;
  }

  .redes p a {
    padding: 0.7rem;
  }
}

@media (max-width: 768px) {
  .portada {
    height: 35rem;
  }

  .container-portada-img img {
    height: 18rem;
    width: auto;
    aspect-ratio: 422 / 540;
    object-fit: contain;
  }

  .container-portada h1 {
    font-size: 2.5rem;
  }

  .redes {
    gap: 1.5rem;
  }

  .redes img {
    width: 35px;
    height: 35px;
  }

  .redes p a {
    padding: 0.6rem;
  }
}

@media (max-width: 600px) {
  .portada {
    height: 25rem;
  }

  .container-portada h1 {
    font-size: 1.5rem;
  }

  .container-portada h2 {
    font-size: 1rem;
  }

  .container-portada {
    left: 3rem;
  }

  .container-portada-img img {
    height: 40vw;
    width: auto;
    aspect-ratio: 422 / 540;
    object-fit: contain;
  }

  .redes {
    bottom: 0.5rem;
    gap: 1rem;
  }

  .redes img {
    width: 30px;
    height: 30px;
  }

  .redes p a {
    padding: 0.5rem;
  }

  .redes p:hover {
    transform: scale(1.2);
  }
}

@media (max-width: 400px) {
  .container-portada {
    left: 1rem;
  }

  .container-portada h1 {
    font-size: 1.2rem;
  }

  .container-portada h2 {
    font-size: 0.8rem;
  }
}

/* ===== DARK MODE: PORTADA ===== */
:global(body.dark-mode) .portada::before {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.75) 50%, rgba(9, 9, 11, 0.95) 100%) !important;
  opacity: 1 !important;
}

:global(body.dark-mode) .container-portada h1,
:global(body.dark-mode) .container-portada h2 {
  color: #f1f5f9;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8);
}
</style>
