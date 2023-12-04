onmessage = function (e) {
  const Automatas = e.data.Automatas;
  GetTheBest(Automatas);

  function GetTheBest(Automatas) {
    var MinimaPuntos = Infinity;
    var TheBests = [];
    for (var i = 0; i < Automatas.length; i++) {
      var puntosTotales = 0;
      for (var j = 0; j < Automatas.length; j++) {
        if (i == j) {
          continue;
        } else {
          let resultado = combatirAutomatas(Automatas[i], Automatas[j]);
          puntosTotales += resultado[0];
        }
      }
      // Almacena la puntuación total en el autómata
      Automatas[i].puntosTotales = puntosTotales;
      if (puntosTotales < MinimaPuntos) {
        MinimaPuntos = puntosTotales;
        TheBests = [{ automata: Automatas[i], puntosTotales: puntosTotales }];
      } else if (puntosTotales == MinimaPuntos) {
        TheBests.push({ automata: Automatas[i], puntosTotales: puntosTotales });
      }
    }
    postMessage({ Automatas: Automatas, TheBests: TheBests });
  }

  function combatirAutomatas(automata1, automata2) {
    var puntos1 = 0;
    var puntos2 = 0;
    var estadoActual1 = 0;
    var estadoActual2 = 0;
    var historialEstados1 = [];
    var historialEstados2 = [];
    var enCiclo = false;

    while (true) {
      var simbolo1 = Number(automata1[estadoActual1 * 3]);
      var simbolo2 = Number(automata2[estadoActual2 * 3]);

      if (enCiclo) {
        if (simbolo1 == simbolo2) {
          if (simbolo1 == 0) {
            puntos1 += 5;
            puntos2 += 5;
          } else {
            puntos1 += 1;
            puntos2 += 1;
          }
        } else {
          if (simbolo1 == 1) {
            puntos1 += 8;
          } else {
            puntos2 += 8;
          }
        }
      }

      //   console.log("Estado 1 = " + estadoActual1 + " Puntos A1 = " + puntos1);
      //   console.log("Estado 2 = " + estadoActual2 + " Puntos A2 = " + puntos2);

      estadoActual1 = automata1[estadoActual1 * 3 + simbolo2 + 1];
      estadoActual2 = automata2[estadoActual2 * 3 + simbolo1 + 1];

      if (
        historialEstados1.includes(estadoActual1) &&
        historialEstados2.includes(estadoActual2)
      ) {
        if (enCiclo) {
          break;
        } else {
          enCiclo = true;
          historialEstados1 = [];
          historialEstados2 = [];
        }
      }

      historialEstados1.push(estadoActual1);
      historialEstados2.push(estadoActual2);
    }
    // console.log(puntos1, puntos2)
    return [puntos1, puntos2];
  }
};
