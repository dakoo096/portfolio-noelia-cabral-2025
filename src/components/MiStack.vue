<template>
  <section class="mi-stack" id="mi-stack" data-aos="fade-in" data-aos-easing="ease-in-sine" data-aos-offset="100"
    data-aos-duration="500">
    <h2>Mis Habilidades</h2>
    <p class="subtitulo">
      Aquí presento las tecnologías que uso en mis proyectos: frontend, backend, bases de datos, herramientas de
      desarrollo y testing.
      <br>
      Es el stack con el que trabajo día a día y en el que sigo creciendo como profesional.
    </p>

    <div class="mi-stack-container">
      <div class="categoria-stack" v-for="(categoria, index) in categorias" :key="index">
        <h3>{{ categoria.titulo }}</h3>
        <div class="categoria-cards">
          <StackCard v-for="(skill, idx) in categoria.skills" :key="idx" :icono="skill.icono" :nombre="skill.nombre" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import StackCard from './StackCard.vue'
import { onMounted } from 'vue'


const categorias = [
  {
    titulo: "Frontend",
    skills: [
      { icono: "./img/logos/html.png", nombre: "HTML5" },
      { icono: "./img/logos/css.png", nombre: "CSS3" },
      { icono: "./img/logos/javascript.png", nombre: "JavaScript" },
      { icono: "./img/logos/bootstrap.png", nombre: "Bootstrap" },
      { icono: "./img/logos/vue.png", nombre: "Vue" },
      { icono: "./img/logos/quasar.png", nombre: "Quasar" },
    ]
  },
  {
    titulo: "Backend",
    skills: [
      { icono: "./img/logos/java.png", nombre: "Java" },
      { icono: "./img/logos/springboot.png", nombre: "SpringBoot" },
      { icono: "./img/logos/php.png", nombre: "PHP" },
    ],
  },
  {
    titulo: "Herramientas y Bases de Datos",
    skills: [
      { icono: "./img/logos/git.png", nombre: "Git" },
      { icono: "./img/logos/github.png", nombre: "Github" },
      { icono: "./img/logos/gitlab.png", nombre: "GitLab" },
      { icono: "./img/logos/trello.png", nombre: "Trello" },
      { icono: "./img/logos/mysql.png", nombre: "MySQL" },
      { icono: "./img/logos/postgresql.png", nombre: "PostgreSQL" },
      { icono: "./img/logos/postman.png", nombre: "Postman" },
    ],
  },
  {
    titulo: "Testing / QA",
    skills: [
      { icono: "./img/logos/cypress.png", nombre: "Cypress" },
    ],
  },
  {
    titulo: "Desarrollo de videojuegos / Diseño 3D",
    skills: [
      { icono: "./img/logos/godot.png", nombre: "Godot" },
      { icono: "./img/logos/zbrush.png", nombre: "ZBrush" },
    ],
  },
]

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
    { threshold: 0.25 }
  )

  observer.observe(section)
})
</script>

<style scoped>
.mi-stack {
  width: 90%;
  margin: 3rem auto;
  background: linear-gradient(135deg, #f8f8f8, #eaeaea);
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  padding: 2rem 1.4rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  text-align: center;
  cursor: default;
}

.mi-stack h2 {
  text-align: center;
  font-size: 2.4rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.4rem;
  font-weight: 700;
  color: #343a40;
  padding-bottom: 0.4rem;
}

.mi-stack h2::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, #D295C6, #D295C6);
  border-radius: 2px;
  animation: underline 1s ease forwards;
}

@keyframes underline {
  to {
    width: 80%;
  }
}

.subtitulo {
  text-align: center;
  color: #555;
  font-size: 1.15rem;
  max-width: 70%;
  margin: 0.5rem auto 2.5rem;
  opacity: 0.85;
}

.mi-stack-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Tarjetas de categoría */
.categoria-stack {
  background-color: #fff;
  border-radius: 14px;
  padding: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

}

.categoria-stack:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

}

.categoria-stack h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #343a40;
  margin-bottom: 1rem;
  text-align: center;
}

.categoria-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  /* antes 1rem */
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
    font-size: 1.1rem;
  }

  .mi-stack-container-card {
    width: 80px;
    height: 100px;
  }

  .mi-stack-container-card img {
    width: 50px;
    height: 50px;
  }
}
@media (max-width: 400px) {
  .mi-stack h2{
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
