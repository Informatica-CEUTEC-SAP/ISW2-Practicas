const ESTADO_ACTIVO = 1;
const PORCENTAJE_DESCUENTO = 0.15;
const TARIFAS = { C: 500, V: 350, E: 1200 };

function procesarCitas(citas, tieneDescuento) {
  let resultado = [];
  let total = 0;
  for (let i = 0; i < citas.length; i++) {
    if (citas[i].st === ESTADO_ACTIVO) {
      let precio = TARIFAS[citas[i].tp];
      if (precio) {
        if (tieneDescuento === true) {
          precio = precio - (precio * PORCENTAJE_DESCUENTO);
        }
        citas[i].costo = precio;
        total += precio;
        resultado.push(citas[i]);
      }
    }
  }
  console.log("Procesadas: " + resultado.length + " | Total: L." + total);
  return { lista: resultado, total: total };
}

module.exports = { proc: procesarCitas };
