<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">

      <!-- Botón hamburguesa -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link " href="#">Inicio</a></li>
          <li class="nav-item"><a class="nav-link " href="#acerca-de-mi">Acerca de mí</a></li>
          <li class="nav-item"><a class="nav-link " href="#mi-stack">Mi Stack</a></li>
          <li class="nav-item"><a class="nav-link " href="#mis-proyectos">Mis Proyectos</a></li>
          <li class="nav-item"><a class="nav-link " href="#contacto">Contacto</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>

</script>

<style scoped>
/* Navbar base */
.navbar {
  background-color: #DEA8D7;
  padding: 0;
  border-bottom: 2px solid #DAA0D2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}


.navbar a {
  padding: 1rem 1.5rem;
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  border-bottom: 2px solid #DEA8D7;
  transition: all 0.3s;
}

.navbar a:hover {
  color: #ffffff;
  background-color: #DAA0D2;
  border-bottom: 2px solid #4b4b4b;
}

.navbar a:active {
  color: #ffffff;
  background-color: #da91daaf;
}


/* Responsive navbar font-size */
@media (max-width: 1200px) {
  .navbar a {
    text-align: center;
    padding: 1vw;
  }
}

@media (max-width: 600px) {
  .navbar a {
    font-size: 1.3rem;
  }
}
</style>
