<script setup>
import { ref, onMounted } from 'vue'

import { GoogleMap, MarkerCluster, CustomMarker } from 'vue3-google-map'
import { useLatLng } from '@/store/latLngState'
import { useCardStatus } from '@/store/hideUnhideCard'
const storeCard = useCardStatus()
const direccionStatus = useLatLng()
const center = ref({ lat: direccionStatus.lat, lng: direccionStatus.lng })

const markerOptions = ref({ position: center.value, title: 'mi ubicacion' })

console.log(storeCard.dataCard.img)

const loader = ref(true)
setTimeout(() => {
  loader.value = false
}, 4000)
</script>
<template>
  <div class="c-font">
    <div class="card bg-dark c-fixed">
      <GoogleMap
        api-key="AIzaSyBky4Bi1jZxJNgpXYmKMx-SQB80InwgT9w"
        mapId="f90d18df990b00e779f908dd"
        style="width: 100%; height: 30vh; margin-top: 0; margin-left: 0; border-radius: 50px"
        :center="center"
        :zoom="12"
      >
        <CustomMarker :options="markerOptions">
          <div style="text-align: center">
            <div style="font-size: 1.125rem">
              <img src="../assets/pinUB.png" width="50" height="50" style="margin-top: 8px" />
            </div>
          </div>
        </CustomMarker>
        <CustomMarker
          :options="{
            position: { lat: storeCard.dataCard.lat, lng: storeCard.dataCard.lng },
            anchorPoint: 'BOTTOM_CENTER',
          }"
        >
          <div style="text-align: center" @click="Unhide(location)">
            <div style="font-size: 1.125rem">
              <img src="../assets/logo.png" width="50" height="50" style="margin-top: 8px" />
            </div>
          </div>
        </CustomMarker>
      </GoogleMap>
      <img class="profile" :src="storeCard.dataCard.img" />
      <div class="card-body">
        <h4 class="text-light">{{ storeCard.dataCard.nombre }}</h4>

        <h5 class="text-light">Direccion:</h5>
        <p class="text-light">{{ storeCard.dataCard.direccion }}</p>

        <div class="datos-card">
          <h5 class="text-light">Horario</h5>
          <p class="text-light">: {{ storeCard.dataCard.horario }}</p>
        </div>
        <div class="datos-card">
          <h5 class="text-light" style="margin-right: 4px">Lider</h5>
          <p class="text-light">: {{ storeCard.dataCard.lider }}</p>
        </div>

        <div class="datos-card">
          <h5 class="text-light">Coolideres</h5>
          <p class="text-light">: {{ storeCard.dataCard.colider }}</p>
        </div>
        <div class="datos-card">
          <h5 class="text-light">Telefono</h5>
          <p class="text-light">: {{ storeCard.dataCard.telefono }}</p>
        </div>
      </div>
      <button
        @click="storeCard.swichtStatus(false)"
        type="button"
        class="btn-close btn-close-white bt-close"
        aria-label="Close"
      ></button>
    </div>
  </div>
  <div class="loader" v-if="loader == true">
    <img src="../assets/loader.png" alt="" />
    <h1 class="text-light">Cargando...</h1>
  </div>
</template>
<style scoped src="../assets/styles/card.css" />
