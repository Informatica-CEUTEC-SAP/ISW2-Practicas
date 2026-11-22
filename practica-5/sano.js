const ESTADO_ACTIVO = 1;
const PORCENTAJE_DESCUENTO = 0.15;
const TARIFAS = { C: 500, V: 350, E: 1200 };

function calcularCosto(tipo, tieneDescuento) {
  const tarifaBase = TARIFAS[tipo] ?? 0;
  if (!tieneDescuento) return tarifaBase;
  return tarifaBase * (1 - PORCENTAJE_DESCUENTO);
}

function procesarCitas(citas, tieneDescuento = false) {
  const lista = citas
    .filter((cita) => cita.st === ESTADO_ACTIVO && TARIFAS[cita.tp])
    .map((cita) => ({
      ...cita,
      costo: calcularCosto(cita.tp, tieneDescuento),
    }));

  const total = lista.reduce((suma, cita) => suma + cita.costo, 0);

  return { lista, total };
}

function imprimirResumen(resumen) {
  console.log(`Procesadas: ${resumen.lista.length} | Total: L.${resumen.total}`);
}

module.exports = { procesarCitas, calcularCosto, imprimirResumen };
