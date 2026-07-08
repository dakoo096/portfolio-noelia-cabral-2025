<template>
  <section
    class="mi-stack"
    id="mi-stack"
    data-aos="fade-in"
    data-aos-easing="ease-in-sine"
    data-aos-offset="100"
    data-aos-duration="500"
  >
    <ParticleBackground />
    <h2>{{ $t('stack.titulo') }}</h2>
    <p class="subtitulo" v-html="$t('stack.subtitulo')"></p>

    <div class="mi-stack-container">
      <div class="categoria-stack" v-for="(categoria, index) in categorias" :key="index">
        <h3>{{ categoria.titulo }}</h3>
        <div class="categoria-cards">
          <StackCard
            v-for="(skill, idx) in categoria.skills"
            :key="idx"
            :icono="skill.icono"
            :nombre="skill.nombre"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import StackCard from './StackCard.vue'
import ParticleBackground from './ParticleBackground.vue'
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const categorias = computed(() => [
  {
    titulo: t('stack.categorias.frontend'),
    skills: [
      { icono: './img/logos/html.png', nombre: 'HTML5' },
      { icono: './img/logos/css.png', nombre: 'CSS3' },
      { icono: './img/logos/javascript.png', nombre: 'JavaScript' },
      { icono: './img/logos/bootstrap.png', nombre: 'Bootstrap' },
      { icono: './img/logos/tailwindcss.svg', nombre: 'Tailwind CSS' },
      { icono: './img/logos/vue.png', nombre: 'Vue' },
      { icono: './img/logos/quasar.png', nombre: 'Quasar' },
      { icono: './img/logos/ionic_logo.png', nombre: 'Ionic' },
      { icono: './img/logos/pinia.png', nombre: 'Pinia' },
      { icono: './img/logos/vite.png', nombre: 'Vite' },
    ],
  },
  {
    titulo: t('stack.categorias.backend'),
    skills: [
      { icono: './img/logos/java.png', nombre: 'Java' },
      { icono: './img/logos/springboot.png', nombre: 'Spring Boot' },
      { icono: './img/logos/springcloud.png', nombre: 'Spring Cloud' },
      { icono: './img/logos/springsecurity.png', nombre: 'Spring Security' },
      { icono: './img/logos/php.png', nombre: 'PHP' },
      { icono: './img/logos/logopython.png', nombre: 'Python' },
      { icono: './img/logos/logofastapi.svg', nombre: 'FastAPI' },
    ],
  },
  {
    titulo: t('stack.categorias.herramientas'),
    skills: [
      { icono: './img/logos/git.png', nombre: 'Git' },
      { icono: './img/logos/github.png', nombre: 'Github' },
      { icono: './img/logos/gitlab.png', nombre: 'GitLab' },
      { icono: './img/logos/trello.png', nombre: 'Trello' },
      { icono: './img/logos/mysql.png', nombre: 'MySQL' },
      { icono: './img/logos/postgresql.png', nombre: 'PostgreSQL' },
      { icono: './img/logos/postman.png', nombre: 'Postman' },
    ],
  },
  {
    titulo: t('stack.categorias.testing'),
    skills: [{ icono: './img/logos/cypress.png', nombre: 'Cypress' }],
  },
  {
    titulo: t('stack.categorias.otros'),
    skills: [
      { icono: './img/logos/godot.png', nombre: 'Godot' },
      { icono: './img/logos/zbrush.png', nombre: 'ZBrush' },
    ],
  },
])

let observer = null
let lastScrollY = 0

const hacerShine = () => {
  const section = document.querySelector('.mi-stack')
  if (!section) return

  section.classList.remove('shine')
  void section.offsetWidth
  section.classList.add('shine')
}

onMounted(() => {
  const section = document.querySelector('#mi-stack')
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
.mi-stack {
  position: relative;
  width: 90%;
  margin: 3rem auto;
  background: linear-gradient(135deg, #f8f8f87c, #eaeaea71);
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  padding: 2rem 1.4rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  text-align: center;
  cursor: default;
  overflow: hidden;
}

.mi-stack h2 {
  position: relative;
  z-index: 1;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #343a40 20%, #f38cbe 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
  display: inline-block;
  transition: all 0.3s ease;
}

.mi-stack h2:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

p {
  line-height: 1.7;
  color: #6f6f6f;
}

.mi-stack h2::after {
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

.subtitulo {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #555;
  font-size: 1.15rem;
  max-width: 70%;
  margin: 0.5rem auto 2.5rem;
  opacity: 0.85;
}

.mi-stack-container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

/* Tarjetas de categoría */
.categoria-stack {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(4px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.categoria-stack:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(232, 183, 207, 0.25);
  border-color: rgba(232, 183, 207, 0.6);
}

.categoria-stack h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  text-align: left;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding-bottom: 0.6rem;
}

.categoria-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.55rem;
}

/* Responsivo */
@media (max-width: 1200px) {
  .mi-stack-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .mi-stack-container {
    grid-template-columns: 1fr;
  }

  .mi-stack h2 {
    font-size: 1.8rem;
  }

  .categoria-stack h3 {
    font-size: 0.95rem;
  }
}

@media (max-width: 400px) {
  .mi-stack h2 {
    font-size: 1.2rem;
  }

  .subtitulo {
    font-size: 0.8rem;
    max-width: 95%;
  }

  .categoria-stack h3 {
    font-size: 1rem;
  }

  .mi-stack-container-card {
    width: 60px;
    height: 80px;
  }

  .mi-stack-container-card img {
    width: 40px;
    height: 40px;
  }
}
</style>
