<template>
  <section class="formulario my-5" id="contacto" data-aos="fade-in" data-aos-easing="ease-in-sine"
    data-aos-offset="100" data-aos-duration="500">
    <div id="alerta" ref="alertaRef" class="alert toast-alert" style="display: none;"></div>

    <h2 class="text-center">Contacto</h2>
    <div class="formulario-container d-flex">
      <!-- Imagen -->
      <div class="col-lg-5 col img-fluid container-imagen">
        <img src="/img/caricaturacontacto.png" alt="caricatura señalando a la derecha del formulario" />
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
const alertaRef = ref(null);

// Función para enviar formulario
const enviarFormulario = async () => {
  const boton = botonRef.value;
  const alerta = alertaRef.value;

  boton.textContent = "Enviando mensaje...";
  boton.disabled = true;

  const templateParams = {
    asunto: asunto.value,
    email: email.value,
    mensaje: mensaje.value,
  };

  // Reset visual del toast
  alerta.style.display = "none";
  alerta.className = "alert toast-alert";

  try {
    await emailjs.send("service_ynvt8os", "template_bb4i0ml", templateParams);

    alerta.textContent = "Su mensaje fue enviado con éxito";
    alerta.classList.add("alert-success");
    alerta.style.display = "block";

    asunto.value = "";
    email.value = "";
    mensaje.value = "";

    boton.textContent = "Enviar";
    boton.disabled = false;

    setTimeout(() => {
      alerta.style.display = "none";
    }, 3000);

  } catch (error) {
    console.error(error);

    alerta.textContent = "Hubo un error, intente nuevamente.";
    alerta.classList.add("alert-danger");
    alerta.style.display = "block";

    boton.textContent = "Enviar";
    boton.disabled = false;

    setTimeout(() => {
      alerta.style.display = "none";
    }, 3000);
  }
};

/* =========================
   EFECTO SHINE SCROLL
========================= */

let observer = null;
let lastScrollY = 0;

const hacerShine = () => {
  const section = document.querySelector(".mis-proyectos");
  if (!section) return;

  section.classList.remove("shine");
  void section.offsetWidth;
  section.classList.add("shine");
};

onMounted(() => {
  const section = document.querySelector("#mis-proyectos");
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
  width: 90%;
  margin: 3rem auto;
  padding: 2rem 0 0;
  margin: 3rem auto;
  background: linear-gradient(135deg, #f8f8f8, #eaeaea);
  transition: all 0.5s;
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  border-radius: 20px;
  text-align: center;

}

.formulario h2 {
  text-align: center;
  font-size: 2.4rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.4rem;
  font-weight: 700;
  color: #343a40;
  padding-bottom: 0.4rem;

}

.formulario h2::after {
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

.formulario-container {
  margin: 10px 0 0 0;
  padding: 0;
  font-size: 1.5rem;
  transition: all 0.5s;
  box-shadow: 0px 1px 4px 1px rgba(44, 26, 44, 0.3);
  justify-content: center;
  background-image: url(/img/fondoportada.png);
  border-radius: 0 0 20px 20px;
  background-repeat: no-repeat;
  background-size: cover;
  flex-wrap: wrap;

}


.container-imagen {
  padding-left: 0 !important;
  margin-left: 0 !important;
  display: flex;
  justify-content: flex-start;
}

.container-imagen img {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

.formulario-derecha {
  padding: 1rem;
  background-color: rgba(245, 245, 245, 0.5);
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
  font-size: 1rem;
  padding: 1rem;
}

.formulario-boton {
  margin: 10px;
  text-align: center;
}

.formulario-boton button {
  background-color: #DEA8D7;

  font-weight: 600;
  padding: 0.5rem 2rem;
  border-radius: 20px;
  font-size: 1rem;
  transition: all 0.3s;
}

.formulario-boton button:hover {
  background-color: #D295C6;
}

.toast-alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 260px;
  text-align: center;
  padding: 12px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeDown 0.35s ease-out forwards;
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

/* ======= TABLET (max-width: 992px) ======= */
@media (max-width: 992px) {

  .formulario-container {
    flex-direction: column;
    padding: 1rem;
  }


  .container-imagen {
    display: none;
  }

  .formulario-derecha {
    width: 100%;
    border-radius: 20px;
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
    padding: 0.5rem;
    border-radius: 0;
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

  .formulario-container{
    font-size: 0.8rem;
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
