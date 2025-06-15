import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLatLng = defineStore('latLng', () => {
  const lat = ref(0)
  const lng = ref(0)
  const showMap = ref(false)
  const modalStatus = ref(false)

  const swichtStatus = (val) => {
    modalStatus.value = val
  }
  const swichtStatusViewMap = () => {
    showMap.value = !showMap.value
  }
  const setLatLng = (lt, lg) => {
    console.log(typeof lt, lg)

    lat.value = lt
    lng.value = lg
    console.log(lat.value, lng.value)
  }
  return { lat, lng, swichtStatus, setLatLng, modalStatus, swichtStatusViewMap, showMap }
})
