<template>
  <section class="formulario my-5" id="contacto" data-aos="fade-in" data-aos-easing="ease-in-sine" data-aos-offset="100"
    data-aos-duration="500">
    <ParticleBackground />

    <h2 class="text-center">Contacto</h2>
    <div class="formulario-container d-flex">
      <!-- Imagen -->
      <div class="col-lg-5 col img-fluid container-imagen">
        <img src="/img/caricaturacontacto-2.png" alt="caricatura señalando a la derecha del formulario"
          class="floating-img" />
      </div>

      <!-- Formulario -->
      <div class="formulario-derecha col-lg-7">
        <div class="info-formulario">
          <h3 class="text-center">¿Querés saber más sobre mí o tenés alguna consulta?</h3>
          <p>Completá el formulario y enviame tu mensaje. Me pondré en contacto con vos a la brevedad. ¡Gracias por tu
            interés!</p>
        </div>
        <form id="contact-form" class="text-center contact-form" @submit.prevent="enviarFormulario" ref="formRef">
          <div class="mb-3">
            <label for="asunto" class="form-label">Asunto:</label>
            <input type="text" class="form-control" id="asunto" name="asunto" v-model="asunto" required />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico:</label>
            <input type="email" class="form-control" id="email" name="email" v-model="email" required />
          </div>

          <div class="mb-3">
            <label for="mensaje" class="form-label">Escriba su consulta aquí:</label>
            <textarea class="form-control" id="mensaje" name="mensaje" rows="3" v-model="mensaje" required></textarea>
          </div>

          <div class="formulario-boton">
            <button type="submit" class="btn" ref="botonRef">Enviar</button>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import ParticleBackground from "./ParticleBackground.vue";

/* =========================
   EMAILJS
========================= */

// Inicializa EmailJS
emailjs.init("NMgydeVAgi1o6iWWP");

// Campos del formulario
const asunto = ref("");
const email = ref("");
const mensaje = ref("");

// Refs del DOM
const botonRef = ref(null);

// Función para enviar formulario
const enviarFormulario = async () => {
  const boton = botonRef.value;

  boton.textContent = "Enviando mensaje...";
  boton.disabled = true;

  const templateParams = {
    asunto: asunto.value,
    email: email.value,
    mensaje: mensaje.value,
  };

  try {
    await emailjs.send("service_ynvt8os", "template_bb4i0ml", templateParams);

    Swal.fire({
      title: '¡Mensaje enviado!',
      html: `
        <div class="py-4">
          <div class="text-4xl animate-bounce mb-3">✨</div>
          <p class="text-gray-600 font-medium">Gracias por contactarme. <br> Te responderé a la brevedad. 🌸</p>
        </div>
      `,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      background: "#ffffff",
      color: "#343a40",
      backdrop: `rgba(0, 0, 0, 0.6)`,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      },
      customClass: {
        popup: 'rounded-30 shadow-2xl border-none',
        timerProgressBar: 'bg-gradient-pink'
      }
    });

    asunto.value = "";
    email.value = "";
    mensaje.value = "";

    boton.textContent = "Enviar";
    boton.disabled = false;

  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hubo un error al enviar el mensaje. Por favor, intentalo de nuevo.",
      confirmButtonColor: "#f38cbe",
    });

    boton.textContent = "Enviar";
    boton.disabled = false;
  }
};

/* =========================
   EFECTO SHINE SCROLL
========================= */

let observer = null;
let lastScrollY = 0;

const hacerShine = () => {
  const section = document.querySelector(".formulario");
  if (!section) return;

  section.classList.remove("shine");
  void section.offsetWidth;
  section.classList.add("shine");
};

onMounted(() => {
  const section = document.querySelector("#contacto");
  if (!section) return;

  observer = new IntersectionObserver(
    (entries) => {
      const currentScrollY = window.scrollY;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const scrollingDown = currentScrollY > lastScrollY;

          if (scrollingDown) {
            hacerShine();
          }
        }
      });

      lastScrollY = currentScrollY;
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
});
</script>


