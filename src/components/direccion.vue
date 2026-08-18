<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from 'vue'
import { useLatLng } from '@/store/latLngState'
import { useRouter } from 'vue-router'

const router = useRouter()
const autocompleteInput = ref(null)
const direccionStatus = useLatLng()

const direccion = ref('')
// 1. Inicializamos como null en lugar de string vacante ''
const lat = ref(0)
const lng = ref(0)

// 2. Función de guardado con validación estricta de números
const useSetLatLNG = (lt, lg) => {
  const latitude = Number(lt)
  const longitude = Number(lg)

  // Validamos que sean números reales, finitos y distintos de null/undefined/0
  if (
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    isFinite(latitude) &&
    isFinite(longitude) &&
    latitude !== 0 &&
    longitude !== 0
  ) {
    direccionStatus.setLatLng(latitude, longitude)
    direccionStatus.swichtStatusViewMap()
    direccionStatus.swichtStatus() // Cerramos el modal
  } else {
    alert(
      'Para continuar debes seleccionar una dirección válida de la lista o usar la ubicación automática.',
    )
  }
}

const geolocalizacion_automatica = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitud = position.coords.latitude
        const longitud = position.coords.longitude
        useSetLatLNG(latitud, longitud)
      },
      function (error) {
        console.log('No se pudo obtener la ubicación del dispositivo:', error)
        alert(
          'No se pudo obtener tu ubicación. Intenta más tarde o ingresa tu dirección manualmente.',
        )
      },
    )
  }
}

// Función para la tecla ESC
const manejarTeclaEsc = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    direccionStatus.swichtStatus(false)
  }
}

// Unificamos todo en un solo ciclo de vida onMounted
const app = getCurrentInstance()
const $googleMapsLoader = app.appContext.config.globalProperties.$googleMapsLoader

onMounted(async () => {
  // Listener de teclado
  window.addEventListener('keydown', manejarTeclaEsc)

  // Carga de Autocomplete
  try {
    await $googleMapsLoader.load()

    if (window.google && window.google.maps && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput.value, {
        types: ['address'],
        componentRestrictions: { country: 'mx' },
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry && place.geometry.location) {
          direccion.value = place.formatted_address

          // Asignamos convirtiendo directamente a número
          lat.value = place.geometry.location.lat()
          lng.value = place.geometry.location.lng()
        } else {
          console.log('No se encontraron detalles para la dirección:', place.name)
        }
      })
    }
  } catch (e) {
    console.error('Error cargando la API de Google Maps:', e)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', manejarTeclaEsc)
})
</script>

<template>
  <div class="buscar" @click.self="direccionStatus.swichtStatus(false)">
    <div class="buscar-text" @click.stop>
      <h5 class="text-light notif">Para continuar, necesitamos acceder a tu ubicación:</h5>

      <button class="buscarAuto btn btn-dark" @click="geolocalizacion_automatica">
        <i class="bi bi-geo"></i>ENCONTRAR MI UBICACIÓN AUTOMÁTICAMENTE
      </button>

      <h5 class="text-light">-O- <br />Escribe tu dirección:</h5>

      <div class="input-group input-space">
        <input
          type="text"
          ref="autocompleteInput"
          class="form-control"
          placeholder="Escribe tu calle, colonia o C.P..."
        />
      </div>

      <button type="button" class="buttonbuscar btn btn-dark" @click="useSetLatLNG(lat, lng)">
        <i class="bi bi-check-lg"></i>Aceptar
      </button>
    </div>
  </div>
</template>

<style scoped src="../assets/styles/direccion.css" />
