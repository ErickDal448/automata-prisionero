

onmessage = function (e) {
  console.log("Message received from main script", e.data);
  var data = e.data; // Aquí se generan los datos enviados

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
      // case 4:
      //   for (var index = 0; index <= 6; index++) {
      //     for (var i = 0; i < Math.pow(2, index); i++) {
      //       var binario = i.toString(2);
      //       while (binario.length < index) {
      //         binario = "0" + binario;
      //       }
      //       combinaciones.push(binario);
      //     }
      //   }
    }

    return combinaciones;
  }

  // Función para generar todos los autómatas
  function generarAutomatas(numEstados) {
    let automatas = [];
    if (numEstados == 2) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          let automata1 = i.toString(2).padStart(3, "0");
          let automata2 = j.toString(2).padStart(3, "0");
          // Filtro para evitar autómatas con el mismo valor en el primer dígito de cada estado
          if (automata1[0] === automata2[0]) {
            continue;
          }

          //filtro para evitar redundancia en el primer estado
          if (automata1[1] == 0 && automata1[2] == 0) {
            continue;
          }

          automatas.push([
            parseInt(automata1[0]),
            parseInt(automata1[1]),
            parseInt(automata1[2]),
            parseInt(automata2[0]),
            parseInt(automata2[1]),
            parseInt(automata2[2]),
          ]);
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
                        let automata1 = [i, j, k];
                        let automata2 = [l, m, n];
                        let automata3 = [o, p, q];
                        // Filtro para evitar autómatas con el mismo valor en el primer dígito de cada tercia
                        if (
                          automata1[0] === automata2[0] &&
                          automata2[0] === automata3[0]
                        ) {
                          continue;
                        }
                        //filtro para evitar redundancia en el primer estado
                        if (automata1[1] == 0 && automata1[2] == 0) {
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
    // if (numEstados == 4) {
    //   for (let i = 0; i < 2; i++) {
    //     for (let j = 0; j < 4; j++) {
    //       for (let k = 0; k < 4; k++) {
    //         for (let l = 0; l < 2; l++) {
    //           for (let m = 0; m < 4; m++) {
    //             for (let n = 0; n < 4; n++) {
    //               for (let o = 0; o < 2; o++) {
    //                 for (let p = 0; p < 4; p++) {
    //                   for (let q = 0; q < 4; q++) {
    //                     for (let r = 0; r < 2; r++) {
    //                       for (let s = 0; s < 4; s++) {
    //                         for (let t = 0; t < 4; t++) {
    //                           let automata1 = [i, j, k];
    //                           let automata2 = [l, m, n];
    //                           let automata3 = [o, p, q];
    //                           let automata4 = [r, s, t];

    //                           // Filtro para evitar autómatas con el mismo valor en el primer dígito de cada estado
    //                           if (
    //                             automata1[0] === automata2[0] &&
    //                             automata2[0] === automata3[0] &&
    //                             automata3[0] === automata4[0]
    //                           ) {
    //                             continue;
    //                           }
    //                           //filtro para evitar redundancia en el primer estado
    //                           if (automata1[1] == 0 && automata1[2] == 0) {
    //                             continue;
    //                           }

    //                           automatas.push([
    //                             i,
    //                             j,
    //                             k,
    //                             l,
    //                             m,
    //                             n,
    //                             o,
    //                             p,
    //                             q,
    //                             r,
    //                             s,
    //                             t,
    //                           ]);
    //                         }
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // if (numEstados == 5) {
    // }

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

        // estado1 = automata1[estado1].T[simbolo];
        // estado2 = automata2[estado2].T[simbolo];
      }
      if (automata1[estado1 * 3] != automata2[estado2 * 3]) {
        // console.log("NO equivalentes")
        return false;
      }
    }
    // console.log("A1 " + automata1)
    // console.log("A2 " + automata2)
    // console.log("equivalentes")
    return true;
  }

  var contador = 0;
  function generarAutomatasNoEquivalentesBase(numEstados) {
    // Generar todos los autómatas
    var automatas = generarAutomatas(numEstados);

    // Crear los autómatas base
    var baseAutomatas = generarBaseAutomatas(numEstados);

    // Si estamos generando autómatas de 3 estados, filtrar aquellos que no pueden llegar al estado 2 o al estado 1
    // 773  956
    // if (numEstados === 3) {
    //   automatas = automatas.filter(
    //     (automata) => puedeLlegarA(automata, 2) && puedeLlegarA(automata, 1)
    //   );
    // }

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
      if (baseAutomatas.length >= 100 && baseAutomatas.length <= 1000) {
        if (contador >= 100) {
          console.log(baseAutomatas.length);
          self.postMessage(baseAutomatas);
          contador = 0;
        }
      }
      return true;
    });
    console.log("THE END");
    return baseAutomatas;
  }

  // Función para comprobar si se puede llegar a un estado específico en un autómata
  function puedeLlegarA(automata, estadoObjetivo) {
    var estadosAlcanzables = [0]; // Comenzamos en el estado E0

    for (var i = 0; i < estadosAlcanzables.length; i++) {
      var estadoActual = estadosAlcanzables[i];

      // Calculamos los índices de las transiciones en el arreglo del autómata
      var indiceTransicion0 = estadoActual * 3;
      var indiceTransicion1 = estadoActual * 3 + 1;

      // Obtenemos los estados siguientes
      var estadoSiguiente0 = automata[indiceTransicion0];
      var estadoSiguiente1 = automata[indiceTransicion1];

      // Verificamos si alguno de los estados siguientes es el estado objetivo
      if (
        estadoSiguiente0 == estadoObjetivo ||
        estadoSiguiente1 == estadoObjetivo
      ) {
        return true; // Si podemos llegar al estado objetivo, devolvemos true
      }

      // Si no hemos visitado estos estados antes, los añadimos a la lista
      if (!estadosAlcanzables.includes(estadoSiguiente0)) {
        estadosAlcanzables.push(estadoSiguiente0);
      }
      if (!estadosAlcanzables.includes(estadoSiguiente1)) {
        estadosAlcanzables.push(estadoSiguiente1);
      }
    }

    return false; // Si hemos comprobado todos los estados alcanzables y no hemos encontrado el estado objetivo, devolvemos false
  }

  function generarBaseAutomatas(numEstados) {
    let AgregarEstado = [0, 0, 0];
    switch (numEstados) {
      case 2:
        return [
          [0, 0, 0, 0, 0, 0],
          [1, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 0, 0],
          [1, 1, 1, 0, 0, 0],
        ];
      case 3:
        let Base2Estados = generarAutomatasNoEquivalentesBase(2);
        Base2Estados = Base2Estados.map((elemento) =>
          elemento.concat(AgregarEstado)
        );
        return Base2Estados;
      case 4:
        let Base3Estados = generarAutomatasNoEquivalentesBase(3);
        Base3Estados = Base3Estados.map((elemento) =>
          elemento.concat(AgregarEstado)
        );
        console.log(Base3Estados);
        return Base3Estados;
    }
  }

  // Luego puedes llamar a la función principal
  var result = generarAutomatasNoEquivalentesBase(data.numEstados, data);

  // Y usas postMessage para enviar los resultados al hilo principal
  postMessage(result);
};
