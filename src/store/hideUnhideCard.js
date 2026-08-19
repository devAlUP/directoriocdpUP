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
    if (!data.colider_1_nombre && !data.colider_2_nombre) {
      aux_colider = 'n/a'
    }
    if (data.colider_1_nombre && data.colider_2_nombre) {
      aux_colider = data.colider_1_nombre + ' y ' + data.colider_2_nombre
    }

    if (data.colider_1_nombre && !data.colider_2_nombre) {
      aux_colider = data.colider_1_nombre
    }

    dataCard.value.nombre = data.nombre
    dataCard.value.direccion = data.direccion_completa || data.direccion
    dataCard.value.lider = data.lider_nombre
    dataCard.value.colider = aux_colider
    dataCard.value.telefono = LadaTelefonos(data.telefono)
    dataCard.value.horario = data.horario
    dataCard.value.lat = data.lat
    dataCard.value.lng = data.lng
    dataCard.value.img = data.img
    dataCard.value.casa_id = data.casa_id
  }
  return { statusCard, swichtStatus, dataCard, setdata }
})
