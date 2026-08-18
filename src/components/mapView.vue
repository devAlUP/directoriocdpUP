<script setup>
import { ref, onMounted, computed } from 'vue'
import { GoogleMap, MarkerCluster, CustomMarker } from 'vue3-google-map'
//componentes
import direccion from './direccion.vue'
import card from './card.vue'
import distanceCDP from './distanceCDP.vue'
//stores
import { useCardStatus } from '@/store/hideUnhideCard'
const storeCard = useCardStatus()
import { useLatLng } from '@/store/latLngState'
const datosUbicacion = useLatLng()
import { useStoreCDP } from '@/store/Negocio/StoreCDP.js'
const CasasDePaz = useStoreCDP()
//pintar centro en mapa
const markerOptions = computed(() => {
  if (datosUbicacion.lat && datosUbicacion.lng) {
    return {
      position: { lat: Number(datosUbicacion.lat), lng: Number(datosUbicacion.lng) },
      title: 'Mi ubicación',
    }
  }
  return null
})
const centroMapa = computed(() => {
  if (datosUbicacion.lat && datosUbicacion.lng) {
    return { lat: Number(datosUbicacion.lat), lng: Number(datosUbicacion.lng) }
  }

  return { lat: 19.432608, lng: -99.133209 }
})

//props

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
})

//funciones
const Unhide = (data) => {
  storeCard.setdata(data)
  storeCard.swichtStatus(true)
  console.log(storeCard.statusCard)
}
const seleccionarCasaPorMagicLink = (casaId) => {
  console.log(CasasDePaz.CasasDePaz)
  if (!casaId || !CasasDePaz.CasasDePaz.length) return

  const casaEncontrada = CasasDePaz.CasasDePaz.find((casa) => casa.casa_id == casaId)
  console.log(casaEncontrada)

  if (casaEncontrada) {
    Unhide(casaEncontrada)
  }
}
//ciclo vida
onMounted(async () => {
  await CasasDePaz.EstablcerCasasDePaz()
  if (props.id) {
    seleccionarCasaPorMagicLink(props.id)
  }
})
</script>
<template>
  <direccion v-if="datosUbicacion.modalStatus == true" />
  <section v-if="CasasDePaz.CasasDePaz.length > 0 && datosUbicacion.lat && datosUbicacion.lng">
    <div class="p_uno">
      <div class="mapa-header">
        <h5 class="mapa-titulo"><i class="bi bi-geo-alt-fill me-2"></i>NUESTRAS CASAS DE PAZ</h5>
        <span class="mapa-subtitulo">Ubicaciones disponibles</span>
      </div>
      <GoogleMap
        api-key="AIzaSyBky4Bi1jZxJNgpXYmKMx-SQB80InwgT9w"
        mapId="f90d18df990b00e779f908dd"
        class="map"
        :center="centroMapa"
        :zoom="15"
        :disable-default-ui="true"
        :zoom-control="true"
      >
        <CustomMarker :options="markerOptions">
          <div style="text-align: center">
            <div style="font-size: 1.125rem">
              <img src="../assets/pinUB.png" width="50" height="50" style="margin-top: 8px" />
            </div>
          </div>
        </CustomMarker>
        <MarkerCluster>
          <CustomMarker
            v-for="(location, i) in CasasDePaz.CasasDePaz"
            :key="i"
            :options="{ position: location, anchorPoint: 'BOTTOM_CENTER' }"
          >
            <div style="text-align: center" @click="Unhide(location)">
              <div style="font-size: 1.125rem">
                <img src="../assets/logo.png" width="50" height="50" style="margin-top: 8px" />
              </div>
            </div>
          </CustomMarker>
        </MarkerCluster>
      </GoogleMap>
    </div>
    <div class="p_dos">
      <card v-if="storeCard.statusCard == true" />
      <distanceCDP v-if="datosUbicacion.lat != 0 && datosUbicacion.lng != 0" />
    </div>
  </section>
</template>
<style scoped src="../assets/styles/mapview.css" />
