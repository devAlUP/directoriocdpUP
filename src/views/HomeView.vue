<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <section class="fondo">
    <div class="contenedor">
      <div class="c-titulo">
        <!-- Bloque del título -->
        <div class="titulo">
          <span>ENCUENTRA</span><br />
          <span>TU CASA DE</span><br />

          <!-- Última línea: la palabra PAZ y el botón pegados -->
          <div class="linea-paz">
            <span>PAZ</span>
            <button @click="router.push('/mapa')" class="btn btn-dark btn-punto">Iniciar</button>
          </div>
        </div>
      </div>
      <div class="descipcion-contenedor">
        <p class="subtitulo-descripcion">¿QUÉ ES UNA CASA DE PAZ?</p>
        <p class="text-light descripcion">
          Son lugares fuera de la iglesia, distribuidos por toda la CDMX, área metropolitana y otros
          estados del país, donde las personas se reúnen una vez por semana para orar por sus
          necesidades, aprender de Dios y hacer comunidad.<br />
          Es un lugar donde la misma unción, el poder sobrenatural y la presencia de Dios se
          experimentan con tanta fuerza como en la iglesia. <br />Cada Casa de Paz se abre para
          recibir a vecinos, familiares y amigos, con el propósito de compartir el evangelio del
          reino.
        </p>
        <div class="brand-iglesia">
          <img src="/titulo.png" alt="Logo Iglesia" class="logo-img" />
          <span class="nombre-iglesia">UN PROPÓSITO</span>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@700&display=swap');

.fondo {
  width: 100%;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto; /* Permite scroll si el contenido supera la pantalla */
  position: absolute;
}

.contenedor {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.c-titulo {
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: flex-start;
}

.titulo {
  width: 45vw;
  margin-top: 4.2vw;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 10vw;
  background: linear-gradient(100deg, #ffa200, #ba5ec4, #5e6ac4, #5ec46f);
  line-height: 0.78;
  letter-spacing: 3px;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  margin-left: 2.5vw;
  font-weight: bold;
  display: inline-block;
  transform: scaleY(1.6);
  transform-origin: top left;
}

.linea-paz {
  display: inline-flex;
  align-items: baseline;
  gap: 1.5vw;
}

.btn-punto {
  -webkit-text-fill-color: initial;
  transform: scaleY(0.625);
  transform-origin: left center;
  padding: 0.2em 0.8em;
  font-size: 2vw;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  top: -0.1em;
}

.descipcion-contenedor {
  width: 50vw;
  padding-top: 20dvh;
  justify-content: center;
}

.subtitulo-descripcion {
  color: #ffffff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2vw;
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
}

.descripcion {
  font-size: 3vh;
  text-align: justify;
  font-weight: 400;
  width: 40vw;
  line-height: 1.7;
  letter-spacing: 0.3px;
}

.brand-iglesia {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 3rem;
  opacity: 0.9;
  padding-right: 4vw;
}

.logo-img {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.nombre-iglesia {
  margin-top: auto;
  margin-bottom: 0;
  color: #ffffff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.9rem;
  letter-spacing: 1px;
}

/* ==========================================================================
   📱 ADAPTACIÓN RESPONSIVA (MÓVILES Y TABLETS)
   ========================================================================== */
@media (max-width: 768px) {
  .fondo {
    position: relative;
    height: auto;
    min-height: 100dvh;
    overflow-y: auto;
  }

  .contenedor {
    flex-direction: column; /* Apila título arriba y descripción abajo */
    padding: 1.5rem 1.2rem 3rem 1.2rem;
  }

  .c-titulo {
    width: 100%;
    /* Damos margen inferior suficiente para compensar el estiramiento del scaleY */
    margin-bottom: 4.5rem;
  }

  .titulo {
    width: 100%;
    font-size: 17vw;
    margin-top: 0.5rem;
    margin-left: 0;
    line-height: 0.82;
  }

  .linea-paz {
    gap: 4vw;
  }

  /* 1. BOTÓN MÁS GRANDE EN MÓVIL */
  .btn-punto {
    font-size: 5vw; /* Aumentamos el tamaño de la letra */
    padding: 0.3em 1em; /* Más espacio interno */
    border-radius: 10px;
    top: -0.15em;
  }

  /* 2. CONTENEDOR DE DESCRIPCIÓN (YA NO SE ENCIMA) */
  .descipcion-contenedor {
    width: 100%;
    padding-top: 0;
    height: auto;
    margin-top: 4dvh;
  }

  .subtitulo-descripcion {
    font-size: 5.5vw;
    margin-bottom: 0.8rem;
  }

  .descripcion {
    width: 100%;
    font-size: 2vh;
    line-height: 1.6;
    text-align: left;
  }

  /* 3. BRAND DE LA IGLESIA MÁS CHICO Y DISCRETO */
  .brand-iglesia {
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding-right: 0;
    margin-top: 2rem;
    gap: 8px; /* Menor separación icono-texto */
  }

  .logo-img {
    height: 22px; /* Reducimos el logo */
  }

  .nombre-iglesia {
    font-size: 0.9rem; /* Reducimos la letra de la iglesia */
  }
}
</style>
