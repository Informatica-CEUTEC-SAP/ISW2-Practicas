// practica-5/sano.js
const ESTADO_ACTIVO = 1;
const PORCENTAJE_DESCUENTO = 0.15;

const TARIFAS_POR_TIPO = {
  C: 500,  // Consulta
  V: 350,  // Vacuna
  E: 1200, // Especialidad
};

function calcularCostoCita(tipo, tieneDescuento) {
  const tarifaBase = TARIFAS_POR_TIPO[tipo] ?? 0;
  if (!tieneDescuento) return tarifaBase;
  return tarifaBase * (1 - PORCENTAJE_DESCUENTO);
}

function procesarCitas(citas, tieneDescuento = false) {
  const citasProcesadas = citas
    .filter((cita) => cita.st === ESTADO_ACTIVO)
    .map((cita) => ({
      ...cita,
      costo: calcularCostoCita(cita.tp, tieneDescuento),
    }));

  const total = citasProcesadas.reduce((acumulado, cita) => acumulado + cita.costo, 0);

  return { lista: citasProcesadas, total };
}

function imprimirResumen(resumen) {
  console.log(`Procesadas: ${resumen.lista.length} | Total: L.${resumen.total}`);
}

module.exports = { procesarCitas, calcularCostoCita, imprimirResumen };
