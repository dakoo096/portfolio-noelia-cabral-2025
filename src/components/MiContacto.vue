<template>
  <section
    class="formulario my-5"
    id="contacto"
    data-aos="fade-in"
    data-aos-easing="ease-in-sine"
    data-aos-offset="100"
    data-aos-duration="500"
  >
    <ParticleBackground />

    <h2 class="text-center">{{ $t('contacto.titulo') }}</h2>

    <div class="formulario-container d-flex">
      <!-- Imagen -->
      <div class="col-lg-5 col img-fluid container-imagen">
        <img
          src="/img/caricaturacontacto-2.png"
          alt="caricatura señalando a la derecha del formulario"
          class="floating-img"
        />
      </div>

      <!-- Formulario -->
      <div class="formulario-derecha col-lg-7">
        <div class="contacto-card">
          <div class="info-formulario">
            <h3>{{ $t('contacto.subtitulo') }}</h3>
            <p>{{ $t('contacto.texto') }}</p>
          </div>

          <form
            id="contact-form"
            class="contact-form"
            @submit.prevent="enviarFormulario"
            ref="formRef"
          >
            <!-- Fila de entradas: Asunto (Nombre/Empresa) e Email -->
            <div class="form-row">
              <div class="form-group">
                <label for="asunto" class="form-label">{{ $t('contacto.labels.asunto') }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="asunto"
                  name="asunto"
                  v-model="asunto"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email" class="form-label">{{ $t('contacto.labels.email') }}</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  v-model="email"
                  required
                />
              </div>
            </div>

            <!-- Mensaje -->
            <div class="form-group mb-4">
              <label for="mensaje" class="form-label">{{ $t('contacto.labels.mensaje') }}</label>
              <textarea
                class="form-control"
                id="mensaje"
                name="mensaje"
                rows="4"
                v-model="mensaje"
                required
              ></textarea>
            </div>

            <div class="formulario-boton">
              <button type="submit" class="btn" ref="botonRef">
                <i class="bx bx-send icon-btn"></i>
                {{ $t('contacto.botones.enviar') }}
              </button>
            </div>
          </form>

          <!-- Divisor -->
          <div class="contacto-divider"></div>

          <!-- Footer Social -->
          <div class="contacto-socials-row">
            <span class="socials-label">{{ $t('contacto.o_tambien') }}</span>
            <div class="socials-buttons">
              <a
                href="https://www.linkedin.com/in/noelia-cabral-381723140"
                target="_blank"
                class="social-btn"
              >
                <i class="bx bxl-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/dakoo096" target="_blank" class="social-btn">
                <i class="bx bxl-github"></i>
                <span>GitHub</span>
              </a>
              <a href="./img/cv/Cv_Cabral_Noelia_2026.pdf" download class="social-btn cv-btn">
                <i class="bx bx-download"></i>
                <span>{{ $t('contacto.descargar_cv') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import ParticleBackground from './ParticleBackground.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/* =========================
   EMAILJS
========================= */

// Inicializa EmailJS
emailjs.init('NMgydeVAgi1o6iWWP')

// Campos del formulario
const asunto = ref('')
const email = ref('')
const mensaje = ref('')

// Refs del DOM
const botonRef = ref(null)

// Función para enviar formulario
const enviarFormulario = async () => {
  const boton = botonRef.value

  boton.textContent = t('contacto.botones.enviando')
  boton.disabled = true

  const templateParams = {
    asunto: asunto.value,
    email: email.value,
    mensaje: mensaje.value,
  }

  try {
    await emailjs.send('service_ynvt8os', 'template_bb4i0ml', templateParams)

    Swal.fire({
      title: t('contacto.swal.exito_titulo'),
      html: `
        <div class="py-4">
          <div class="text-4xl animate-bounce mb-3">✨</div>
          <p class="text-gray-600 font-medium">${t('contacto.swal.exito_texto')}</p>
        </div>
      `,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      background: '#ffffff',
      color: '#343a40',
      backdrop: `rgba(0, 0, 0, 0.6)`,
      showClass: {
        popup: 'animate__animated animate__zoomIn',
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut',
      },
      customClass: {
        popup: 'rounded-30 shadow-2xl border-none',
        timerProgressBar: 'bg-gradient-pink',
      },
    })

    asunto.value = ''
    email.value = ''
    mensaje.value = ''

    boton.textContent = t('contacto.botones.enviar')
    boton.disabled = false
  } catch (error) {
    console.error(error)

    Swal.fire({
      icon: 'error',
      title: t('contacto.swal.error_titulo'),
      text: t('contacto.swal.error_texto'),
      confirmButtonColor: '#f38cbe',
    })

    boton.textContent = t('contacto.botones.enviar')
    boton.disabled = false
  }
}

/* =========================
   EFECTO SHINE SCROLL
========================= */

let observer = null
let lastScrollY = 0

const hacerShine = () => {
  const section = document.querySelector('.formulario')
  if (!section) return

  section.classList.remove('shine')
  void section.offsetWidth
  section.classList.add('shine')
}

onMounted(() => {
  const section = document.querySelector('#contacto')
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
/*------------ CONTACTO ------------*/
.formulario {
  position: relative;
  width: 90%;
  margin: 3rem auto;
  padding: 3rem 0 0;
  background: linear-gradient(135deg, #f8f8f87c, #eaeaea71);
  transition: all 0.5s;
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
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

.formulario-container {
  position: relative;
  z-index: 1;
  margin: 10px 0 0 0;
  padding: 0;
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
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  z-index: 0;
}

.formulario-container > * {
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
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contacto-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(4px);
  text-align: left;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.contacto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(232, 183, 207, 0.25);
  border-color: rgba(232, 183, 207, 0.6);
}

.info-formulario {
  text-align: center;
  margin-bottom: 2rem;
}

.info-formulario h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #343a40;
  margin-bottom: 0.6rem;
}

.info-formulario p {
  font-size: 1rem;
  color: #475569;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 600px;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.2rem;
}

.form-group {
  flex: 1;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
  display: block;
}

.form-control {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(226, 232, 240, 1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  width: 100%;
  color: #1e293b;
  transition: all 0.3s ease;
}

.form-control:focus {
  background: #fff;
  border-color: #e8b7cf;
  box-shadow: 0 0 0 4px rgba(232, 183, 207, 0.2);
  outline: none;
}

textarea.form-control {
  resize: vertical;
}

.formulario-boton {
  text-align: right;
  margin-top: 1.5rem;
}

.formulario-boton button {
  background: linear-gradient(135deg, #fdfdfd, #f5f5f5);
  color: #343a40;
  font-weight: 700;
  padding: 0.8rem 2.5rem;
  border-radius: 16px;
  font-size: 1.05rem;
  border: 1px solid rgba(232, 183, 207, 0.5);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
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

.contacto-divider {
  height: 1px;
  background: rgba(226, 232, 240, 0.8);
  margin: 2.2rem 0 1.5rem;
}

.contacto-socials-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.socials-label {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.socials-buttons {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(203, 213, 225, 0.8);
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition:
    all 0.2s ease,
    transform 0.2s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.95);
  border-color: #e8b7cf;
  box-shadow: 0 6px 20px rgba(232, 183, 207, 0.35);
  color: #e8b7cf;
}

.cv-btn {
  border-color: rgba(232, 183, 207, 0.6);
  background: rgba(232, 183, 207, 0.08);
}

.cv-btn:hover {
  color: #e3c3e8;
  border-color: #e3c3e8;
  background: rgba(255, 255, 255, 0.95);
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .formulario-container {
    flex-direction: column;
  }

  .container-imagen {
    display: none;
  }

  .formulario-derecha {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .formulario {
    padding: 1.5rem 0 0;
  }

  .formulario h2 {
    font-size: 1.8rem;
  }

  .contacto-card {
    padding: 1.5rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1.2rem;
  }

  .info-formulario h3 {
    font-size: 1.25rem;
  }

  .info-formulario p {
    font-size: 0.9rem;
  }

  .contacto-socials-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .socials-buttons {
    width: 100%;
    justify-content: flex-start;
  }

  .social-btn {
    flex: 1;
    justify-content: center;
    min-width: 120px;
  }

  .formulario-boton {
    text-align: center;
  }

  .formulario-boton button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 400px) {
  .formulario h2 {
    font-size: 1.2rem;
  }

  .contacto-card {
    padding: 1rem;
  }

  .info-formulario h3 {
    font-size: 1.1rem;
  }

  .info-formulario p {
    font-size: 0.8rem;
  }

  .social-btn {
    font-size: 0.78rem;
    padding: 6px 10px;
    min-width: 100%;
  }
}
</style>
