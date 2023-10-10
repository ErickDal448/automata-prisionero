(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".form3E");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          GenerarRespuesta3E();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Agregar un eventListener al botón de submit
function GenerarRespuesta3E() {
  // Prevenir el comportamiento por defecto del botón de submit
  event.preventDefault();

  // Obtener los valores de los inputs
  var R0 = document.getElementById("0R0-3E").value;
  var T00 = document.getElementById("0T0-3E").value;
  var T01 = document.getElementById("0T1-3E").value;
  var R1 = document.getElementById("1R1-3E").value;
  var T10 = document.getElementById("1T0-3E").value;
  var T11 = document.getElementById("1T1-3E").value;
  var R2 = document.getElementById("2R2-3E").value;
  var T20 = document.getElementById("2T0-3E").value;
  var T21 = document.getElementById("2T1-3E").value;

  console.log(R2);

  // Crear el autómata finito perfecto de dos estados
  var automata = {
    E0: {
      R: R0,
      T: {
        0: T00,
        1: T01,
      },
    },
    E1: {
      R: R1,
      T: {
        0: T10,
        1: T11,
      },
    },
    E2: {
      R: R2,
      T: {
        0: T20,
        1: T21,
      },
    },
  };
  // Mostrar el autómata en la tabla
  document.getElementById("E0R-3E").innerHTML = automata.E0.R;
  document.getElementById("E0T0-3E").innerHTML = automata.E0.T["0"];
  document.getElementById("E0T1-3E").innerHTML = automata.E0.T["1"];
  document.getElementById("E1R-3E").innerHTML = automata.E1.R;
  document.getElementById("E1T0-3E").innerHTML = automata.E1.T["0"];
  document.getElementById("E1T1-3E").innerHTML = automata.E1.T["1"];
  document.getElementById("E2R-3E").innerHTML = automata.E2.R;
  document.getElementById("E2T0-3E").innerHTML = automata.E2.T["0"];
  document.getElementById("E2T1-3E").innerHTML = automata.E2.T["1"];
  // Obtener la cadena del div
  var cadena = document.querySelector(".inputValueCadena-3E").value;

  // Ejecutar las transiciones según la cadena
  var estadoActual = "E0";

  // Agregar una variable para almacenar el camino
  var camino = estadoActual;

  // Recorrer cada carácter de la cadena
  for (var i = 0; i < cadena.length; i++) {
    var simbolo = cadena[i];
    // Concatenar una "E" antes del número del estado
    var estadoSiguiente = "E" + automata[estadoActual].T[simbolo];

    // Actualizar el camino
    if (simbolo == 1) {
      camino +=
        "<img class='imgRute' src='./assets/img/1.png'>" + estadoSiguiente;
    } else {
      camino +=
        "<img class='imgRute' src='./assets/img/0.png'>" + estadoSiguiente;
    }

    // Actualizar el estado actual
    estadoActual = estadoSiguiente;
  }

  // Mostrar el valor del estado final en el div
  var mensajeFinal;
  if (automata[estadoActual].R == 1) {
    mensajeFinal = "1 - No Traiciona";
  } else {
    mensajeFinal = "0 - Traiciona";
  }
  document.getElementById("estadoFinal-3E").innerHTML = mensajeFinal;

  // Mostrar el camino en la consola
  document.getElementById("transiciones-3E").innerHTML = camino;
  console.log(camino);
}

// Ingreso de datos
// Obtener todos los inputs
var inputs = document.querySelectorAll(".inputValue-3E");

// Agregar un eventListener para el evento input en cada input
inputs.forEach(function (input) {
  input.addEventListener("input", function (event) {
    if (input.classList.contains("StatusValue")) {
      // Verificar si el valor del input es válido
      if (input.value !== "0" && input.value !== "1") {
        // Si el valor no es válido, restablecerlo a un valor válido
        input.value = "";
      } else {
        // Si el valor es válido, mover el focus al siguiente input
        var nextInput = input.parentElement.nextElementSibling;
        if (nextInput) {
          nextInput.querySelector("input").focus();
        } else {
          // Si no hay un siguiente input en el mismo div, mover el focus al primer input del siguiente div
          var nextDiv = input.closest(".card").nextElementSibling;
          if (nextDiv) {
            nextDiv.querySelector("input").focus();
          }
        }
      }
    }
    else{
      // Verificar si el valor del input es válido
    if (input.value !== "0" && input.value !== "1" && input.value !== "2") {
      // Si el valor no es válido, restablecerlo a un valor válido
      input.value = "";
    } else {
      // Si el valor es válido, mover el focus al siguiente input
      var nextInput = input.parentElement.nextElementSibling;
      if (nextInput) {
        nextInput.querySelector("input").focus();
      } else {
        // Si no hay un siguiente input en el mismo div, mover el focus al primer input del siguiente div
        var nextDiv = input.closest(".card").nextElementSibling;
        if (nextDiv) {
          nextDiv.querySelector("input").focus();
        }
      }
    }
    }
  });
});

// Agregar un eventListener para el evento keydown en cada input
inputs.forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    // Verificar si se presionó la tecla Backspace
    if (event.key === "Backspace" && input.value === "") {
      // Si se presionó la tecla Backspace y el input está vacío, mover el focus al input anterior
      var previousInput = input.parentElement.previousElementSibling;
      if (previousInput) {
        previousInput.querySelector("input").focus();
      } else {
        // Si no hay un input anterior en el mismo div, mover el focus al último input del div anterior
        var previousDiv = input.closest(".card").previousElementSibling;
        if (previousDiv) {
          var previousInputs = previousDiv.querySelectorAll("input");
          previousInputs[previousInputs.length - 1].focus();
        }
      }
    }
  });
});