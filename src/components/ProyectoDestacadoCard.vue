<template>
  <div class="proyecto-card proyecto-card-destacado" ref="cardElement">
    <!-- Carrusel / Preview a la izquierda en Desktop, arriba en Mobile -->
    <div class="carousel-container destacado-carousel" @click="abrirModal">
      <!-- Imagen real si cargó con éxito -->
      <img
        v-if="!imagenError[indiceActual]"
        :src="imagenes[indiceActual]"
        :alt="titulo + ' - Vista ' + (indiceActual + 1)"
        class="proyecto-imagen destacado-imagen"
        loading="lazy"
        decoding="async"
        width="600"
        height="380"
        @error="onImageError(indiceActual)"
      />

      <!-- Fallback elegante y limpio si el archivo aún no existe en assets -->
      <div v-else class="destacado-fallback">
        <div class="fallback-glow"></div>
        <div class="fallback-content">
          <div class="fallback-icon-wrap">
            <i class="bx bx-layout fallback-icon"></i>
          </div>
          <span class="fallback-caption">
            {{ nombresVistas[indiceActual] || ('Vista ' + (indiceActual + 1)) }}
          </span>
          <span class="fallback-hint">
            <i class="bx bx-image-alt"></i> {{ imagenes[indiceActual] }}
          </span>
        </div>
      </div>

      <!-- Flechas del carrusel -->
      <button
        class="flecha flecha-izq"
        @click.stop="imagenAnterior"
        :aria-label="'Imagen anterior'"
      >
        ‹
      </button>
      <button
        class="flecha flecha-der"
        @click.stop="imagenSiguiente"
        :aria-label="'Imagen siguiente'"
      >
        ›
      </button>

      <!-- Indicadores de puntos -->
      <div class="indicadores">
        <span
          v-for="(img, i) in imagenes"
          :key="i"
          class="punto"
          :class="{ activo: i === indiceActual }"
          @click.stop="irAImagen(i)"
          :title="nombresVistas[i] || ('Vista ' + (i + 1))"
        ></span>
      </div>
    </div>

    <!-- Contenido e información técnica a la derecha en Desktop -->
    <div class="proyecto-info destacado-info">
      <!-- Badges de estado y jerarquía -->
      <div class="destacado-badges">
        <span class="badge-destacado-principal">
          <i class="bx bxs-star badge-star"></i>
          {{ badgeText || $t('proyectos.nomida.badge_destacado') }}
        </span>
        <span class="badge-desarrollo-activo">
          <span class="pulse-dot"></span>
          {{ $t('proyectos.nomida.badge_desarrollo') }}
        </span>
      </div>

      <!-- Título y Subtítulo -->
      <h3 class="proyecto-titulo destacado-titulo">{{ titulo }}</h3>
      <p class="destacado-subtitulo">{{ subtitulo }}</p>

      <!-- Descripción principal -->
      <p class="proyecto-descripcion destacado-descripcion">{{ descripcion }}</p>

      <!-- Highlights técnicos discretos -->
      <div v-if="highlights && highlights.length" class="destacado-highlights">
        <span v-for="(item, idx) in highlights" :key="idx" class="highlight-pill">
          <i class="bx bx-check-circle pill-icon"></i> {{ item }}
        </span>
      </div>

      <!-- Tecnologías -->
      <div v-if="tecnologias && tecnologias.length" class="proyecto-tecnologias destacado-tecnologias">
        <span class="tecnologias-leyenda">{{ $t('proyectos.tecnologias') }}</span>
        <div class="tecnologias-iconos">
          <div v-for="(tech, idx) in tecnologias" :key="idx" class="tech-icono-wrapper">
            <img
              :src="tech.icono"
              :alt="tech.nombre"
              class="tech-icono"
              loading="lazy"
              decoding="async"
              width="24"
              height="24"
            />
            <span class="tech-tooltip">{{ tech.nombre }}</span>
          </div>
        </div>
      </div>

      <!-- Botones CTA -->
      <div class="proyecto-buttons destacado-buttons">
        <a
          v-if="esDemoValido"
          class="proyecto-link destacado-cta"
          :href="urlDemo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bx bx-link-external icon-btn"></i>
          {{ $t('proyectos.botones.demo') }}
        </a>
        <a
          v-if="esGithubValido"
          class="proyecto-link destacado-cta"
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bx bxl-github icon-btn"></i>
          {{ $t('proyectos.botones.codigo') }}
        </a>
      </div>
    </div>

    <!-- Modal ampliado a pantalla completa para el carrusel -->
    <teleport to="body">
      <div v-if="modalAbierto" class="modal-overlay" @click.self="cerrarModal">
        <div class="modal-content">
          <button class="modal-cerrar" @click="cerrarModal" aria-label="Cerrar modal">×</button>

          <div class="modal-carrusel">
            <button class="modal-flecha izquierda" @click="modalAnterior" aria-label="Anterior">‹</button>

            <img
              v-if="!imagenError[modalIndice]"
              :src="imagenes[modalIndice]"
              :alt="titulo + ' ampliado'"
              class="modal-imagen-grande"
            />
            <div v-else class="destacado-fallback modal-fallback">
              <div class="fallback-content">
                <i class="bx bx-layout fallback-icon"></i>
                <span class="fallback-caption">
                  {{ nombresVistas[modalIndice] || ('Vista ' + (modalIndice + 1)) }}
                </span>
                <span class="fallback-hint">{{ imagenes[modalIndice] }}</span>
              </div>
            </div>

            <button class="modal-flecha derecha" @click="modalSiguiente" aria-label="Siguiente">›</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  titulo: {
    type: String,
    required: true,
  },
  subtitulo: {
    type: String,
    default: '',
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagenes: {
    type: Array,
    default: () => [],
  },
  nombresVistas: {
    type: Array,
    default: () => [
      '1. Dashboard de NOMIDA (Portada)',
      '2. Gestión de Consultas',
      '3. Configuración',
      '4. Flujo WhatsApp / automatización',
    ],
  },
  link: {
    type: String,
    default: '',
  },
  demo: {
    type: String,
    default: '',
  },
  github: {
    type: String,
    default: '',
  },
  tecnologias: {
    type: Array,
    default: () => [],
  },
  highlights: {
    type: Array,
    default: () => [],
  },
  badgeText: {
    type: String,
    default: '',
  },
})

