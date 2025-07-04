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
    let aux_colider
    if (data.colider_uno == 'n/a' && data.colider_dos == 'n/a') {
      aux_colider = 'n/a'
    }
    if (data.colider_uno != 'n/a' && data.colider_dos != 'n/a') {
      aux_colider = data.colider_uno + ' y ' + data.colider_dos
    }

    if (data.colider_uno != 'n/a' && data.colider_dos == 'n/a') {
      aux_colider = data.colider_uno
    }

    dataCard.value.nombre = data.nombre
    dataCard.value.direccion = data.direccion
    dataCard.value.lider = data.lider
    dataCard.value.colider = aux_colider
    dataCard.value.telefono = LadaTelefonos(data.telefono)
    dataCard.value.horario = data.horario
    dataCard.value.lat = data.lat
    dataCard.value.lng = data.lng
    dataCard.value.img = data.img
    console.log(data.img)
    console.log(dataCard.value.colider)
    console.log(LadaTelefonos(data.telefono))
  }
  return { statusCard, swichtStatus, dataCard, setdata }
})
