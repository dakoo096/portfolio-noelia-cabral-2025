<template>
  <NavbarComponent />
  <div class="portada animate__animated animate__fadeIn">
    <!-- Texto Portada -->
    <div class="container-portada">
      <h1>¡Hola! Soy Noelia Cabral</h1>
      <h2 class="" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="1800">
        Desarrolladora FullStack
      </h2>
    </div>

    <!-- Imagen Portada -->
    <div class="container-portada-img" data-aos="flip-left" data-aos-delay="1800">
      <img src="/img/caricatura.png" alt="Caricatura de Noelia Cabral" />
    </div>

    <!-- Redes -->
    <div class="redes animate__animated animate__fadeIn animate__delay-2s">
      <p><a href="https://github.com/dakoo096" target="_blank"><img src="/img/githubfooter.png" alt="GitHub" /></a></p>
      <p><a href="https://www.linkedin.com/in/noelia-cabral-381723140" target="_blank"><img
            src="/img/linkedinfooter.png" alt="LinkedIn" /></a></p>
      <p><a href="/img/cv/CvCabralAraceliNoelia.pdf" target="_blank"><img src="/img/cv.png" alt="CV" /></a></p>
    </div>
  </div>
  <Redes />
</template>

<script setup>
import NavbarComponent from './MiNavbar.vue'
</script>

<style scoped>
.portada {
  position: relative;
  background-image: url(../img/fondoportada.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 40rem;
}

/* Texto Portada */
.container-portada {
  position: absolute;
  top: 30%;
  left: 3rem;
}

.container-portada h1 {
  font-size: 4rem;
  font-family: monospace;
  white-space: nowrap;
  border-right: 4px solid;
  width: 25ch;
  overflow: hidden;
  animation: typing 1.5s steps(24), blink 0.5s infinite step-end alternate;
}

.container-portada h2 {
  font-family: monospace;
  font-size: 2rem;
  margin-top: 1rem;
  padding-left: 3rem;
}

/* Imagen Portada */
.container-portada-img {
  position: absolute;
  bottom: 0;
  right: 0;
}

.container-portada-img img {
  height: 28rem;
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
  background-color: #7a7a7a6b;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);


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
  transform: scale(1.35);
  transition: all 0.3s;

}


/* Animaciones de texto */
@keyframes typing {
  from {
    width: 0;
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
</style>
