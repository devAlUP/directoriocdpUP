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
        <p>
          ENCUENTRA <br />TU CASA DE <br />
          PAZ
        </p>
        <div class="desktop">
          <img src="../assets/titulo.png" alt="" />
          <button @click="moveCarruzel()">
            <img class="but" src="../assets/titulo.png" alt="" />Iniciar
          </button>
        </div>
      </div>
      <div class="vistados bg-dark">
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
