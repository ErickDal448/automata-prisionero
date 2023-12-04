// En tu archivo worker.js
onmessage = function (e) {
  data = e.data;
  SendData();
  function SendData() {
    Resultado = combatirAutomatas(data.A1, data.A2);
  }

  var puntos1;
  var puntos2;
  var camino1;
  var camino2;

  function combatirAutomatas(automata1, automata2) {
    puntos1 = 0;
    puntos2 = 0;
    var estadoActual1 = 0;
    var estadoActual2 = 0;
    var historialEstados1 = [];
    var historialEstados2 = [];
    var enCiclo = false;

     camino1 = "A1 <br> E" + estadoActual1;
     camino2 = "A2 <br> E" + estadoActual2;
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
      // Actualizar el camino
      if (simbolo2 == 1) {
        camino1 +=
          "<img class='imgRute' src='./assets/img/1.png'>" +
          " E" +
          automata1[estadoActual1 * 3 + simbolo2 + 1];
      } else {
        camino1 +=
          "<img class='imgRute' src='./assets/img/0.png'>" +
          " E" +
          automata1[estadoActual1 * 3 + simbolo2 + 1];
      }

      if (simbolo1 == 1) {
        camino2 +=
          "<img class='imgRute' src='./assets/img/1.png'>" +
          " E" +
          automata2[estadoActual2 * 3 + simbolo1 + 1];
      } else {
        camino2 +=
          "<img class='imgRute' src='./assets/img/0.png'>" +
          " E" +
          automata2[estadoActual2 * 3 + simbolo1 + 1];
      }
      console.log("Estado 1 = " + estadoActual1 + " Puntos A1 = " + puntos1);
      console.log("Estado 2 = " + estadoActual2 + " Puntos A2 = " + puntos2);

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

    // if (puntos1 < puntos2) {
    //   return "El autómata 1 gana con " + puntos1 + " puntos.";
    // } else if (puntos2 < puntos1) {
    //   return "El autómata 2 gana con " + puntos2 + " puntos.";
    // } else {
    //   return "Es un empate con " + puntos1 + " puntos.";
    // }
  }

  this.self.postMessage([puntos1, puntos2, camino1, camino2]);
};
