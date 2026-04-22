<template>
  <section class="mis-proyectos" id="mis-proyectos" data-aos="fade-in" data-aos-easing="ease-in-sine"
    data-aos-offset="100" data-aos-duration="500">
    <ParticleBackground />
    <h2>Mis Proyectos</h2>
    <p class="subtitulo">
      Selección de algunos de mis proyectos de práctica y personales, desarrollados con diversas tecnologías y enfoques.
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
import ParticleBackground from './ParticleBackground.vue'
import { onMounted } from 'vue'
const proyectos = [
  {
    titulo: 'E-Commerce – Arquitectura de Microservicios',
    descripcion:
      'Aplicación web de comercio electrónico desarrollada con arquitectura de microservicios utilizando Spring Boot, Spring Cloud, Api Gateway y MySQL. El sistema se encuentra desacoplado en servicios independientes (usuarios, productos, carrito y ventas), comunicados a través de API REST y gestionados mediante un gateway centralizado. Incluye autenticación con JWT, control de roles (ADMIN/CLIENTE), carrito persistente, confirmación de compras, descuento automático de stock y manejo de sesión desde el frontend con Vue 3, Pinia y TypeScript.',
    imagenes: [
      './img/proyecto8/ecommerce5.jpeg',
      './img/proyecto8/ecommerce6.jpeg',
      './img/proyecto8/ecommerce1.jpeg',
      './img/proyecto8/ecommerce2.jpeg',
      './img/proyecto8/ecommerce3.jpeg',
      './img/proyecto8/ecommerce4.jpeg',

    ],
    link: 'https://github.com/dakoo096/repo-microservicios-tienda'
  },
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
      'Aplicación web CRUD para gestión de libros con Spring Boot, Thymeleaf y MySQL. Implementa paginación, buscador, validaciones, vistas responsivas y operaciones completas de administración.',
    imagenes: [
      './img/proyecto3/biblioteca1.png',
      './img/proyecto3/biblioteca2.png',
      './img/proyecto3/biblioteca3.png',
      './img/proyecto3/biblioteca4.png',
      './img/proyecto3/biblioteca5.png',
      './img/proyecto3/biblioteca6.png',
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
  content: "";
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

/* GRID */
.proyectos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 items per row exactly */
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
