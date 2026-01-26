<template>
  <section class="boton-back-to-top">
    <button v-show="visible" @click="scrollTop" id="myBtn" title="Go to top"
      class="btn rounded align-items-center p-3 bg-gradient bg-opacity-75">
      <i class="bx bxs-up-arrow-alt bx-tada"></i>
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const toggleVisibility = () => {
  visible.value = window.scrollY > 300 // aparece después de 300px
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => {
  window.addEventListener('scroll', toggleVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})

</script>

<style scoped>
.boton-back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9;

  width: auto;
  display: inline-flex;
}


.boton-back-to-top button {
  font-size: 1.5rem;
  color: #fff;
  background-color: #e3c3e8;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}

.boton-back-to-top button:active {
  background-color: #e8b7cf;
}
@media (max-width: 400px) {
  .boton-back-to-top {
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
