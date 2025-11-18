<template>
  <section class="acerca-de-mi" id="acerca-de-mi" data-aos="fade-right" data-aos-easing="ease-in-sine"
    data-aos-offset="100" data-aos-duration="500">
    <h2>Acerca de mí</h2>
    <div class="acerca-de-mi-container">

      <p>
        Soy Técnica en Desarrollo Web y Aplicaciones Digitales y actualmente me desempeño como Desarrolladora Full Stack
        en la Municipalidad de Córdoba, donde participo en el desarrollo y mantenimiento de aplicaciones internas,
        integrando tanto frontend como backend y colaborando con equipos multidisciplinarios.
      </p>
      <p>
        Me considero una persona responsable, curiosa y comprometida con la calidad de mi trabajo. Aprender nuevas
        tecnologías no me representa un desafío negativo; por el contrario, es algo que disfruto y que impulsa mi
        crecimiento profesional.
      </p>
      <p>
        Además de mi formación técnica, cuento con una sólida trayectoria previa en el área administrativa, lo que
        fortaleció mis habilidades de organización, resolución de problemas y comunicación.
      </p>
      <p>
        Mi objetivo es seguir avanzando en mi carrera, incorporando buenas prácticas, perfeccionando mis habilidades y
        construyendo soluciones claras, estables y bien fundamentadas que generen un impacto positivo tanto en los
        usuarios como en los equipos de trabajo.
      </p>

    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.acerca-de-mi {
  width: 90%;
  margin: 3rem auto;
  background: linear-gradient(135deg, #f8f8f8, #eaeaea);
  transition: all 0.5s;
  box-shadow: 0px 1px 4px rgba(44, 26, 44, 0.2);
  padding: 2rem 1.4rem;
  flex-wrap: wrap;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  text-align: center;



}

/* TÍTULO*/
.acerca-de-mi h2 {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  color: #343a40;
  padding-bottom: 0.4rem;
  position: relative;
  display: inline-block;
}

.acerca-de-mi h2::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, #D295C6, #D295C6);
  border-radius: 2px;
  animation: underline 1s ease forwards;
}

@keyframes underline {
  to {
    width: 80%;
  }
}


/* CONTENEDOR PRINCIPAL*/
.acerca-de-mi-container {
  display: grid;
  background-color: #fff;
  border-radius: 14px;
  padding: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: justify;
  font-size: 1.1rem;
  font-weight: 500;
  color: #343a40;
}


/* RESPONSIVE */
@media (max-width: 988px) {
  .acerca-de-mi h2 {
    font-size: 1.8rem;
  }

  .acerca-de-mi-container {
    font-size: 1.05rem;
  }
}

@media (max-width: 600px) {
  .acerca-de-mi h2 {
    font-size: 1.7rem;
  }

  .acerca-de-mi-container {
    font-size: 1rem;
  }
}
</style>
