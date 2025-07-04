<script setup>
//--------------------importaciones-----------------------------------------------------------/

import { ref, onBeforeMount } from 'vue'
import mapView from '../components/mapView.vue'
import { useLatLng } from '@/store/latLngState'
import direccion from '@/components/direccion.vue'
///definion de constantes
const start = ref(false)
const direccionStatus = useLatLng()
//----------------  definicion de funciones-------------------------------------------------/
//--------------------validacion de direccion automatica----------------------/

const moveCarruzel = () => {
  if (direccionStatus.lat == 0 && direccionStatus.lng == 0) {
    direccionStatus.swichtStatus(true)
  }
}
</script>

<template>
  <section>
    <div :class="[direccionStatus.showMap == false ? 'carruzel' : 'carruzel2']">
      <div class="vistauno">
        <div class="desktop">
          <p class="titulo">
            ENCUENTRA <br />TU CASA DE <br />
            PAZ
            <button @click="moveCarruzel()">Iniciar</button>
          </p>
        </div>

        <p class="text-light descripcion">
          Son lugares fuera de la iglesia, distribuidos por toda la CDMX, área metropolitana y otros
          estados del país, donde las personas se reúnen una vez por semana para orar por sus
          necesidades, aprender de Dios y hacer comunidad.<br />
          Es un lugar donde la misma unción, el poder sobrenatural y la presencia de Dios se
          experimentan con tanta fuerza como en la iglesia. <br />Cada Casa de Paz se abre para
          recibir a vecinos, familiares y amigos, con el propósito de compartir el evangelio del
          reino.
        </p>
      </div>
      <div class="vistados">
        <mapView
          v-if="direccionStatus.lat != 0 && direccionStatus.lng != 0"
          :lat="direccionStatus.lat"
          :lng="direccionStatus.lng"
        />
      </div>
    </div>
  </section>
  <direccion v-if="direccionStatus.modalStatus == true" />
</template>
<style scoped src="../assets/styles/home.css" />
