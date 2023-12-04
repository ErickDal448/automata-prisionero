// Ingreso de datos
// Obtener todos los inputs
var inputs = document.querySelectorAll(".inputValue");

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
    } else {
      switch (NumeroEstados) {
        case 2:
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
          break;
        case 3:
          // Verificar si el valor del input es válido
          if (
            input.value !== "0" &&
            input.value !== "1" &&
            input.value !== "2"
          ) {
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
          break;
        case 4:
          // Verificar si el valor del input es válido
          if (
            input.value !== "0" &&
            input.value !== "1" &&
            input.value !== "2" &&
            input.value !== "3"
          ) {
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
          break;
        case 5:
          // Verificar si el valor del input es válido
          if (
            input.value !== "0" &&
            input.value !== "1" &&
            input.value !== "2" &&
            input.value !== "3" &&
            input.value !== "4"
          ) {
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
          break;
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
