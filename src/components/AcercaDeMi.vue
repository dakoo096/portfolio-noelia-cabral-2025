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
    <div class="acerca-de-mi-container">
      <p>
        {{ $t('acerca_de_mi.p1') }}
      </p>
      <p>
        {{ $t('acerca_de_mi.p2') }}
      </p>
      <p>
        {{ $t('acerca_de_mi.p3') }}
      </p>
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
  padding: 2rem 1.4rem;
  flex-wrap: wrap;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  text-align: center;
  cursor: default;
  overflow: hidden;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.acerca-de-mi:hover .particle-canvas {
  pointer-events: auto;
}

.acerca-de-mi-container {
  position: relative;
  z-index: 1;
  display: grid;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  padding: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: justify;
  font-size: 1.1rem;
  font-weight: 500;
  color: #343a40;
  backdrop-filter: blur(4px);
}

/* TÍTULO*/
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
@media (max-width: 988px) {
  .acerca-de-mi h2 {
    font-size: 1.8rem;
  }

  .acerca-de-mi-container {
    font-size: 1.05rem;
  }
}

@media (max-width: 600px) {
  .acerca-de-mi {
    padding: 1rem;
  }

  .acerca-de-mi h2 {
    font-size: 1.7rem;
  }

  .acerca-de-mi-container {
    font-size: 1rem;
  }
}

@media (max-width: 400px) {
  .acerca-de-mi h2 {
    font-size: 1.2rem;
  }

  .acerca-de-mi-container {
    font-size: 0.8rem;
  }
}
</style>
