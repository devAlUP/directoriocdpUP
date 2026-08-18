import { traerFullCasasDePaz } from '@/funciones/supabase/vw_casas_paz_detalle'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useStoreCDP = defineStore('CDPdata', () => {
  const CasasDePaz = ref([])

  const EstablcerCasasDePaz = async () => {
    const resultadoDescarga = await traerFullCasasDePaz()

    if (resultadoDescarga.status != 'Exito') return resultadoDescarga
    CasasDePaz.value = resultadoDescarga.datos
    return { status: 'Exito' }
  }

  return { EstablcerCasasDePaz, CasasDePaz }
})
