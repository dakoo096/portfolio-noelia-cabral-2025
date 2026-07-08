<template>
  <div class="skill-badge">
    <img :src="icono" :alt="nombre" class="skill-icon" />
    <span class="skill-label">{{ nombre }}</span>
  </div>
</template>

<script setup>
defineProps({
  icono: String,
  nombre: String,
})
</script>

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(203, 213, 225, 0.8);
  border-radius: 10px;
  cursor: default;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
  backdrop-filter: blur(4px);
}

.skill-badge:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.95);
  border-color: #e8b7cf;
  box-shadow: 0 6px 20px rgba(232, 183, 207, 0.35);
}

.skill-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
}

.skill-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
}

/* Dark mode */
:global(body.dark-mode) .skill-badge {
  background: rgba(30, 27, 40, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

:global(body.dark-mode) .skill-badge:hover {
  background: rgba(55, 45, 65, 0.9);
  border-color: rgba(243, 140, 190, 0.5);
  box-shadow: 0 6px 20px rgba(243, 140, 190, 0.2);
}

:global(body.dark-mode) .skill-label {
  color: #e2e8f0;
}

@media (max-width: 600px) {
  .skill-badge {
    padding: 5px 10px;
  }

  .skill-icon {
    width: 18px;
    height: 18px;
  }

  .skill-label {
    font-size: 0.78rem;
  }
}
</style>
