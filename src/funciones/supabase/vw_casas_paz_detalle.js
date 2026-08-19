import { supabase } from '@/Servicios/supabaseConfig'

export const traerFullCasasDePaz = async () => {
  const { data, error } = await supabase.schema('CDP_UP').from('vw_casas_paz_detalle').select('*')

  if (error) {
    console.error('Error cargando Casas de Paz:', error)
    return { status: 'Error', Error: error.message }
  } else {
    return { status: 'Exito', datos: data }
  }
}
