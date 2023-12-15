onmessage = function (e) {
  console.log("Message received from main script", e.data);
  var data = e.data; // generar los datos enviados

  // Función para generar todas las combinaciones posibles de longitud n
  function generarCombinaciones(n) {
    var combinaciones = [];

    switch (n) {
      case 2:
        for (var index = 0; index <= 2; index++) {
          for (var i = 0; i < Math.pow(2, index); i++) {
            var binario = i.toString(2);
            while (binario.length < index) {
              binario = "0" + binario;
            }
            combinaciones.push(binario);
          }
        }
        break;
      case 3:
        for (var index = 0; index <= 4; index++) {
          for (var i = 0; i < Math.pow(2, index); i++) {
            var binario = i.toString(2);
            while (binario.length < index) {
              binario = "0" + binario;
            }
            combinaciones.push(binario);
          }
        }
      case 4:
        for (var index = 0; index <= 6; index++) {
          for (var i = 0; i < Math.pow(2, index); i++) {
            var binario = i.toString(2);
            while (binario.length < index) {
              binario = "0" + binario;
            }
            combinaciones.push(binario);
          }
        }
    }

    return combinaciones;
  }

  // Función para generar todos los autómatas
  function generarAutomatas(numEstados) {
    let automatas = [];
    if (numEstados == 2) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            for (let l = 0; l < 2; l++) {
              for (let m = 0; m < 2; m++) {
                for (let n = 0; n < 2; n++) {
                  // Filtro para evitar autómatas con el mismo valor en el primer dígito de cada tercia
                  if (i === l) {
                    continue;
                  }
                  //filtro para evitar redundancia en el primer estado
                  if (j == 0 && k == 0) {
                    continue;
                  }
                  automatas.push([i, j, k, l, m, n]);
                }
              }
            }
          }
        }
      }
    }
    if (numEstados == 3) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 2; l++) {
              for (let m = 0; m < 3; m++) {
                for (let n = 0; n < 3; n++) {
                  for (let o = 0; o < 2; o++) {
                    for (let p = 0; p < 3; p++) {
                      for (let q = 0; q < 3; q++) {
                        // Filtro para evitar autómatas con el mismo valor en el primer dígito de cada tercia
                        if (i === l && l === o) {
                          continue;
                        }
                        //filtro para evitar redundancia en el primer estado
                        if (j == 0 && k == 0) {
                          continue;
                        }
                        automatas.push([i, j, k, l, m, n, o, p, q]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return automatas;
  }

  function sonEquivalentes(automata1, automata2, cadenas) {
    if (automata1 == automata2) {
      return true;
    }
    for (var i = 0; i < cadenas.length; i++) {
      var cadena = cadenas[i];
      var estado1 = 0;
      var estado2 = 0;

      for (var j = 0; j < cadena.length; j++) {
        var simbolo = cadena[j];
        if (simbolo == 1) {
          sumar = 1;
        } else {
          sumar = 0;
        }
        estado1 = automata1[estado1 * 3 + sumar + 1];

        estado2 = automata2[estado2 * 3 + sumar + 1];
      }
      if (automata1[estado1 * 3] != automata2[estado2 * 3]) {
        return false;
      }
    }
    return true;
  }

  var contador = 0;
  function generarAutomatasNoEquivalentesBase(numEstados) {
    // Generar todos los autómatas
    var automatas = generarAutomatas(numEstados);

    // Crear los autómatas base
    var baseAutomatas = generarBaseAutomatas(numEstados);

    // Filtrar los autómatas que son equivalentes a los autómatas base
    automatas.filter((automata) => {
      for (var i = 0; i < baseAutomatas.length; i++) {
        if (
          sonEquivalentes(
            automata,
            baseAutomatas[i],
            generarCombinaciones(numEstados)
          )
        ) {
          // Si el autómata es equivalente a uno en el conjunto base, lo descartamos
          return false;
        }
      }
      // Si el autómata no es equivalente a ninguno en el conjunto base, lo agregamos al conjunto base
      baseAutomatas.push(automata);
      contador++;
        if (contador >= 300) {
          self.postMessage(baseAutomatas);
          contador = 0;
      }
      return true;
    });
    console.log("THE END");
    return baseAutomatas;
  }

  function generarBaseAutomatas(numEstados) {
    switch (numEstados) {
      case 2:
        return [
          [0, 0, 0, 0, 0, 0],
          [1, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 0, 0],
          [1, 1, 1, 0, 0, 0],
        ];
      case 3:
        return [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 1, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0, 0, 0, 0, 0],
          [1, 1, 1, 0, 0, 0, 0, 0, 0],
        ];
    }
  }
  console.log(generarAutomatas(data.numEstados).length);
  // llamar a la función principal
  var result = generarAutomatasNoEquivalentesBase(data.numEstados, data);

  // enviar los resultados al hilo principal
  postMessage(result);
};
