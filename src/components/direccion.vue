<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useLatLng } from '@/store/latLngState'
const autocompleteInput = ref(null)
const direccionStatus = useLatLng()
const VITE_Maps_API_KEY = 'AIzaSyBky4Bi1jZxJNgpXYmKMx - SQB80InwgT9w' // O tu clave directamente
const direccion = ref('')
const lat = ref()
const lng = ref()

const useSetLatLNG = (lt, lg) => {
  console.log(lt, lg)

  direccionStatus.setLatLng(lt, lg)
  direccionStatus.swichtStatus(false)
  direccionStatus.swichtStatusViewMap()
}

const app = getCurrentInstance()
const $googleMapsLoader = app.appContext.config.globalProperties.$googleMapsLoader
onMounted(async () => {
  try {
    await $googleMapsLoader.load()

    if (window.google && window.google.maps && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput.value, {
        types: ['address'], // Opcional: restringe a tipos de resultados específicos
        componentRestrictions: { country: 'mx' }, // Opcional: restringe a un país (ej. México)
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          console.log('Dirección seleccionada:', place.formatted_address)
          direccion.value = place.formatted_address
          console.log('Latitud:', place.geometry.location.lat())
          lat.value = place.geometry.location.lat()
          console.log(lat.value)

          console.log('Longitud:', place.geometry.location.lng())
          lng.value = place.geometry.location.lng()
          // Aquí puedes emitir un evento, actualizar un store, etc.
          // Por ejemplo: emit('address-selected', place);
        } else {
          console.log('No se encontraron detalles para la dirección:', place.name)
        }
      })
    } else {
      console.error('Google Maps Places library not loaded.')
    }
  } catch (e) {
    console.error('Error cargando la API de Google Maps:', e)
  }
})
</script>
<template>
  <div class="buscar">
    <div class="buscar-text bg-dark">
      <h4 class="text-light">Escribe tu dirección:</h4>
      <div class="input-group input-space">
        <input
          type="text"
          ref="autocompleteInput"
          class="form-control"
          placeholder=""
          aria-label=""
          aria-describedby="button-addon2"
        />
      </div>
      <p class="text-light">la direccion que elegiste es: <br />{{ direccion }}</p>
      <button type="button" class="btn btn-success" @click="useSetLatLNG(lat, lng)">Aceptar</button>
    </div>
  </div>
</template>
<style scoped src="../assets/styles/direccion.css" />