const esDemoValido = computed(() => {
  return (props.demo && props.demo.startsWith('http')) || (props.link && props.link.startsWith('http') && !props.github)
})

const esGithubValido = computed(() => {
  return props.github && props.github.startsWith('http')
})

const urlDemo = computed(() => {
  return props.demo || props.link
})

/* Control de error de carga para mostrar fallback limpio sin imágenes rotas */
const imagenError = reactive({})
const onImageError = (index) => {
  imagenError[index] = true
}

/* CARRUSEL */
const cardElement = ref(null)
const indiceActual = ref(0)
let intervalo = null
let observer = null

const imagenSiguiente = () => {
  if (!props.imagenes || props.imagenes.length === 0) return
  indiceActual.value = (indiceActual.value + 1) % props.imagenes.length
}

const imagenAnterior = () => {
  if (!props.imagenes || props.imagenes.length === 0) return
  indiceActual.value = (indiceActual.value - 1 + props.imagenes.length) % props.imagenes.length
}

const irAImagen = (i) => {
  indiceActual.value = i
}

const iniciarIntervalo = () => {
  if (intervalo || !props.imagenes || props.imagenes.length <= 1) return
  intervalo = setInterval(() => {
    imagenSiguiente()
  }, 4500)
}

const detenerIntervalo = () => {
  if (intervalo) {
    clearInterval(intervalo)
    intervalo = null
  }
}

onMounted(() => {
  if ('IntersectionObserver' in window && cardElement.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          iniciarIntervalo()
        } else {
          detenerIntervalo()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(cardElement.value)
  } else {
    iniciarIntervalo()
  }
})

