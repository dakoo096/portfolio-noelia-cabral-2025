<template>
  <section
    class="acerca-de-mi"
    id="acerca-de-mi"
    data-aos="fade-in"
    data-aos-easing="ease-in-sine"
    data-aos-offset="100"
    data-aos-duration="500"
  >
    <ParticleBackground />
    <h2>{{ $t('acerca_de_mi.titulo') }}</h2>

    <div class="acerca-de-mi-grid">
      <!-- Columna izquierda: Biografía -->
      <div class="bio-col">
        <p>{{ $t('acerca_de_mi.p1') }}</p>
        <p>{{ $t('acerca_de_mi.p2') }}</p>
        <p>{{ $t('acerca_de_mi.p3') }}</p>
      </div>

      <!-- Columna derecha: Tarjeta de estado -->
      <div class="status-col">
        <div class="status-card">
          <div class="status-header">
            <span class="status-title">{{ $t('acerca_de_mi.status_card.titulo') }}</span>
            <span class="status-badge">
              <span class="pulse-dot"></span>
              {{ $t('acerca_de_mi.status_card.disponible') }}
            </span>
          </div>

          <div class="status-body">
            <div class="status-item">
              <span class="label">{{ $t('acerca_de_mi.status_card.ubicacion') }}</span>
              <span class="value">{{ $t('acerca_de_mi.status_card.ubicacion_val') }}</span>
            </div>

            <div class="status-item">
              <span class="label">{{ $t('acerca_de_mi.status_card.horario') }}</span>
              <span class="value">{{ $t('acerca_de_mi.status_card.horario_val') }}</span>
            </div>

            <div class="status-item">
              <span class="label">{{ $t('acerca_de_mi.status_card.modalidad') }}</span>
              <span class="value">{{ $t('acerca_de_mi.status_card.modalidad_val') }}</span>
            </div>

            <div class="status-item">
              <span class="label">{{ $t('acerca_de_mi.status_card.idiomas') }}</span>
              <span class="value">{{ $t('acerca_de_mi.status_card.idiomas_val') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ParticleBackground from './ParticleBackground.vue'
import { onMounted } from 'vue'

let observer = null
let lastScrollY = 0

const hacerShine = () => {
  const section = document.querySelector('.acerca-de-mi')
  if (!section) return

  section.classList.remove('shine')
  void section.offsetWidth
  section.classList.add('shine')
}

onMounted(() => {
  const section = document.querySelector('#acerca-de-mi')
  if (!section) return

  observer = new IntersectionObserver(
    (entries) => {
      const currentScrollY = window.scrollY

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const scrollingDown = currentScrollY > lastScrollY
          if (scrollingDown) {
            hacerShine()
          }
        }
      })
      lastScrollY = currentScrollY
    },
    { threshold: 0.25 },
  )

  observer.observe(section)
})
</script>

<style scoped>
.acerca-de-mi {
  position: relative;
  width: 90%;
  margin: 3rem auto;
  background: linear-gradient(135deg, #f8f8f87c, #eaeaea71);
  transition: all 0.5s;
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  text-align: center;
  cursor: default;
  overflow: hidden;
}

.acerca-de-mi-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 3rem;
  text-align: left;
  margin-top: 1rem;
}

.bio-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bio-col p {
  line-height: 1.8;
  font-size: 1.05rem;
  font-weight: 500;
  color: #475569;
  text-align: justify;
  margin-bottom: 1.2rem;
}

.bio-col p:last-child {
  margin-bottom: 0;
}

/* Tarjeta de Estado */
.status-col {
  display: flex;
  align-items: center;
}

.status-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(4px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.status-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(232, 183, 207, 0.25);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  margin-bottom: 0.5rem;
}

.status-title {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.08em;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #16a34a;
  background: rgba(22, 163, 74, 0.1);
  padding: 4px 10px;
  border-radius: 9999px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}

.pulse-dot::after {
  content: '';
  width: 100%;
  height: 100%;
  background-color: #22c55e;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}

.status-body {
  display: flex;
  flex-direction: column;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
}

.status-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.status-item .label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

.status-item .value {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
}

/* TÍTULO */
.acerca-de-mi h2 {
  position: relative;
  z-index: 1;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #343a40 20%, #f38cbe 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  margin-bottom: 2.5rem;
  display: inline-block;
  transition: all 0.3s ease;
}

.acerca-de-mi h2:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.acerca-de-mi h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 6px;
  background: linear-gradient(90deg, #e8b7cf, #e3c3e8);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(232, 183, 207, 0.4);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .acerca-de-mi-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .acerca-de-mi {
    padding: 2rem 1.2rem;
  }

  .acerca-de-mi h2 {
    font-size: 1.8rem;
  }

  .bio-col p {
    font-size: 0.98rem;
  }

  .status-item {
    padding: 0.75rem 0;
  }
}

@media (max-width: 400px) {
  .acerca-de-mi h2 {
    font-size: 1.2rem;
  }

  .bio-col p {
    font-size: 0.85rem;
  }

  .status-card {
    padding: 1rem;
  }

  .status-item .label,
  .status-item .value {
    font-size: 0.78rem;
  }
}
</style>
