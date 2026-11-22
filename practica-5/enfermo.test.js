const assert = require('node:assert');
const { proc } = require('./enfermo');

function runTests() {
  const citasMock = [
    { id: 1, paciente: 'Max', st: 1, tp: 'C' },
    { id: 2, paciente: 'Luna', st: 0, tp: 'V' },
    { id: 3, paciente: 'Rocky', st: 1, tp: 'V' },
    { id: 4, paciente: 'Mia', st: 1, tp: 'E' }
  ];

  // Test 1: Sin descuento
  const resNormal = proc(JSON.parse(JSON.stringify(citasMock)), false);
  assert.strictEqual(resNormal.lista.length, 3);
  assert.strictEqual(resNormal.total, 2050);
  assert.strictEqual(resNormal.lista[0].costo, 500);

  // Test 2: Con descuento del 15%
  const resDescuento = proc(JSON.parse(JSON.stringify(citasMock)), true);
  assert.strictEqual(resDescuento.total, 1742.5);
  assert.strictEqual(resDescuento.lista[2].costo, 1020);

  console.log('Todos los tests pasaron en verde.');
}

runTests();
