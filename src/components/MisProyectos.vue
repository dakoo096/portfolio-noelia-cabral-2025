<template>
  <section class="mis-proyectos" id="mis-proyectos" data-aos="fade-in" data-aos-easing="ease-in-sine"
    data-aos-offset="100" data-aos-duration="500">
    <ParticleBackground />
    <h2>{{ $t('proyectos.titulo') }}</h2>
    <p class="subtitulo">
      {{ $t('proyectos.subtitulo') }}
    </p>

    <div class="mis-proyectos-container">
      <!-- Sección Proyectos Laborales -->
      <div class="proyectos-seccion">
        <h3 class="proyectos-subseccion-titulo">
          <span class="bullet">•</span> {{ $t('proyectos.laborales') }}
        </h3>
        <div class="proyectos-grid">
          <ProyectoCard v-for="(proyecto, index) in proyectosLaborales" :key="'laboral-' + index"
            :titulo="proyecto.titulo" :descripcion="proyecto.descripcion" :imagenes="proyecto.imagenes"
            :link="proyecto.link" :video="proyecto.video" :tecnologias="proyecto.tecnologias"
            :esLaboral="proyecto.esLaboral" :badgeText="proyecto.badgeText" />
        </div>
      </div>

      <!-- Sección Proyectos Personales & Destacados -->
      <div class="proyectos-seccion">
        <h3 class="proyectos-subseccion-titulo">
          <span class="bullet">•</span> {{ $t('proyectos.personales') }}
        </h3>
        <div class="proyectos-grid">
          <ProyectoCard v-for="(proyecto, index) in proyectosDestacados" :key="'destacado-' + index"
            :titulo="proyecto.titulo" :descripcion="proyecto.descripcion" :imagenes="proyecto.imagenes"
            :link="proyecto.link" :video="proyecto.video" :tecnologias="proyecto.tecnologias" />
        </div>
      </div>

      <!-- Sección Otros Proyectos -->
      <div class="proyectos-seccion">
        <h3 class="proyectos-subseccion-titulo">
          <span class="bullet">•</span> {{ $t('proyectos.otros') }}
        </h3>
        <div class="proyectos-grid">
          <ProyectoCard v-for="(proyecto, index) in otrosProyectos" :key="'otro-' + index" :titulo="proyecto.titulo"
            :descripcion="proyecto.descripcion" :imagenes="proyecto.imagenes" :link="proyecto.link"
            :video="proyecto.video" :tecnologias="proyecto.tecnologias" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProyectoCard from './ProyectoCard.vue'
import ParticleBackground from './ParticleBackground.vue'
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const proyectosLaborales = computed(() => [
  {
    titulo: t('proyectos.mbta.titulo'),
    descripcion: t('proyectos.mbta.desc'),
    imagenes: ['./img/mbta/mbta1.svg'],
    esLaboral: true,
    badgeText: 'Municipalidad de Córdoba',
    tecnologias: [
      { icono: './img/logos/vue.png', nombre: 'Vue 3' },
      { icono: './img/logos/quasar.png', nombre: 'Quasar Framework' },
      { icono: './img/logos/logofastapi.svg', nombre: 'FastAPI' },
      { icono: './img/logos/logopython.png', nombre: 'Python' },
      { icono: './img/logos/php.png', nombre: 'PHP' },
      { icono: './img/logos/postgresql.png', nombre: 'PostgreSQL' },
      { icono: './img/logos/pinia.png', nombre: 'Pinia' },
      { icono: './img/logos/vite.png', nombre: 'Vite' },
    ],
  },
  {
    titulo: t('proyectos.geoportal.titulo'),
    descripcion: t('proyectos.geoportal.desc'),
    imagenes: ['./img/geoportal/geoportal1.svg'],
    esLaboral: true,
    badgeText: 'Municipalidad de Córdoba • GIS',
    tecnologias: [
      { icono: './img/logos/vue.png', nombre: 'Vue 3' },
      { icono: './img/logos/quasar.png', nombre: 'Quasar Framework' },
      { icono: './img/logos/vite.png', nombre: 'Vite' },
      { icono: './img/logos/logofastapi.svg', nombre: 'FastAPI' },
      { icono: './img/logos/logopython.png', nombre: 'Python' },
      { icono: './img/logos/postgresql.png', nombre: 'PostgreSQL' },
    ],
  },
])

