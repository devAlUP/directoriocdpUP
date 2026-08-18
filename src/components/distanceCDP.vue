<script setup>
import { useCardStatus } from '@/store/hideUnhideCard'
const storeCard = useCardStatus()
import { Loader } from '@googlemaps/js-api-loader'

import { useStoreCDP } from '@/store/Negocio/StoreCDP'
const CasasDePaz = useStoreCDP()
import { ref, onMounted, getCurrentInstance } from 'vue'
const cdpdir = ref(CasasDePaz.CasasDePaz)
import { useLatLng } from '@/store/latLngState'

const direccionStatus = useLatLng()
const distanciaInfo = ref([])
const error = ref(null)

const cdpCercana = ref(null)
const dataCard = ref({})
const app = getCurrentInstance()
const $googleMapsLoader = app.appContext.config.globalProperties.$googleMapsLoader
const Unhide = (data) => {
  console.log(data)
  console.log(cdpCercana.value)

  storeCard.setdata(data)
  storeCard.swichtStatus(true)
  console.log(storeCard.statusCard)
}

////funcion de calculo de distancias
const getHaversineMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

const calcularDistanciaHibrida = async () => {
  if (!cdpdir.value || cdpdir.value.length === 0) return

  const originLat = parseFloat(direccionStatus.lat)
  const originLng = parseFloat(direccionStatus.lng)

  // 1. Filtrar localmente las 5 mejores opciones según distancia en línea recta
  const candidatasLocal = cdpdir.value
    .map((cdp) => ({
      ...cdp,
      distanciaAprox: getHaversineMeters(
        originLat,
        originLng,
        parseFloat(cdp.lat),
        parseFloat(cdp.lng),
      ),
    }))
    .sort((a, b) => a.distanciaAprox - b.distanciaAprox)
    .slice(0, 5) // Tomamos solo las 5 más cercanas

  try {
    await $googleMapsLoader.load()
    const service = new window.google.maps.DistanceMatrixService()

    const destinos = candidatasLocal.map((item) => ({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lng),
    }))

    // 2. Una sola llamada limpia de 5 elementos a Google Maps
    service.getDistanceMatrix(
      {
        origins: [{ lat: originLat, lng: originLng }],
        destinations: destinos,
        travelMode: 'WALKING',
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === 'OK' && response.rows[0]?.elements) {
          const elements = response.rows[0].elements
          const dists = []

          elements.forEach((element, index) => {
            const cdpData = candidatasLocal[index]
            if (element.status === 'OK') {
              dists.push({
                distance: element.distance.value, // Metros reales caminando
                distanciaTexto: element.distance.text,
                nombre: cdpData.nombre,
                direccion_completa: cdpData.direccion_completa,
                lider_nombre: cdpData.lider_nombre,
                telefono: cdpData.telefono,
                colider_1_nombre: cdpData.colider_1_nombre,
                colider_2_nombre: cdpData.colider_2_nombre,
                horario: cdpData.horario,
                lat: parseFloat(cdpData.lat),
                lng: parseFloat(cdpData.lng),
                img: cdpData.img,
              })
            }
          })

          dists.sort((a, b) => a.distance - b.distance)
          cdpCercana.value = dists.slice(0, 3)
        }
      },
    )
  } catch (e) {
    console.error('Error:', e)
  }
}
onMounted(async () => {
  if ((direccionStatus.lat == 0, direccionStatus.lng == 0)) {
    console.log('no se han encontrado los datos', direccionStatus.lng)
  } else {
    calcularDistanciaHibrida()
  }

  // console.log(cdpdir.value)
})
</script>
<template>
  <div class="contenedor">
    <h3 class="text-light" @click="calcularDistancia()">Te recomendamos:</h3>
    <div class="carrusel-tarjetas">
      <div class="caja-recomendacion" v-for="(cdp, i) in cdpCercana" @click="Unhide(cdp)">
        <div class="header-tarjeta">
          <span
            class="badge-medalla"
            :class="{
              'medalla-oro': i === 0,
              'medalla-plata': i === 1,
              'medalla-bronce': i === 2,
            }"
          >
            #{{ i + 1 }}
          </span>
          <h5 class="nombre-cdp">{{ cdp.nombre }}</h5>
        </div>
        <div class="componetes-tarjeta">
          <div class="img-container">
            <img :src="cdp.img" :alt="cdp.nombre" />
          </div>

          <div class="datos">
            <p class="direccion-cdp"><strong>Dirección:</strong> {{ cdp.direccion_completa }}</p>
            <p class="direccion-cdp">
              <strong>Distancia aproximada:</strong> {{ cdp.distance }} metros
            </p>
          </div>
        </div>
        <button type="button" class="btn btn-dark">Ver más <i class="bi bi-three-dots"></i></button>
      </div>
    </div>
    <div class="brand-iglesia">
      <img src="/titulo.png" alt="Logo Iglesia" class="logo-img" />
      <span class="nombre-iglesia">UN PROPÓSITO</span>
    </div>
  </div>
</template>
<style scoped src="../assets/styles/distance.css" />
