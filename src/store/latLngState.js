import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLatLng = defineStore('latLng', () => {
  const lat = ref(0)
  const lng = ref(0)
  const showMap = ref(false)
  const modalStatus = ref(true)

  const swichtStatus = () => {
    modalStatus.value = !modalStatus.value
  }
  const swichtStatusViewMap = () => {
    showMap.value = !showMap.value
  }
  const setLatLng = (lt, lg) => {
    lat.value = lt
    lng.value = lg
    console.log(lng.value, lng.value)
  }
  return { lat, lng, swichtStatus, setLatLng, modalStatus, swichtStatusViewMap, showMap }
})