const proyectosDestacados = computed(() => [
  {
    titulo: t('proyectos.devdaily.titulo'),
    descripcion: t('proyectos.devdaily.desc'),
    imagenes: [
      './img/proyecto9/devbloom 0.png',
      './img/proyecto9/devbloom 1.png',
      './img/proyecto9/devbloom 2.png',
      './img/proyecto9/devbloom 3.png',
      './img/proyecto9/devbloom 4.png',
      './img/proyecto9/devbloom 5.png',
    ],
    link: 'https://github.com/dakoo096/devdaily',
    tecnologias: [
      { icono: './img/logos/ionic_logo.png', nombre: 'Ionic' },
      { icono: './img/logos/vue.png', nombre: 'Vue.js' },
      { icono: './img/logos/pinia.png', nombre: 'Pinia' },
      { icono: './img/logos/java.png', nombre: 'Java' },
      { icono: './img/logos/springboot.png', nombre: 'Spring Boot' },
      { icono: './img/logos/springsecurity.png', nombre: 'Spring Security' },
    ],
  },
  {
    titulo: t('proyectos.ecommerce.titulo'),
    descripcion: t('proyectos.ecommerce.desc'),
    imagenes: [
      './img/proyecto8/ecommerce5.jpeg',
      './img/proyecto8/ecommerce6.jpeg',
      './img/proyecto8/ecommerce1.jpeg',
      './img/proyecto8/ecommerce2.jpeg',
      './img/proyecto8/ecommerce3.jpeg',
      './img/proyecto8/ecommerce4.jpeg',
    ],
    link: 'https://github.com/dakoo096/repo-microservicios-tienda',
    tecnologias: [
      { icono: './img/logos/java.png', nombre: 'Java' },
      { icono: './img/logos/springboot.png', nombre: 'Spring Boot' },
      { icono: './img/logos/springcloud.png', nombre: 'Spring Cloud' },
      { icono: './img/logos/mysql.png', nombre: 'MySQL' },
      { icono: './img/logos/vue.png', nombre: 'Vue.js' },
      { icono: './img/logos/pinia.png', nombre: 'Pinia' },
    ],
  },
  {
    titulo: t('proyectos.veterinaria.titulo'),
    descripcion: t('proyectos.veterinaria.desc'),
    imagenes: [
      './img/proyecto1/clinica 1.png',
      './img/proyecto1/clinica 2.png',
      './img/proyecto1/clinica 3.png',
      './img/proyecto1/clinica 4.png',
      './img/proyecto1/clinica 5.png',
      './img/proyecto1/clinica 6.png',
      './img/proyecto1/clinica 7.png',
      './img/proyecto1/clinica 8.png',
      './img/proyecto1/clinica 9.png',
      './img/proyecto1/clinica 10.png',
      './img/proyecto1/clinica 11.png',
    ],
    link: 'https://github.com/dakoo096/clinicaVeterinariaV2',
    tecnologias: [
      { icono: './img/logos/vue.png', nombre: 'Vue.js' },
      { icono: './img/logos/vite.png', nombre: 'Vite' },
      { icono: './img/logos/tailwindcss.svg', nombre: 'Tailwind CSS' },
      { icono: './img/logos/java.png', nombre: 'Java' },
      { icono: './img/logos/springboot.png', nombre: 'Spring Boot' },
      { icono: './img/logos/springsecurity.png', nombre: 'Spring Security' },
      { icono: './img/logos/mysql.png', nombre: 'MySQL' },
    ],
  },
])