onBeforeUnmount(() => {
  detenerIntervalo()
  if (observer) {
    observer.disconnect()
  }
})

/* MODAL */
const modalAbierto = ref(false)
const modalIndice = ref(0)

const abrirModal = () => {
  modalIndice.value = indiceActual.value
  modalAbierto.value = true
}

const cerrarModal = () => {
  modalAbierto.value = false
}

const modalSiguiente = () => {
  if (!props.imagenes || props.imagenes.length === 0) return
  modalIndice.value = (modalIndice.value + 1) % props.imagenes.length
}

const modalAnterior = () => {
  if (!props.imagenes || props.imagenes.length === 0) return
  modalIndice.value = (modalIndice.value - 1 + props.imagenes.length) % props.imagenes.length
}
</script>

<style scoped>
/* Card Principal Destacada: Ocupa el ancho completo */
.proyecto-card-destacado {
  width: 100%;
  margin-bottom: 2.5rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 6px 20px rgba(44, 26, 44, 0.05);
  border: 1px solid #cbd5e1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.15);
}

.proyecto-card-destacado:hover {
  transform: translateY(-4px);
  border-color: #cbd5e1;
  box-shadow: 0 16px 32px rgba(232, 183, 207, 0.25), 0 4px 12px rgba(0, 0, 0, 0.04);
}

/* Columna Izquierda: Carrusel */
.destacado-carousel {
  width: 50%;
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-right: 1px solid #f1f5f9;
  align-self: stretch;
  min-height: 400px;
}

.destacado-imagen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.5s ease, filter 0.5s ease;
  filter: brightness(0.98);
}

.proyecto-card-destacado:hover .destacado-imagen {
  transform: scale(1.03);
  filter: brightness(1.02);
}

/* Fallback elegante cuando las capturas todavía no se colocan en assets */
.destacado-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 40%, rgba(243, 140, 190, 0.12) 0%, rgba(241, 245, 249, 0.8) 70%);
  padding: 2rem;
  box-sizing: border-box;
}

.fallback-glow {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(232, 183, 207, 0.45) 0%, transparent 70%);
  filter: blur(25px);
  pointer-events: none;
}

.fallback-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
}

.fallback-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(232, 183, 207, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(243, 140, 190, 0.3);
}

.fallback-icon {
  font-size: 2.2rem;
  color: #db2777;
}

.fallback-caption {
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1e293b;
}

.fallback-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #64748b;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* Columna Derecha: Información */
.destacado-info {
  width: 50%;
  padding: 2rem 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  box-sizing: border-box;
}

/* Badges */
.destacado-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.9rem;
}

.badge-destacado-principal {
  background: linear-gradient(135deg, rgba(243, 140, 190, 0.18), rgba(227, 195, 232, 0.28));
  color: #9d174d;
  border: 1px solid rgba(243, 140, 190, 0.45);
  font-family: 'Outfit', sans-serif;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.6px;
  padding: 5px 12px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(243, 140, 190, 0.12);
}

.badge-star {
  font-size: 0.95rem;
  color: #ec4899;
}

.badge-desarrollo-activo {
  background: rgba(241, 245, 249, 0.9);
  color: #475569;
  border: 1px solid #cbd5e1;
  font-family: 'Outfit', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 5px 11px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

/* Título & Subtítulo */
.destacado-titulo {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.35rem 0;
  letter-spacing: -0.3px;
  line-height: 1.25;
}

.destacado-subtitulo {
  font-family: 'Outfit', sans-serif;
  font-size: 0.98rem;
  font-weight: 600;
  color: #db2777;
  margin: 0 0 1rem 0;
  letter-spacing: 0.2px;
}

/* Descripción */
.destacado-descripcion {
  font-family: 'Inter', sans-serif;
  font-size: 0.93rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 1.1rem 0;
}

/* Highlights técnicos discretos */
.destacado-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.2rem;
}

