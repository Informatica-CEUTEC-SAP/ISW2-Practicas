function procesarCitas(citas, tieneDescuento) {
  let resultado = [];
  let total = 0;
  for (let i = 0; i < citas.length; i++) {
    if (citas[i].st === 1) {
      if (citas[i].tp === 'C') {
        let precio = 500;
        if (tieneDescuento === true) {
          precio = precio - (precio * 0.15);
        }
        citas[i].costo = precio;
        total += precio;
        resultado.push(citas[i]);
      } else if (citas[i].tp === 'V') {
        let precio = 350;
        if (tieneDescuento === true) {
          precio = precio - (precio * 0.15);
        }
        citas[i].costo = precio;
        total += precio;
        resultado.push(citas[i]);
      } else if (citas[i].tp === 'E') {
        let precio = 1200;
        if (tieneDescuento === true) {
          precio = precio - (precio * 0.15);
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