<style scoped>
/*------------ CONTACTO ------------*/
.formulario {
  position: relative;
  width: 90%;
  margin: 3rem auto;
  padding: 2rem 0 0;
  background: linear-gradient(135deg, #f8f8f87c, #eaeaea71);
  transition: all 0.5s;
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  border-radius: 20px;
  text-align: center;
  cursor: default;
  overflow: hidden;
}

.formulario h2 {
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

.formulario h2:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.formulario h2::after {
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

.formulario-container {
  position: relative;
  z-index: 1;
  margin: 10px 0 0 0;
  padding: 0;
  font-size: 1.5rem;
  transition: all 0.5s;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  justify-content: center;
  background-image: url(/img/fondo-lofi-dia-inverse.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 20px 20px;
  flex-wrap: wrap;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.formulario-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  z-index: 0;
}

.formulario-container>* {
  position: relative;
  z-index: 1;
}


.container-imagen {
  padding-left: 0 !important;
  margin-left: 0 !important;
  display: flex;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  z-index: 2;

}


.container-imagen img {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 35rem;
  max-width: 100%;
  object-fit: contain;
  z-index: 1;
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



.formulario-derecha {
  padding: 2rem;
  border-radius: 0 0 20px 0;
}

.info-formulario {
  text-align: center;
  margin-bottom: 1rem;
}

.info-formulario h3 {
  background-color: #eeeeee;
  padding: 1rem;
  border-radius: 20px;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.info-formulario p {
  font-size: 1.1rem;
  padding: 1rem;
  color: #444;
}

/* INPUT STYLES */
.form-control {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  background: #fff;
  border-color: #e8b7cf;
  box-shadow: 0 0 0 4px rgba(232, 183, 207, 0.2);
  outline: none;
}

.form-label {
  font-weight: 600;
  color: #343a40;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left;
}

.formulario-boton {
  margin: 10px;
  text-align: center;
}

.formulario-boton button {
  background: linear-gradient(135deg, #fdfdfd, #f5f5f5);
  color: #343a40;
  font-weight: 700;
  padding: 0.8rem 2.5rem;
  border-radius: 16px;
  font-size: 1.1rem;
  border: 1px solid rgba(232, 183, 207, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.formulario-boton button:hover {
  background: linear-gradient(90deg, #e8b7cf, #e3c3e8);
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0px 12px 24px rgba(232, 183, 207, 0.5);
  color: #fff;
  border-color: transparent;
}

.formulario-boton button:active {
  transform: translateY(-2px) scale(1);
  box-shadow: 0px 6px 12px rgba(232, 183, 207, 0.4);
}

/* Animación suave */
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

:deep(.rounded-30) {
  border-radius: 30px !important;
}

:deep(.bg-gradient-pink) {
  background: linear-gradient(90deg, #f38cbe, #e3c3e8) !important;
}

/* ======= TABLET (max-width: 992px) ======= */
@media (max-width: 992px) {

  .formulario-container {
    flex-direction: column;
  }


  .container-imagen {
    display: none;
  }

  .formulario-derecha {
    width: 100%;
    background-color: rgba(245, 245, 245, 0.8);
  }

  .info-formulario h3 {
    font-size: 1.6rem;
  }

  .info-formulario p {
    font-size: 1rem;
  }
}


@media (max-width: 576px) {

  .formulario h2 {
    font-size: 1.7rem;
    padding: 1rem;
  }

  .formulario-container {
    background-size: cover;
  }

  .info-formulario h3 {
    font-size: 1.3rem;
    padding: 0.2rem;
  }

  .info-formulario p {
    font-size: 0.9rem;
    padding: 0.2em;
  }

  .formulario-boton button {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
  }
}

@media (max-width: 400px) {

  .formulario h2 {
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .info-formulario h3 {
    font-size: 0.8rem;
    padding: 0.2rem;
  }

  .formulario-container {
    font-size: 0.8rem;
    position: relative;
  }

  .formulario-container>* {
    position: relative;
    z-index: 2;
  }

  .info-formulario p {
    font-size: 0.8rem;
    padding: 0.2rem;
  }

  .formulario-boton button {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
}
</style>
