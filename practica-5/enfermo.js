function proc(d, t) {
  let res = [];
  let tot = 0;
  for (let i = 0; i < d.length; i++) {
    if (d[i].st === 1) {
      if (d[i].tp === 'C') {
        let p = 500;
        if (t === true) {
          p = p - (p * 0.15);
        }
        d[i].costo = p;
        tot += p;
        res.push(d[i]);
      } else if (d[i].tp === 'V') {
        let p = 350;
        if (t === true) {
          p = p - (p * 0.15);
        }
        d[i].costo = p;
        tot += p;
        res.push(d[i]);
      } else if (d[i].tp === 'E') {
        let p = 1200;
        if (t === true) {
          p = p - (p * 0.15);
        }
        d[i].costo = p;
        tot += p;
        res.push(d[i]);
      }
    }
  }
  console.log("Procesadas: " + res.length + " | Total: L." + tot);
  return { lista: res, total: tot };
}

module.exports = { proc };
