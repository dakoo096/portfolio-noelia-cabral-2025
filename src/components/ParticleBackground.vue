<template>
  <canvas ref="particleCanvas" class="particle-canvas" @mousemove="handleMouseMove" @mouseout="handleMouseOut"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  particleColor: {
    type: String,
    default: 'rgba(232, 183, 207, 0.8)'
  },
  quantity: {
    type: Number,
    default: 4000
  }
});

const particleCanvas = ref(null);
let ctx = null;
let particles = [];
let animationId = null;
const mouse = {
  x: null,
  y: null,
  radius: 100
};

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 2 + 1;
    this.density = (Math.random() * 30) + 1;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.baseX += this.vx;
    this.baseY += this.vy;

    if (this.baseX < 0 || this.baseX > ctx.canvas.width) this.vx *= -1;
    if (this.baseY < 0 || this.baseY > ctx.canvas.height) this.vy *= -1;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 15;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 15;
      }
    }
  }
}

const init = () => {
  particles = [];
  if (!particleCanvas.value) return;
  const numberOfParticles = (particleCanvas.value.width * particleCanvas.value.height) / props.quantity;
  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * particleCanvas.value.width;
    let y = Math.random() * particleCanvas.value.height;
    particles.push(new Particle(x, y, props.particleColor));
  }
};

const animate = () => {
  if (!ctx || !particleCanvas.value) return;
  ctx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
  }
  animationId = requestAnimationFrame(animate);
};

const handleMouseMove = (event) => {
  const rect = particleCanvas.value.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
};

const handleMouseOut = () => {
  mouse.x = null;
  mouse.y = null;
};

const handleResize = () => {
  if (particleCanvas.value) {
    particleCanvas.value.width = particleCanvas.value.offsetWidth;
    particleCanvas.value.height = particleCanvas.value.offsetHeight;
    init();
  }
};

onMounted(() => {
  ctx = particleCanvas.value.getContext('2d');
  handleResize();
  window.addEventListener('resize', handleResize);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: auto;
}
</style>