.highlight-pill {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #334155;
  background: rgba(248, 250, 252, 0.95);
  border: 1px solid #e2e8f0;
  padding: 4px 10px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
}

.highlight-pill:hover {
  background: rgba(243, 140, 190, 0.08);
  border-color: rgba(243, 140, 190, 0.35);
  color: #0f172a;
}

.pill-icon {
  font-size: 0.85rem;
  color: #ec4899;
}

/* Tecnologías */
.destacado-tecnologias {
  margin-top: auto;
  margin-bottom: 1.2rem;
}

.tecnologias-leyenda {
  font-size: 0.82rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tecnologias-iconos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 0;
}

.tech-icono-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.tech-icono-wrapper:hover {
  transform: translateY(-4px) scale(1.15);
}

.tech-icono {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08));
  transition: filter 0.3s ease;
}

.tech-icono-wrapper:hover .tech-icono {
  filter: drop-shadow(0px 6px 12px rgba(135, 87, 133, 0.3));
}

.tech-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0px) scale(0.85);
  background: rgba(30, 27, 33, 0.95);
  color: #fff;
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 20;
}

.tech-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: rgba(30, 27, 33, 0.95) transparent transparent transparent;
}

.tech-icono-wrapper:hover .tech-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-8px) scale(1);
}

/* Botón CTA */
.destacado-buttons {
  margin-top: 0.2rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.proyecto-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: auto;
  padding: 0.8rem 2.2rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  color: #343a40;
  border: 1px solid rgba(227, 195, 232, 0.6);
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.proyecto-link:hover {
  background: linear-gradient(135deg, #e8b7cf, #e3c3e8);
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0px 12px 24px rgba(232, 183, 207, 0.55);
  color: #fff;
  border-color: transparent;
}

.icon-btn {
  font-size: 1.15rem;
}

/* Flechas Carrusel */
.flecha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  color: #333;
  border: none;
  font-size: 1.8rem;
  padding: 4px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  opacity: 0;
  z-index: 4;
}

.destacado-carousel:hover .flecha {
  opacity: 1;
}

.flecha:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-50%) scale(1.1);
}

.flecha-izq {
  left: 10px;
}

.flecha-der {
  right: 10px;
}

/* Indicadores de puntos */
.indicadores {
  position: absolute;
  bottom: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 7px;
  z-index: 4;
}

