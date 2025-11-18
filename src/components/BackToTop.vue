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

onMounted(() => window.addEventListener('scroll', toggleVisibility))
onUnmounted(() => window.removeEventListener('scroll', toggleVisibility))
</script>

<style scoped>
.boton-back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9;
  display: flex;
  justify-content: flex-end;
  /* <-- clave */
}


.boton-back-to-top button {
  font-size: 1.5rem;
  color: #fff;
  background-color: #DAA0D2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