const otrosProyectos = computed(() => [
  {
    titulo: t('proyectos.blog.titulo'),
    descripcion: t('proyectos.blog.desc'),
    imagenes: [
      './img/proyecto2/blog personal 1.png',
      './img/proyecto2/blog personal 2.png',
      './img/proyecto2/blog personal 3.png',
      './img/proyecto2/blog personal 4.png',
      './img/proyecto2/blog personal 5.png',
    ],
    link: 'https://github.com/dakoo096/mi-blog-personal.git',
    tecnologias: [
      { icono: './img/logos/vue.png', nombre: 'Vue.js' },
      { icono: './img/logos/vite.png', nombre: 'Vite' },
      { icono: './img/logos/java.png', nombre: 'Java' },
      { icono: './img/logos/springboot.png', nombre: 'Spring Boot' },
      { icono: './img/logos/springsecurity.png', nombre: 'Spring Security' },
      { icono: './img/logos/mysql.png', nombre: 'MySQL' },
    ],
  },
  {
    titulo: t('proyectos.biblioteca.titulo'),
    descripcion: t('proyectos.biblioteca.desc'),
    imagenes: [
      './img/proyecto3/biblioteca 1.png',
      './img/proyecto3/biblioteca 2.png',
      './img/proyecto3/biblioteca 3.png',
      './img/proyecto3/biblioteca 4.png',
      './img/proyecto3/biblioteca 5.png',
      './img/proyecto3/biblioteca 6.png',
      './img/proyecto3/biblioteca 7.png',
      './img/proyecto3/biblioteca 8.png',
      './img/proyecto3/biblioteca 9.png',
      './img/proyecto3/biblioteca 10.png',
    ],
    link: 'https://github.com/dakoo096/Biblioteca.git',
    tecnologias: [
      { icono: './img/logos/java.png', nombre: 'Java' },
      { icono: './img/logos/springboot.png', nombre: 'Spring Boot' },
      { icono: './img/logos/springsecurity.png', nombre: 'Spring Security' },
      { icono: './img/logos/mysql.png', nombre: 'MySQL' },
      { icono: './img/logos/bootstrap.png', nombre: 'Bootstrap' },
      { icono: './img/logos/thymeleaf logo.png', nombre: 'Thymeleaf' },
    ],
  },
])

let observer = null
let lastScrollY = 0

const hacerShine = () => {
  if (window.innerWidth <= 768) return
  const section = document.querySelector('.mis-proyectos')
  if (!section) return

  section.classList.remove('shine')
  void section.offsetWidth
  section.classList.add('shine')
}

onMounted(() => {
  const section = document.querySelector('#mis-proyectos')
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
/* Contenedor general */
.mis-proyectos {
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
  overflow: hidden;
  cursor: default;
}

/* Título */
.mis-proyectos h2 {
  position: relative;
  z-index: 1;
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

.mis-proyectos h2:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Subrayado animado */
.mis-proyectos h2::after {
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

/* Subtítulo */
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

/* Contenedor */
.mis-proyectos-container {
  position: relative;
  z-index: 1;
  background-color: transparent;
  border-radius: 16px;
  padding: 0.5rem 1rem;
}

/* Secciones de Proyectos */
.proyectos-seccion {
  margin-bottom: 3rem;
  text-align: left;
}

.proyectos-seccion:last-child {
  margin-bottom: 1rem;
}

.proyectos-subseccion-titulo {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3a4a;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bullet {
  color: #f38cbe;
  font-size: 1.8rem;
  line-height: 1;
}

/* GRID */
.proyectos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .proyectos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 988px) {
  .mis-proyectos h2 {
    font-size: 2rem;
  }

  .subtitulo {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .mis-proyectos {
    padding: 1.5rem;
  }

  .proyectos-grid {
    grid-template-columns: 1fr;
  }

  .proyectos-subseccion-titulo {
    font-size: 1.3rem;
  }
}

@media (max-width: 600px) {
  .mis-proyectos h2 {
    font-size: 1.7rem;
  }

  .subtitulo {
    font-size: 0.95rem;
  }
}

@media (max-width: 400px) {
  .mis-proyectos h2 {
    font-size: 1.2rem;
  }

  .subtitulo {
    font-size: 0.8rem;
    max-width: 95%;
  }

  .mis-proyectos {
    padding: 0.5rem;
  }

  .mis-proyectos-container {
    padding: 0.5rem;
  }
}
</style>
