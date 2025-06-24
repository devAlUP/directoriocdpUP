import { defineStore } from 'pinia'
import { LadaTelefonos } from '@/assets/Utilities/sepadador_ladas'
import { ref } from 'vue'
export const useCardStatus = defineStore('hideUnhide', () => {
  const statusCard = ref(false)
  const dataCard = ref({})

  const swichtStatus = (val) => {
    statusCard.value = val
  }
  const setdata = (data) => {
    dataCard.value.nombre = data.nombre
    dataCard.value.direccion = data.direccion
    dataCard.value.lider = data.lider
    dataCard.value.colider = data.colider_uno + ' ' + data.colider_dos
    dataCard.value.telefono = LadaTelefonos(data.telefono)
    dataCard.value.horario = data.horario
    dataCard.value.lat = data.lat
    dataCard.value.lng = data.lng
    dataCard.value.img = data.img
    console.log(data.img)
  }
  return { statusCard, swichtStatus, dataCard, setdata }
})
