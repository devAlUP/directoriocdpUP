<script setup>
import { ref, onMounted } from 'vue'
import { GoogleMap, MarkerCluster, CustomMarker } from 'vue3-google-map'
import cdp from '../assets/detail_cdp.json'
import card from './card.vue'
import distanceCDP from './distanceCDP.vue'
import { useCardStatus } from '@/store/hideUnhideCard'
import { useLatLng } from '@/store/latLngState'
const props = defineProps(['lat', 'lng'])
const center = ref({ lat: props.lat, lng: props.lng })
const markerOptions = ref({ position: center.value, title: 'mi ubicacion' })
const cdpdir = ref(cdp)
const storeCard = useCardStatus()
const direccionStatus = useLatLng()
const Unhide = (data) => {
  storeCard.setdata(data)
  storeCard.swichtStatus(true)
  console.log(storeCard.statusCard)
}
const mapStyles = ref([
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#000000' }, // Verde claro
    ],
  },
])

console.log(cdpdir.value)
</script>
<template>
  <section>
    <div class="p_uno">
      <GoogleMap
        api-key="AIzaSyBky4Bi1jZxJNgpXYmKMx-SQB80InwgT9w"
        mapId="f90d18df990b00e779f908dd"
        class="map"
        :center="center"
        :zoom="12"
        :styles="mapStyles"
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
            v-for="(location, i) in cdpdir"
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
      <distanceCDP v-if="direccionStatus.lat != 0 && direccionStatus.lng != 0" />
    </div>
  </section>
</template>
<style scoped src="../assets/styles/mapview.css" />
