export const LadaTelefonos = (telefono) => {
  const depurador = telefono.replaceAll('-', '')

  const prefijo = depurador.substr(0, 2)

  let telefono_resuleto

  if (prefijo == 55 || prefijo == 33 || prefijo == 81 || prefijo == 56) {
    telefono_resuleto =
      prefijo +
      '-' +
      depurador.substr(2, 3) +
      '-' +
      depurador.substr(5, 2) +
      '-' +
      depurador.substr(7, 3)
  } else {
    telefono_resuleto =
      depurador.substr(0, 3) +
      '-' +
      depurador.substr(3, 3) +
      '-' +
      depurador.substr(6, 2) +
      '-' +
      depurador.substr(8, 2)
  }

  return telefono_resuleto
}
