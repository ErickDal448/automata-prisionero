// En tu archivo worker.js
onmessage = function (e) {
  console.log("Message received from main script", e.data);
  var data = e.data; // Aquí están tus datos: data.Card3E, data.CardCharge, data.Sel2E y data.Sel3E

  // Aquí puedes definir todas tus funciones que usan los datos
  // Función para generar todas las combinaciones posibles de longitud n
  function generarCombinaciones(n) {
    var combinaciones = [];
    if (n === 2) {
      for (var index = 0; index <= 4; index++) {
        for (var i = 0; i < Math.pow(2, index); i++) {
          var binario = i.toString(2);
          while (binario.length < index) {
            binario = "0" + binario;
          }
          combinaciones.push(binario);
        }
      }
    } else if (n === 3) {
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
    if (numEstados == 2) {
      let automatas = [];
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          let automata1 = i.toString(2).padStart(3, "0");
          let automata2 = j.toString(2).padStart(3, "0");
          automatas.push([
            // Estado E0
            {
              R: automata1[0],
              T: [automata1[1], automata1[2]], // Transiciones para los símbolos 0 y 1
            },
            // Estado E1
            {
              R: automata2[0],
              T: [automata2[1], automata2[2]], // Transiciones para los símbolos 0 y 1
            },
          ]);
        }
      }
      return automatas;
    }
    if (numEstados == 3) {
      let automatas = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 2; l++) {
              for (let m = 0; m < 3; m++) {
                for (let n = 0; n < 3; n++) {
                  for (let o = 0; o < 2; o++) {
                    for (let p = 0; p < 3; p++) {
                      for (let q = 0; q < 3; q++) {
                        let automata1 =
                          i.toString() + j.toString() + k.toString();
                        let automata2 =
                          l.toString() + m.toString() + n.toString();
                        let automata3 =
                          o.toString() + p.toString() + q.toString();
                        automatas.push([
                          // Estado E0
                          {
                            R: automata1[0],
                            T: [automata1[1], automata1[2]], // Transiciones para los símbolos 0 y 1
                          },
                          // Estado E1
                          {
                            R: automata2[0],
                            T: [automata2[1], automata2[2]], // Transiciones para los símbolos 0 y 1
                          },
                          // Estado E2
                          {
                            R: automata3[0],
                            T: [automata3[1], automata3[2]], // Transiciones para los símbolos 0 y 1
                          },
                        ]);
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
  }

  function siempreMismoValor(automata) {
    return (
      automata.every((estado) => estado.R === "0") ||
      automata.every((estado) => estado.R === "1") ||
      automata.every((estado) => estado.T[0] === estado.T[1])
    );
  }

  function sonEquivalentes(automata1, automata2, cadenas) {
    for (var i = 0; i < cadenas.length; i++) {
      var cadena = cadenas[i];
      var estado1 = 0;
      var estado2 = 0;

      for (var j = 0; j < cadena.length; j++) {
        var simbolo = cadena[j];
        estado1 = automata1[estado1].T[simbolo];
        estado2 = automata2[estado2].T[simbolo];
      }

      if (
        automata1[estado1] &&
        automata2[estado2] &&
        automata1[estado1].R != automata2[estado2].R
      ) {
        return false;
      }
    }
    return true;
  }

  function generarAutomatasNoEquivalentesBase(numEstados) {
    // Generar todos los autómatas
    var automatas = generarAutomatas(numEstados);
    
    // Crear los autómatas base
    var baseAutomatas = generarBaseAutomatas(numEstados);

    // Filtrar los autómatas que siempre tienen el mismo valor
    automatas = automatas.filter((automata) => !siempreMismoValor(automata));

    // Si estamos generando autómatas de 3 estados, filtrar aquellos que no pueden llegar al estado 2 o al estado 1
    if (numEstados === 3) {
      automatas = automatas.filter(
        (automata) => puedeLlegarA(automata, 2) && puedeLlegarA(automata, 1)
      );
    }

    // Filtrar los autómatas que son equivalentes a los autómatas base
    var noEquivalentes = automatas.filter((automata) => {
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
      return true;
    });

    return baseAutomatas;
  }

  // Función para comprobar si se puede llegar a un estado específico en un autómata
  function puedeLlegarA(automata, estadoObjetivo) {
    var estadosAlcanzables = [0]; // Comenzamos en el estado E0

    for (var i = 0; i < estadosAlcanzables.length; i++) {
      var estadoActual = estadosAlcanzables[i];
      var transiciones = automata[estadoActual].T;

      for (var j = 0; j < transiciones.length; j++) {
        var estadoSiguiente = transiciones[j];

        if (estadoSiguiente == estadoObjetivo) {
          return true; // Si podemos llegar al estado objetivo, devolvemos true
        }

        if (!estadosAlcanzables.includes(estadoSiguiente)) {
          estadosAlcanzables.push(estadoSiguiente); // Si no hemos visitado este estado antes, lo añadimos a la lista
        }
      }
    }

    return false; // Si hemos comprobado todos los estados alcanzables y no hemos encontrado el estado objetivo, devolvemos false
  }

  function generarBaseAutomatas(numEstados) {
    if (numEstados === 2) {
      return [
        [
          // Estado E0
          {
            R: "0",
            T: [0, 0], // Transiciones para los símbolos 0 y 1
          },
          // Estado E1
          {
            R: "0",
            T: [0, 0], // Transiciones para los símbolos 0 y 1
          },
        ],
        [
          // Estado E0
          {
            R: "1",
            T: [1, 1], // Transiciones para los símbolos 0 y 1
          },
          // Estado E1
          {
            R: "1",
            T: [1, 1], // Transiciones para los símbolos 0 y 1
          },
        ],
      ];
    } else if (numEstados === 3) {
      return [
        [
          // Estado E0
          {
            R: "0",
            T: [0, 0], // Transiciones para los símbolos 0 y 1
          },
          // Estado E1
          {
            R: "0",
            T: [0, 0], // Transiciones para los símbolos 0 y 1
          },
          // Estado E2
          {
            R: "0",
            T: [0, 0], // Transiciones para los símbolos 0 y 1
          },
        ],
        [
          // Estado E0
          {
            R: "1",
            T: [1, 1], // Transiciones para los símbolos 0 y 1
          },
          // Estado E1
          {
            R: "1",
            T: [1, 1], // Transiciones para los símbolos 0 y 1
          },
          // Estado E2
          {
            R: "1",
            T: [1, 1], // Transiciones para los símbolos 0 y 1
          },
        ],
        [
          { R: "0", T: [0, 1] },
          { R: "1", T: [0, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [0, 1] },
          { R: "1", T: [0, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [0, 1] },
          { R: "1", T: [1, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [0, 1] },
          { R: "1", T: [1, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [1, 0] },
          { R: "1", T: [0, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [1, 0] },
          { R: "1", T: [0, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [1, 0] },
          { R: "1", T: [1, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [1, 0] },
          { R: "1", T: [1, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [1, 1] },
          { R: "1", T: [0, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "0", T: [1, 1] },
          { R: "1", T: [1, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [0, 1] },
          { R: "0", T: [0, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [0, 1] },
          { R: "0", T: [1, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [0, 1] },
          { R: "0", T: [1, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [1, 0] },
          { R: "0", T: [0, 0] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [1, 0] },
          { R: "0", T: [0, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [1, 0] },
          { R: "0", T: [1, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [1, 1] },
          { R: "0", T: [0, 1] },
          { R: "0", T: [0, 0] },
        ],
        [
          { R: "1", T: [1, 1] },
          { R: "0", T: [1, 0] },
          { R: "0", T: [0, 0] },
        ],
      ];
    }
  }

  // Luego puedes llamar a la función principal
  var result = generarAutomatasNoEquivalentesBase(data.numEstados, data);

  // Y usas postMessage para enviar los resultados al hilo principal
  postMessage(result);
};
