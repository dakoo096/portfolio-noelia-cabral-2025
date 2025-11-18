<template>
  <div class="mi-stack-container-card">
    <img :src="icono" :alt="nombre" />
    <span class="texto">{{ nombre }}</span>
  </div>
</template>

<script setup>
defineProps({
  icono: String,
  nombre: String,
})
</script>

<style scoped>
.mi-stack-container-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  width: 100px;
  height: 120px;
}

.mi-stack-container-card:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  background: #DEA8D7;
}

.mi-stack-container-card img {
  width: 45px;
  height: 45px;
  margin-bottom: 0.5rem;
}

.mi-stack-container-card .texto {
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  color: #333;
}

.mi-stack-container-card:hover .texto {
  color: #fff;
}

@media (max-width: 600px) {
  .mi-stack-container-card {
    width: 80px;
    height: 100px;
    padding: 0.8rem;
  }

  .mi-stack-container-card img {
    width: 35px;
    height: 35px;
  }

  .mi-stack-container-card .texto {
    font-size: 0.8rem;
  }
}
@media (max-width: 400px) {
  .mi-stack-container-card {
    width: 70px;
    height: 90px;
    padding: 0.6rem;
  }

  .mi-stack-container-card img {
    width: 30px;
    height: 30px;
  }

  .mi-stack-container-card .texto {
    font-size: 0.7rem;
  }
}
</style>
