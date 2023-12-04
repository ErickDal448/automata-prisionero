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
      if (Parentfield.style.display == "none" || Parentfield.style.visibility === "hidden") {
        console.log("si entro")
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
      GenerarRespuesta();
    }

    form.classList.add("was-validated");
  },
  false
);


function GenerarRespuesta() {
  // Prevenir el comportamiento por defecto del botón de submit
  event.preventDefault();

  // Obtener los valores de los inputs
  // 1 estados
  var R0 = document.getElementById("0R0").value;
  var T00 = document.getElementById("0T0").value;
  var T01 = document.getElementById("0T1").value;
  // 2 estados
  var R1 = document.getElementById("1R1").value;
  var T10 = document.getElementById("1T0").value;
  var T11 = document.getElementById("1T1").value;
  // 3 estados
  var R2 = document.getElementById("2R2").value;
  var T20 = document.getElementById("2T0").value;
  var T21 = document.getElementById("2T1").value;
  // 4 estados
  var R3 = document.getElementById("3R3").value;
  var T30 = document.getElementById("3T0").value;
  var T31 = document.getElementById("3T1").value;
  // 5 estados
  var R4 = document.getElementById("4R4").value;
  var T40 = document.getElementById("4T0").value;
  var T41 = document.getElementById("4T1").value;

  // // Crear el autómata finito perfecto
  var automata = [
    R0,
    T00,
    T01,
    R1,
    T10,
    T11,
    R2,
    T20,
    T21,
    R3,
    T30,
    T31,
    R4,
    T40,
    T41,
  ];

  // Mostrar el autómata en la tabla
  document.getElementById("E0R").innerHTML = R0;
  document.getElementById("E0T0").innerHTML = T00;
  document.getElementById("E0T1").innerHTML = T01;

  document.getElementById("E1R").innerHTML = R1;
  document.getElementById("E1T0").innerHTML = T10;
  document.getElementById("E1T1").innerHTML = T11;

  document.getElementById("E2R").innerHTML = R2;
  document.getElementById("E2T0").innerHTML = T20;
  document.getElementById("E2T1").innerHTML = T21;

  document.getElementById("E3R").innerHTML = R3;
  document.getElementById("E3T0").innerHTML = T30;
  document.getElementById("E3T1").innerHTML = T31;

  document.getElementById("E4R").innerHTML = R4;
  document.getElementById("E4T0").innerHTML = T40;
  document.getElementById("E4T1").innerHTML = T41;
  // Obtener la cadena del div
  var cadena = document.querySelector(".inputValueCadena").value;

  // Ejecutar las transiciones según la cadena
  var estadoActual = 0;

  // Agregar una variable para almacenar el camino
  var camino = "E" + estadoActual;

  // Recorrer cada carácter de la cadena
  for (var i = 0; i < cadena.length; i++) {
    var simbolo = cadena[i];
    let sumar = 0;
    if (simbolo == 1) {
      sumar = 1;
    } else {
      sumar = 0;
    }
    // Concatenar una "E" antes del número del estad
    var estadoSiguiente = automata[estadoActual * 3 + sumar + 1 ];

    // Actualizar el camino
    if (simbolo == 1) {
      camino +=
        "<img class='imgRute' src='./assets/img/1.png'>" +
        " E" +
        estadoSiguiente;
    } else {
      camino +=
        "<img class='imgRute' src='./assets/img/0.png'>" +
        " E" +
        estadoSiguiente;
    }

    // Actualizar el estado actual
    estadoActual = estadoSiguiente;
  }

  // Mostrar el valor del estado final en el div
  var mensajeFinal;
  if (automata[estadoActual] == 1) {
    mensajeFinal = "1 - No Traiciona";
  } else {
    mensajeFinal = "0 - Traiciona";
  }
  document.getElementById("estadoFinal").innerHTML = mensajeFinal;

  // Mostrar el camino en la pagina
  document.getElementById("transiciones").innerHTML = camino;
}
