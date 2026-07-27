<template>
  <footer class="footer">
    <div class="container-footer">
      <p>{{ $t('footer.texto') }}</p>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: linear-gradient(to bottom, rgb(227, 195, 232), #a986ada2);
  padding: 1rem 0;
  border-top: 2px solid #8b188250;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-footer p {
  position: relative;
  padding: 1rem 1rem 0 !important;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #343a40 20%, #a7557c 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.25s ease;
  text-decoration: none;

}

.dark-mode .container-footer p {
  background: linear-gradient(135deg, #cdd2d8 20%, #eca5c9 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.25s ease;
  text-decoration: none;

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
