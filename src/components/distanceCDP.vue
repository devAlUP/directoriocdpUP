<script setup>
import { useCardStatus } from '@/store/hideUnhideCard'
const storeCard = useCardStatus()
import { Loader } from '@googlemaps/js-api-loader'

import cdp from '../assets/detail_cdp.json'
import { ref, onMounted, getCurrentInstance } from 'vue'
const cdpdir = ref(cdp)
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

  storeCard.setdata(data)
  storeCard.swichtStatus(true)
  console.log(storeCard.statusCard)
}

////funcion de calculo de distancias
const calcularDistancia = async () => {
  console.log(direccionStatus.lat, direccionStatus.lng)

  try {
    await $googleMapsLoader.load()

    ///inicio de calculo
    const service = new window.google.maps.DistanceMatrixService()
    const distancePromises = []
    for (let index = 0; index < cdpdir.value.length; index++) {
      const promise = new Promise((resolve, reject) => {
        service.getDistanceMatrix(
          {
            origins: [{ lat: direccionStatus.lat, lng: direccionStatus.lng }], // Orígenes (pueden ser múltiples)
            destinations: [cdpdir.value[index]], // Destinos (pueden ser múltiples)
            travelMode: 'WALKING', // Modo de viaje (DRIVING, WALKING, BICYCLING, TRANSIT)
            unitSystem: window.google.maps.UnitSystem.METRIC, // O IMPERIAL
            avoidHighways: false,
            avoidTolls: false,
          },
          (response, status) => {
            distanciaInfo.value.push(response)
            if (status === 'OK') {
              resolve({ response, cdpData: cdpdir.value[index], originalIndex: index }) // Resuelve con la respuesta y los datos originales de la CDP
            } else {
              reject(
                new Error(
                  `Error en getDistanceMatrix para ${cdpdir.value[index].nombre || index}: ${status}`,
                ),
              )
            }
          },
        )
      })
      // Agrega la promesa al array
      distancePromises.push(promise)
    }
    const allResponses = await Promise.all(distancePromises)
    let dists = [] // Este será el array con los datos limpios y procesados

    allResponses.forEach(({ response, cdpData, originalIndex }) => {
      distanciaInfo.value.push(response) // Si quieres guardar las respuestas crudas de la API

      const element = response.rows[0]
      if (
        element &&
        element.elements &&
        element.elements[0] &&
        element.elements[0].status === 'OK'
      ) {
        let distancia = element.elements[0].distance.text
        distancia = distancia.replace('km', '').replace('m', '').replaceAll(' ', '') // Quitar 'm' también si es el caso
        distancia = parseFloat(distancia)

        dists.push({
          distance: distancia,
          nombre: cdpData.nombre, // Usar cdpData que pasamos en la promesa
          direccion: cdpData.direccion,
          lider: cdpData.lider,
          telefono: cdpData.telefono,
          colider_uno: cdpData.colider_uno,
          colider_dos: cdpData.colider_dos, // Asegurar que existan
          horario: cdpData.horario,
          lat: cdpData.lat,
          lng: cdpData.lng,
          img: cdpData.img,
        })
      } else {
        // Manejar casos donde el estado no es OK (ej. NOT_FOUND, ZERO_RESULTS)
        console.warn(
          `No se pudo obtener la distancia para ${cdpData.nombre || 'CDP' + originalIndex}. Estado: ${element?.elements[0]?.status || 'N/A'}`,
        )
        dists.push({
          distance: 1000000, // Un valor muy alto para indicar que está lejos o inaccesible
          nombre: cdpData.nombre,
          direccion: cdpData.direccion,
          lider: cdpData.lider,
          telefono: cdpData.telefono,
          colider_uno: cdpData.colider_uno,
          colider_dos: cdpData.colider_dos,
          horario: cdpData.horario,
          lat: cdpData.lat,
          lng: cdpData.lng,
          status: element?.elements[0]?.status || 'ERROR', // Para depuración
          img: cdpData.img,
        })
      }
    })
    console.log(dists)

    dists.sort((a, b) => a.distance - b.distance)
    cdpCercana.value = dists.slice(0, 3)
    console.log(cdpCercana.value)
  } catch (e) {
    error.value = 'Error al cargar la API de Google Maps: ' + e
  }
}
onMounted(async () => {
  if ((direccionStatus.lat == 0, direccionStatus.lng == 0)) {
    console.log('no se han encontrado los datos', direccionStatus.lng)
  } else {
    calcularDistancia()
  }

  // console.log(cdpdir.value)
})
</script>
<template>
  <h3 class="text-light" @click="calcularDistancia()">Te recomendamos:</h3>
  <div class="caja-recomendacion" v-for="(index, i) in cdpCercana">
    <img :src="index.img" alt="" />
    <div class="datos">
      <h5 class="text-light">{{ index.nombre }}</h5>
      <p class="text-light">Dirección {{ index.direccion }}</p>
      <p @click="Unhide(index)" class="text-info">Ver mas</p>
    </div>
  </div>
</template>
<style scoped src="../assets/styles/distance.css" />
