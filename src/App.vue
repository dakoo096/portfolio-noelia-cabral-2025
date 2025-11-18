<template>
  <div id="app">
    <HeaderComponent />
    <BackToTop />
    <AcercaDeMi />
    <MiStack />
    <MisProyectos />
    <Contacto />
    <FooterComponent />
  </div>
</template>


<script setup>
import HeaderComponent from './components/MiHeader.vue'
import BackToTop from './components/BackToTop.vue'
import AcercaDeMi from './components/AcercaDeMi.vue'
import MiStack from './components/MiStack.vue'
import MisProyectos from './components/MisProyectos.vue'
import FooterComponent from './components/MiFooter.vue'
import Contacto from './components/MiContacto.vue'

</script>


<style scoped>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
