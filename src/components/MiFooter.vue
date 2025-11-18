<template>
  <footer class="footer">
    <div class="container-footer">
      <p>&copy; 2025 Noelia Cabral. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #DAA0D2;
  padding: 2rem 0;
  /* más elegante que height fija */
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-footer p {
  font-size: 1.1rem;
  margin: 0;
  color: #000;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
}

/* ===================== */
/*     MEDIA QUERIES     */
/* ===================== */

/* Tablets */
@media (max-width: 992px) {
  .container-footer p {
    font-size: 1rem;
  }
}

/* Móviles */
@media (max-width: 576px) {
  .footer {
    padding: 1.5rem 1rem;
  }

  .container-footer p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
}
</style>
