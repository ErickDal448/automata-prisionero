// Creas el Web Worker
const myWorker = new Worker("assets/js/Combate/WorkerVs.js");

// funcion para determinar el submit del form y saber si los datos estan completos.
const form = document.querySelector(".formEstados");

form.addEventListener(
  "submit",
  (event) => {
    let isValid = true;
    for (let i = 0; i < form.elements.length; i++) {
      let field = form.elements[i];
      Parentfield = field.parentNode.parentNode.parentNode.parentNode;
      // Si el elemento padre del campo está oculto, lo saltamos
      if (
        Parentfield.style.display == "none" ||
        Parentfield.style.visibility === "hidden"
      ) {
        continue;
      }
      // Si el campo no es válido, establecemos isValid a false
      if (!field.checkValidity()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      GenerarCombate();
    }

    form.classList.add("was-validated");
  },
  false
);

function GenerarCombate() {
  // Prevenir el comportamiento por defecto del botón de submit
  event.preventDefault();

  // Obtener los valores de los inputs
  if (NumeroEstados >= 2) {
    //A1
    // 1 estados
    var A1R0 = document.getElementById("A10R0").value;
    var A1T00 = document.getElementById("A10T0").value;
    var A1T01 = document.getElementById("A10T1").value;
    // 2 estados
    var A1R1 = document.getElementById("A11R1").value;
    var A1T10 = document.getElementById("A11T0").value;
    var A1T11 = document.getElementById("A11T1").value;

    //A2
    // 1 estados
    var A2R0 = document.getElementById("A20R0").value;
    var A2T00 = document.getElementById("A20T0").value;
    var A2T01 = document.getElementById("A20T1").value;
    // 2 estados
    var A2R1 = document.getElementById("A21R1").value;
    var A2T10 = document.getElementById("A21T0").value;
    var A2T11 = document.getElementById("A21T1").value;
  }
  if (NumeroEstados >= 3) {
    //A1
    // 3 estados
    var A1R2 = document.getElementById("A12R2").value;
    var A1T20 = document.getElementById("A12T0").value;
    var A1T21 = document.getElementById("A12T1").value;

    //A2
    // 3 estados
    var A2R2 = document.getElementById("A22R2").value;
    var A2T20 = document.getElementById("A22T0").value;
    var A2T21 = document.getElementById("A22T1").value;
  }
  if (NumeroEstados >= 4) {
    //A1
    // 4 estados
    var A1R3 = document.getElementById("A13R3").value;
    var A1T30 = document.getElementById("A13T0").value;
    var A1T31 = document.getElementById("A13T1").value;

    //A2
    // 4 estados
    var A2R3 = document.getElementById("A23R3").value;
    var A2T30 = document.getElementById("A23T0").value;
    var A2T31 = document.getElementById("A23T1").value;
  }
  if (NumeroEstados >= 5) {
    //A1
    // 5 estados
    var A1R4 = document.getElementById("A14R4").value;
    var A1T40 = document.getElementById("A14T0").value;
    var A1T41 = document.getElementById("A14T1").value;

    //A2
    // 5 estados
    var A2R4 = document.getElementById("A24R4").value;
    var A2T40 = document.getElementById("A24T0").value;
    var A2T41 = document.getElementById("A24T1").value;
  }

  // Crear los autómata finito perfecto
  var automata1 = [
    A1R0,
    A1T00,
    A1T01,
    A1R1,
    A1T10,
    A1T11,
    A1R2,
    A1T20,
    A1T21,
    A1R3,
    A1T30,
    A1T31,
    A1R4,
    A1T40,
    A1T41,
  ];
  var automata2 = [
    A2R0,
    A2T00,
    A2T01,
    A2R1,
    A2T10,
    A2T11,
    A2R2,
    A2T20,
    A2T21,
    A2R3,
    A2T30,
    A2T31,
    A2R4,
    A2T40,
    A2T41,
  ];

  console.log("A1: " + automata1);
  console.log("A2: " + automata2);

  // Pasas los datos al worker
  myWorker.postMessage({
    A1: automata1,
    A2: automata2,
    numEstados: NumeroEstados,
  });
}

// Manejas la respuesta del worker
myWorker.onmessage = function (e) {
  let Resultado1;
  let Resultado2;
  let Puntos1 = e.data[0];
  let Puntos2 = e.data[1];

  console.log(Puntos1, Puntos2);

  if (Puntos1 == Puntos2) {
    Resultado1 = "Empate";
    Resultado2 = "Empate";
  } else {
    if (Puntos1 < Puntos2) {
      Resultado1 = "Ganador";
      Resultado2 = "Perdedor";
    } else {
      Resultado1 = "Perdedor";
      Resultado2 = "Ganador";
    }
  }

  const TableResults = document.querySelector(".DivTableResult");

  TableResults.innerHTML =
    "<table class='tablaValores tablaAutomata' id='automata'>" +
    "<tr>" +
    "<th>A1  A2</th>" +
    "<th>A2 0</th>" +
    "<th>A2 1</th>" +
    "</tr>" +
    "<tr>" +
    "<td><strong>A1 <strong>0</strong></strong></td>" +
    "<td>A1 <strong>5</strong>  A2 <strong>5</strong></td>" +
    "<td>A1  <strong>0</strong>  A2 <strong>8</strong></td>" +
    "</tr>" +
    "<tr>" +
    "<td><strong>A1 <strong>1</strong></strong></td>" +
    "<td>A1 <strong>8</strong>  A2 <strong>0</strong></td>" +
    "<td>A1 <strong>1</strong>  A2 <strong>1</strong></td>" +
    "</tr>" +
    "</table>" +
    "<br>" +
    "<table class='tablaValores tablaAutomata tablaPuntos' id='automatasPuntos'>" +
    "<tr>" +
    "<th>Automatas</th>" +
    "<th>Puntos</th>" +
    "<th>Resultado</th>" +
    "</tr>" +
    "<tr>" +
    "<td><strong>Automata 1</strong></td>" +
    "<td id='Puntos1'><strong>" +
    Puntos1 +
    "</strong></td>" +
    "<td id='Resultado1'><strong>" +
    Resultado1 +
    "</strong></td>" +
    "</tr>" +
    "<tr>" +
    "<td><strong>Automata 2</strong></td>" +
    "<td id='Puntos2'><strong>" +
    Puntos2 +
    "</strong></td>" +
    "<td id='Resultado2'><strong>" +
    Resultado2 +
    "</strong></td>" +
    "</tr>" +
    " </table>'";

  document.getElementById("transiciones").innerHTML = e.data[2] + "<br><br>" + e.data[3];
};
