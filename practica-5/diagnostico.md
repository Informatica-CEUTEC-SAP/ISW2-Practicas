# Diagnóstico de Clínica de Código — Práctica 5

| # | Problema detectado (`enfermo.js`) | Principio violado | Refactor aplicado (`sano.js`) |
|---|---|---|---|
| 1 | Nombres crípticos (`proc`, `d`, `t`, `p`, `res`, `tot`) que dificultan la lectura. | **Principio 1 (M1):** Nombres con intención clara. | Renombrado a `procesarCitas`, `citas`, `tieneDescuento`, `lista` y `total`. |
| 2 | Números literales dispersos (`1`, `500`, `350`, `1200`, `0.15`) sin contexto. | **Principio 2 (M1):** Eliminación de números mágicos. | Extracción de constantes `ESTADO_ACTIVO`, `PORCENTAJE_DESCUENTO` y `TARIFAS`. |
| 3 | Cadena de `if / else if` que obliga a modificar la función para añadir tarifas. | **Principio 3 (M3 - SOLID OCP):** Abierto/Cerrado. | Uso de diccionario `TARIFAS[tipo]` en lugar de condicionales encadenados. |
| 4 | Una sola función filtra, calcula precios, muta datos e imprime en consola. | **Principio 4 (M3 - SOLID SRP):** Responsabilidad Única. | Separación en `calcularCosto`, `procesarCitas` e `imprimirResumen`. |
| 5 | Código duplicado para el descuento y anidamiento profundo de condicionales. | **Principio 5 (M1 - DRY / Early Return):** No te repitas. | Uso de guard clause (`if (!tieneDescuento) return tarifaBase;`) y `.filter()` / `.map()`. |
