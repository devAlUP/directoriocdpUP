export const LadaTelefonos = (telefono) => {
  const depurador = telefono.replaceAll('-', '').replaceAll(' ', '')

  const prefijo = depurador.substr(0, 2)

  let telefono_resuleto

  if (prefijo == 55 || prefijo == 33 || prefijo == 81 || prefijo == 56) {
    telefono_resuleto =
      depurador.substr(0, 2) + '-' + depurador.substr(2, 4) + '-' + depurador.substr(6, 4)
  } else {
    telefono_resuleto =
      depurador.substr(0, 3) + '-' + depurador.substr(3, 3) + '-' + depurador.substr(6, 4)
  }
  console.log(depurador)

  return telefono_resuleto
}
