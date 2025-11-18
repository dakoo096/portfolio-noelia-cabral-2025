<template>
  <div class="proyecto-card">
    <div class="carousel-container" @click="abrirModal">
      <img :src="imagenes[indiceActual]" class="proyecto-imagen" />

      <button class="flecha flecha-izq" @click.stop="imagenAnterior">‹</button>
      <button class="flecha flecha-der" @click.stop="imagenSiguiente">›</button>

      <div class="indicadores">
        <span v-for="(img, i) in imagenes" :key="i" class="punto" :class="{ activo: i === indiceActual }"
          @click.stop="irAImagen(i)"></span>
      </div>
    </div>

    <div class="proyecto-info">
      <h3 class="proyecto-titulo">{{ titulo }}</h3>
      <p class="proyecto-descripcion">{{ descripcion }}</p>

      <div class="proyecto-buttons">
        <a class="proyecto-link" :href="link" target="_blank">Ver Proyecto</a>
      </div>
    </div>

    <teleport to="body">
      <div v-if="modalAbierto" class="modal-overlay" @click.self="cerrarModal">
        <div class="modal-content">
          <button class="modal-cerrar" @click="cerrarModal">×</button>

          <div class="modal-carrusel">
            <button class="modal-flecha izquierda" @click="modalAnterior">
              ‹
            </button>

            <img :src="imagenes[modalIndice]" class="modal-imagen-grande" />

            <button class="modal-flecha derecha" @click="modalSiguiente">
              ›
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  titulo: String,
  descripcion: String,
  imagenes: Array,
  link: String,
});

/* CARRUSEL PEQUEÑO */
const indiceActual = ref(0);
let intervalo = null;

const imagenSiguiente = () => {
  indiceActual.value = (indiceActual.value + 1) % props.imagenes.length;
};

const imagenAnterior = () => {
  indiceActual.value =
    (indiceActual.value - 1 + props.imagenes.length) % props.imagenes.length;
};

const irAImagen = (i) => {
  indiceActual.value = i;
};

onMounted(() => {
  intervalo = setInterval(() => {
    imagenSiguiente();
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(intervalo);
});

/* MODAL */
const modalAbierto = ref(false);
const modalIndice = ref(0);

const abrirModal = () => {
  modalIndice.value = indiceActual.value;
  modalAbierto.value = true;
};

const cerrarModal = () => {
  modalAbierto.value = false;
};

const modalSiguiente = () => {
  modalIndice.value = (modalIndice.value + 1) % props.imagenes.length;
};

const modalAnterior = () => {
  modalIndice.value =
    (modalIndice.value - 1 + props.imagenes.length) % props.imagenes.length;
};
</script>

<style scoped>
.proyecto-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.proyecto-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
}

.carousel-container {
  position: relative;
  width: 100%;
  cursor: zoom-in;
}

.proyecto-imagen {
  width: 100%;
  height: 190px;
  object-fit: cover;
  transition: opacity 0.3s ease;
  border-bottom: 1px solid #eaeaea;
}

.flecha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(97, 96, 96, 0.65);
  color: white;
  border: none;
  font-size: 1.8rem;
  padding: 4px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  backdrop-filter: blur(4px);
}

.flecha:hover {
  background: rgba(63, 63, 63, 0.9);
}

.flecha-izq {
  left: 10px;
}

.flecha-der {
  right: 10px;
}

.indicadores {
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.punto {
  width: 10px;
  height: 10px;
  background: #d1d1d1;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
}

.punto.activo {
  background: #343a40;
  transform: scale(1.2);
}

/* ======================= */
/*   INFO DE LA CARD       */
/* ======================= */

.proyecto-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1.4rem;
}

.proyecto-titulo {
  font-size: 1.45rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.6rem;
  text-align: center;
}

.proyecto-descripcion {
  font-size: 1.rem;
  color: #555;
  text-align: justify;
  line-height: 1.55rem;
  opacity: 0.95;
}

/* ======================= */
/*   BOTÓN                 */
/* ======================= */
.proyecto-buttons {
  margin-top: auto;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.proyecto-link {
  display: inline-block;
  width: auto;
  padding: 0.65rem 1.4rem;
  background: linear-gradient(135deg, #343a40, #1f1f1f);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  letter-spacing: 0.4px;
}

.proyecto-link:hover {
  background: linear-gradient(135deg, #000, #2b2b2b);
  transform: translateY(-2px);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.2);
}

/* ======================= */
/*   MODAL                 */
/* ======================= */
.modal-overlay {
  position: fixed !important;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9 !important;
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
  height: 90%;
  background: #ffffff;
  border-radius: 18px;
  padding: 1rem;
  overflow: hidden;
  animation: scaleIn 0.25s ease;
  z-index: 8;
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
  pointer-events: auto;
}

.modal-cerrar:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* Carrusel modal */

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

.modal-flecha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.55);
  color: #333;
  font-size: 3rem;
  border: none;
  padding: 0 18px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.25s ease;
  backdrop-filter: blur(3px);
}


.modal-flecha:hover {
  background: rgba(255, 255, 255, 0.9);
}

.modal-flecha.izquierda {
  left: 10px;
}

.modal-flecha.derecha {
  right: 10px;
}


@media (max-width: 1024px) {
  .proyecto-imagen {
    height: 170px;
  }

  .proyecto-titulo {
    font-size: 1.3rem;
  }

  .proyecto-descripcion {
    font-size: 1rem;
  }
}

  @media (max-width: 768px) {
    .proyectos-grid {
      grid-template-columns: 1fr;
    }

    .proyecto-imagen {
      height: 160px;
    }

    .proyecto-card {
      max-width: 480px;
      margin: 0 auto;
    }
  }

  @media (max-width: 480px) {
    .proyecto-imagen {
      height: 140px;
    }

    .proyecto-titulo {
      font-size: 1.18rem;
    }

    .proyecto-descripcion {
      font-size: 0.9rem;
      line-height: 1.45rem;
    }

    .proyecto-link {
      padding: 0.55rem 1.2rem;
      font-size: 0.92rem;
    }
  }
  @media (max-width: 400px) {

    .proyecto-titulo {
      font-size: 1rem;
    }

    .proyecto-descripcion {
      font-size: 0.8rem;
      line-height: 1.35rem;
    }

    .proyecto-link {
      padding: 0.5rem;
      font-size: 0.8rem;
    }
  }
</style>
