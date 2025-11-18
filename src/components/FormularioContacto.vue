<template>
  <form class="contact-form p-3">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="nombre" placeholder="Tu nombre" />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" placeholder="Tu email" />
    </div>
    <div class="mb-3">
      <label for="mensaje" class="form-label">Mensaje</label>
      <textarea class="form-control" id="mensaje" rows="5" placeholder="Escribe tu mensaje"></textarea>
    </div>
    <div class="formulario-boton text-center">
      <button type="submit" class="btn">Enviar</button>
    </div>
  </form>
</template>

<script setup>
// Por ahora es estático, luego podemos agregar envío con EmailJS o backend
</script>

<style scoped>
.contact-form input,
.contact-form textarea {
  border-radius: 1rem;
}

.formulario-boton button {
  background-color: #f19ead;
  color: #fff;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  transition: all 0.3s;
}

.formulario-boton button:hover {
  background-color: #ec8295;
  color: #ffffff;
}
</style>
