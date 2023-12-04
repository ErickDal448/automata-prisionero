// Ingreso de datos
// Obtener todos los inputs
var inputs = document.querySelectorAll(".inputValuevs");

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
          console.log(nextDiv);
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
              while (
                nextDiv &&
                window.getComputedStyle(nextDiv).display === "none"
              ) {
                nextDiv = nextDiv.nextElementSibling;
              }
              if (!nextDiv && input.id !== "A21T1") {
                nextDiv = document.querySelector(".A2 .card");
              }
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
              while (
                nextDiv &&
                window.getComputedStyle(nextDiv).display === "none"
              ) {
                nextDiv = nextDiv.nextElementSibling;
              }
              if (!nextDiv && input.id !== "A22T1") {
                nextDiv = document.querySelector(".A2 .card");
              }
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
              while (
                nextDiv &&
                window.getComputedStyle(nextDiv).display === "none"
              ) {
                nextDiv = nextDiv.nextElementSibling;
              }
              if (!nextDiv && input.id !== "A23T1") {
                nextDiv = document.querySelector(".A2 .card");
              }
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
              while (
                nextDiv &&
                window.getComputedStyle(nextDiv).display === "none"
              ) {
                nextDiv = nextDiv.nextElementSibling;
              }
              if (!nextDiv && input.id !== "A24T1") {
                nextDiv = document.querySelector(".A2 .card");
              }
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

//Funcion de paste para los inputs
inputs.forEach(function (input, index) {
  input.addEventListener("paste", function (event) {
    // Obtén el texto del portapapeles
    var paste = (event.clipboardData || window.clipboardData).getData("text");

    // Elimina los espacios del texto
    paste = paste.replace(/\s/g, "");

    // Si el texto es más largo que el número de inputs restantes, corta el texto
    if (paste.length > inputs.length - index) {
      paste = paste.substring(0, inputs.length - index);
    }

    // Pega cada carácter del texto en un input diferente, comenzando desde el input actual
    for (var i = 0; i < paste.length; i++) {
      inputs[index + i].value = paste.charAt(i);
    }

    // Previene el comportamiento por defecto de pegar el texto en el input
    event.preventDefault();
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

    //Borrar todos los inputs
    // Verifica si la tecla presionada fue Z y si la tecla Alt estaba presionada
    if (event.key === "z" && event.altKey) {
      // Recorre todos los inputs y borra su contenido
      inputs.forEach(function (input) {
        input.value = "";
      });
    }
  });
});


// Obtén todos los inputs y conviértelos a un Array
var inputs = Array.from(document.querySelectorAll('.inputValuevs'));

// Añade un event listener al objeto window para el evento keydown
window.addEventListener('keydown', function (event) {
  // Encuentra el input que tiene el foco actualmente
  var currentInput = document.activeElement;
  var currentIndex = inputs.indexOf(currentInput);
  
  // Verifica si la tecla presionada fue una de las flechas del teclado
  if (event.key === 'ArrowLeft') {
    // Si se presionó la flecha hacia arriba o hacia la izquierda, mueve el foco al input anterior
    if (currentIndex > 0) {
      inputs[currentIndex - 1].focus();
    }
  } else if (event.key === 'ArrowRight') {
    // Si se presionó la flecha hacia abajo o hacia la derecha, mueve el foco al input siguiente
    if (currentIndex < inputs.length - 1) {
      inputs[currentIndex + 1].focus();
    }
  }
});