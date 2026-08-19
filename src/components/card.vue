<script setup>
import { ref, onMounted, computed } from 'vue'

import { GoogleMap, MarkerCluster, CustomMarker } from 'vue3-google-map'
import { useLatLng } from '@/store/latLngState'
import { useCardStatus } from '@/store/hideUnhideCard'
const storeCard = useCardStatus()
const direccionStatus = useLatLng()
const center = ref({ lat: direccionStatus.lat, lng: direccionStatus.lng })
const markerOptions = ref({ position: center.value, title: 'mi ubicacion' })
const telefono = ref('')
const telefonoValido = computed(() => {
  const soloNumeros = telefono.value.replace(/\D/g, '')
  return soloNumeros.length >= 10
})

console.log(storeCard.dataCard.img)

const loader = ref(true)
setTimeout(() => {
  loader.value = false
}, 2000)

const compartirPorWhatsApp = () => {
  if (telefonoValido.value != true) {
    alert('ingresa un telefono valido para continuar (10 Digitos)')
    return
  }

  // 1. Limpiamos el teléfono (nos aseguramos de incluir la clave del país si es necesario, ej. México 52)
  let numLimpio = telefono.value.replace(/\D/g, '')
  if (numLimpio.length === 10) {
    numLimpio = `52${numLimpio}` // Prefijo internacional para México
  }

  // 2. Obtenemos los datos de la Casa de Paz desde el store
  const casa = storeCard.dataCard
  const linkMagico = `${window.location.origin}/mapa/${storeCard.dataCard.casa_id}`

  // 3. Mensaje personalizado
  const mensaje = `¡Hola! Te invito a visitar la Casa de Paz "${storeCard.dataCard.nombre || 'Nuestra Casa'}". Puedes ver la ubicación exacta y cómo llegar aquí: ${linkMagico}`

  // 4. Generamos y abrimos el enlace oficial de WhatsApp Web / App
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numLimpio}&text=${encodeURIComponent(mensaje)}`
  window.open(urlWhatsApp, '_blank')
}
</script>
<template>
  <div class="c-font">
    <button
      @click="storeCard.swichtStatus(false)"
      type="button"
      class="btn-close btn-close-white bt-close"
      aria-label="Close"
    ></button>
    <div class="card bg-black c-fixed">
      <!-- Contenedor Superior del Mapa -->
      <div class="map-container">
        <GoogleMap
          api-key="AIzaSyBky4Bi1jZxJNgpXYmKMx-SQB80InwgT9w"
          mapId="f90d18df990b00e779f908dd"
          class="map"
          :center="center"
          :zoom="12"
          :disable-default-ui="true"
          :zoom-control="false"
        >
          <CustomMarker :options="markerOptions">
            <div style="text-align: center">
              <img src="../assets/pinUB.png" width="40" height="40" />
            </div>
          </CustomMarker>

          <CustomMarker
            :options="{
              position: { lat: storeCard.dataCard.lat, lng: storeCard.dataCard.lng },
              anchorPoint: 'BOTTOM_CENTER',
            }"
          >
            <div style="text-align: center">
              <img src="../assets/logo.png" width="40" height="40" />
            </div>
          </CustomMarker>
        </GoogleMap>

        <!-- Overlay con Perfil + Nombre sobre el mapa -->
        <div class="hero-overlay">
          <img class="profile-img" :src="storeCard.dataCard.img" :alt="storeCard.dataCard.nombre" />
          <div class="title-container">
            <h4 class="card-title">{{ storeCard.dataCard.nombre }}</h4>
          </div>
        </div>
      </div>

      <!-- Cuerpo de la Tarjeta con Información -->
      <div class="card-body">
        <!-- Dirección completa -->
        <p class="card-address">
          <i class="bi bi-geo-alt-fill text-danger me-1"></i>
          {{ storeCard.dataCard.direccion }}
        </p>

        <!-- Grid de Datos (2 Columnas) -->
        <div class="grid-info">
          <div class="datos-card" v-if="storeCard.dataCard.horario">
            <span class="label"><i class="bi bi-clock me-1"></i> Horario</span>
            <p class="value">{{ storeCard.dataCard.horario }}</p>
          </div>

          <div class="datos-card" v-if="storeCard.dataCard.telefono">
            <span class="label"><i class="bi bi-telephone me-1"></i> Teléfono</span>
            <p class="value">{{ storeCard.dataCard.telefono }}</p>
          </div>

          <div
            class="datos-card"
            v-if="storeCard.dataCard.lider && storeCard.dataCard.lider !== ' Joel Irazabal'"
          >
            <span class="label"><i class="bi bi-person-fill me-1"></i> Líder</span>
            <p class="value">{{ storeCard.dataCard.lider }}</p>
          </div>

          <div
            class="datos-card"
            v-if="storeCard.dataCard.colider && storeCard.dataCard.colider !== 'n/a'"
          >
            <span class="label"><i class="bi bi-person-badge me-1"></i> Colíder</span>
            <p class="value">{{ storeCard.dataCard.colider }}</p>
          </div>
        </div>

        <!-- Sección de WhatsApp (AQUÍ AFUERA DEL GRID-INFO) -->
        <div class="card-actions">
          <label for="whatsapp-phone" class="input-label">
            <i class="bi bi-send-fill me-1"></i> Compartir por WhatsApp
          </label>

          <div class="whatsapp-input-group">
            <input
              id="whatsapp-phone"
              v-model="telefono"
              type="tel"
              class="input-whatsapp"
              placeholder="Número (ej. 5512345678)"
              maxlength="10"
              @keyup.enter="compartirPorWhatsApp"
            />
            <button
              type="button"
              class="btn-whatsapp"
              @click="compartirPorWhatsApp"
              :disabled="!telefonoValido"
            >
              <i class="bi bi-whatsapp me-1"></i> ENVIAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loader -->
  <div class="loader" v-if="loader">
    <img src="../assets/loader.png" alt="Cargando..." />
    <h1 class="text-light">Cargando...</h1>
  </div>
</template>
<style scoped src="../assets/styles/card.css" />