.punto {
  width: 10px;
  height: 10px;
  background: rgba(209, 209, 209, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.25s ease;
}

.punto.activo {
  background: #db2777;
  transform: scale(1.25);
  box-shadow: 0 0 8px rgba(219, 39, 119, 0.5);
}

/* MODAL */
.modal-overlay {
  position: fixed !important;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9999 !important;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1100px;
  height: 85%;
  background: #ffffff;
  border-radius: 18px;
  padding: 1rem;
  overflow: hidden;
  animation: scaleIn 0.25s ease;
  z-index: 10000;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-cerrar {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 2.5rem;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  z-index: 99;
  line-height: 1;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-cerrar:hover {
  background: rgba(0, 0, 0, 0.8);
}

.modal-carrusel {
  position: relative;
  width: 100%;
  height: 100%;
}

.modal-imagen-grande {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal-fallback {
  border-radius: 12px;
}

.modal-flecha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.65);
  color: #333;
  font-size: 3rem;
  border: none;
  padding: 0 18px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.25s ease;
  backdrop-filter: blur(4px);
  z-index: 10;
}

.modal-flecha:hover {
  background: rgba(255, 255, 255, 0.95);
}

.modal-flecha.izquierda {
  left: 10px;
}

.modal-flecha.derecha {
  right: 10px;
}

/* ============================================================ */
/*   SOPORTE DARK MODE (Automático con body.dark-mode)          */
/* ============================================================ */
:global(body.dark-mode) .proyecto-card-destacado {
  background: #18181b;
  border-color: #27272a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85);
}

:global(body.dark-mode) .proyecto-card-destacado:hover {
  border-color: #3f3f46;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.95), 0 0 20px rgba(243, 140, 190, 0.15);
}

:global(body.dark-mode) .destacado-carousel {
  background: linear-gradient(135deg, #121214, #18181b);
  border-right: 1px solid #27272a;
}

:global(body.dark-mode) .destacado-fallback {
  background: radial-gradient(circle at 50% 40%, rgba(243, 140, 190, 0.1) 0%, rgba(18, 18, 20, 0.95) 75%);
}

:global(body.dark-mode) .fallback-icon-wrap {
  background: #27272a;
  border-color: rgba(243, 140, 190, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

:global(body.dark-mode) .fallback-caption {
  color: #f1f5f9;
}

:global(body.dark-mode) .fallback-hint {
  background: rgba(39, 39, 42, 0.8);
  color: #94a3b8;
  border-color: #3f3f46;
}

:global(body.dark-mode) .destacado-titulo {
  color: #f1f5f9;
}

:global(body.dark-mode) .destacado-subtitulo {
  color: #f472b6;
}

:global(body.dark-mode) .destacado-descripcion {
  color: #cbd5e1;
}

:global(body.dark-mode) .badge-destacado-principal {
  background: linear-gradient(135deg, rgba(243, 140, 190, 0.22), rgba(168, 85, 247, 0.22));
  color: #f9a8d4;
  border-color: rgba(243, 140, 190, 0.4);
}

:global(body.dark-mode) .badge-desarrollo-activo {
  background: #27272a;
  color: #cbd5e1;
  border-color: #3f3f46;
}

:global(body.dark-mode) .highlight-pill {
  background: #202024;
  border-color: #2e2e34;
  color: #cbd5e1;
}

:global(body.dark-mode) .highlight-pill:hover {
  background: rgba(243, 140, 190, 0.15);
  border-color: rgba(243, 140, 190, 0.4);
  color: #ffffff;
}

:global(body.dark-mode) .destacado-tecnologias .tecnologias-leyenda {
  color: #94a3b8;
}

:global(body.dark-mode) .modal-content {
  background: #18181b;
}

/* ============================================================ */
/*   RESPONSIVE                                                 */
/* ============================================================ */
@media (max-width: 1024px) {
  .destacado-carousel {
    min-height: 340px;
  }

  .destacado-info {
    padding: 1.6rem 1.8rem;
  }

  .destacado-titulo {
    font-size: 1.65rem;
  }

  .destacado-subtitulo {
    font-size: 0.92rem;
  }

  .destacado-descripcion {
    font-size: 0.9rem;
  }
}

@media (max-width: 860px) {
  .proyecto-card-destacado {
    flex-direction: column;
    margin-bottom: 2rem;
  }

  .destacado-carousel {
    width: 100%;
    height: 280px;
    min-height: 280px;
    border-right: none;
    border-bottom: 1px solid #f1f5f9;
  }

  :global(body.dark-mode) .destacado-carousel {
    border-bottom: 1px solid #27272a;
  }

  .destacado-info {
    width: 100%;
    padding: 1.5rem 1.4rem;
  }

  .destacado-titulo {
    font-size: 1.55rem;
  }
}

@media (max-width: 520px) {
  .destacado-carousel {
    height: 220px;
    min-height: 220px;
  }

  .destacado-info {
    padding: 1.2rem 1rem;
  }

  .destacado-titulo {
    font-size: 1.35rem;
  }

  .destacado-subtitulo {
    font-size: 0.86rem;
    margin-bottom: 0.75rem;
  }

  .destacado-descripcion {
    font-size: 0.86rem;
    line-height: 1.5;
  }

  .badge-destacado-principal,
  .badge-desarrollo-activo {
    font-size: 0.68rem;
    padding: 4px 9px;
  }

  .highlight-pill {
    font-size: 0.7rem;
    padding: 3px 8px;
  }

  .proyecto-link {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 1.4rem;
  }
}
</style>
