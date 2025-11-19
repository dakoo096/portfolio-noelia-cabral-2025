<template>
  <section class="mis-proyectos" id="mis-proyectos" data-aos="fade-in" data-aos-easing="ease-in-sine"
    data-aos-offset="100" data-aos-duration="500">
    <h2>Mis Proyectos</h2>
    <p class="subtitulo">
      Selección de algunos de mis proyectos de practica y personales, desarrollados con diversas tecnologías y enfoques.
    </p>

    <div class="mis-proyectos-container">
      <div class="proyectos-grid">
        <ProyectoCard v-for="(proyecto, index) in proyectos" :key="index" :titulo="proyecto.titulo"
          :descripcion="proyecto.descripcion" :imagenes="proyecto.imagenes" :link="proyecto.link" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProyectoCard from './ProyectoCard.vue'
import { onMounted } from 'vue'
const proyectos = [
  {
    titulo: 'Clínica Veterinaria – Web App',
    descripcion:
      'Aplicación web completa desarrollada con Spring Boot, MySQL y Thymeleaf. Permite gestionar dueños, mascotas y atenciones veterinarias, incluyendo historial, edición, eliminación, sesión de usuarios y seguridad con Spring Security. Integración de usuario logueado en el registro de atención y arquitectura escalable.',
    imagenes: [
      './img/proyecto1/veterinaria1.png',
      './img/proyecto1/veterinaria2.png',
      './img/proyecto1/veterinaria3.png',
      './img/proyecto1/veterinaria4.png',
      './img/proyecto1/veterinaria5.png',
    ],
    link: 'https://github.com/dakoo096/clinicaVeterinaria'
  },
  {
    titulo: 'Blog Personal',
    descripcion:
      'Plataforma donde los usuarios pueden crear, editar, borrar y comentar publicaciones. Incluye autenticación, control de privacidad, permisos por usuario, carga dinámica de posts, y una interfaz cuidada y completamente responsive.',
    imagenes: [
      './img/proyecto2/blog1.jpeg',
      './img/proyecto2/blog2.jpeg',
      './img/proyecto2/blog3.jpeg',
      './img/proyecto2/blog4.jpeg',
      './img/proyecto2/blog5.jpeg',
    ],
    link: 'https://github.com/dakoo096/mi-blog-personal.git'
  },
  {
    titulo: 'Biblioteca Virtual',
    descripcion:
      'Sistema CRUD para registrar libros por título, autor e ISBN. Desarrollado con Java, Spring Boot y MySQL. Posee vistas con Thymeleaf, validaciones, listados ordenados y edición directa desde el panel.',
    imagenes: [
      './img/proyecto3/biblioteca1.png',
      './img/proyecto3/biblioteca2.png',
      './img/proyecto3/biblioteca3.png',
    ],
    link: 'https://github.com/dakoo096/Biblioteca.git'
  },
  {
    titulo: 'Login con Sistema de Roles',
    descripcion:
      'Aplicación de escritorio creada con Java y Swing, utilizando arquitectura por capas. Incluye validación de usuario, roles dinámicos y vistas específicas. Permite CRUD de usuarios con refresco automático.',
    imagenes: [
      './img/proyecto4/roles1.jpeg',
      './img/proyecto4/roles2.jpeg',
      './img/proyecto4/roles3.jpeg',
      './img/proyecto4/roles4.jpeg',
    ],
    link: 'https://github.com/dakoo096/Login-Usuarios'
  },
  {
    titulo: 'Peluquería Canina',
    descripcion:
      'App de escritorio con Java y Swing para gestión de mascotas y dueños. Relación 1:1, modelo por capas, tabla editable y persistencia completa.',
    imagenes: [
      './img/proyecto5/peluqueria1.jpeg',
      './img/proyecto5/peluqueria2.jpeg',
      './img/proyecto5/peluqueria3.jpeg',
      './img/proyecto5/peluqueria4.jpeg',
      './img/proyecto5/peluqueria5.jpeg',
    ],
    link: 'https://github.com/dakoo096/peluqueria-canina'
  },
  {
    titulo: 'Concesionaria de Automóviles',
    descripcion:
      'Sistema en Java y Swing que permite carga, edición, lectura y eliminación de vehículos utilizando arquitectura IGU – Lógica – Persistencia.',
    imagenes: [
      './img/proyecto6/conse1.jpeg',
      './img/proyecto6/conse2.jpeg',
      './img/proyecto6/conse3.jpeg',
      './img/proyecto6/conse4.jpeg',
      './img/proyecto6/conse5.jpeg',
    ],
    link: 'https://github.com/dakoo096/Concesionaria-Automovil'
  },
  {
    titulo: 'Integrador CaC 2023',
    descripcion:
      'Sitio web responsive construido en HTML, CSS y JavaScript basado en un diseño de Codo a Codo. Totalmente adaptable y estéticamente moderno.',
    imagenes: [
      './img/proyecto7/cac1.png',
      './img/proyecto7/cac2.png',
      './img/proyecto7/cac3.png',
    ],
    link: 'https://dakoo096.github.io/tpIntegradorCaC/'
  }
]
let observer = null
let lastScrollY = 0


const hacerShine = () => {
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
    { threshold: 0.25 }
  )

  observer.observe(section)
})

</script>

<style scoped>
/* Contenedor general */
.mis-proyectos {
  width: 90%;
  margin: 3rem auto;
  background: linear-gradient(135deg, #f8f8f8, #eaeaea);
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  padding: 2rem 1.4rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  text-align: center;
  overflow: hidden;

}

/* Título */
.mis-proyectos h2 {
  font-size: 2.4rem;
  font-weight: 700;
  color: #343a40;
  position: relative;
  display: inline-block;
  padding-bottom: 0.4rem;
}

/* Subrayado animado */
.mis-proyectos h2::after {
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

/* Subtítulo */
.subtitulo {
  text-align: center;
  color: #555;
  font-size: 1.15rem;
  max-width: 70%;
  margin: 0.5rem auto 2.5rem;
  opacity: 0.85;
}

/* Contenedor */
.mis-proyectos-container {
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

/* GRID */
.proyectos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.6rem;
}

/* RESPONSIVE */
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
