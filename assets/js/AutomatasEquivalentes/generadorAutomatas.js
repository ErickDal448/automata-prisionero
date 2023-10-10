// Creas el Web Worker
const myWorker = new Worker("assets/js/AutomatasEquivalentes/worker.js");

// const Card2E = document.querySelector(".Card2E")
const Card3E = document.querySelector(".Card3E");
const CardCharge = document.querySelector(".CardCharge");
const cardChoose = document.querySelector(".cardChoose");

// // Card2E.style.display = "none"
Card3E.style.display = "none";
CardCharge.style.display = "none";

const Sel2E = document.querySelector(".Rad2e");
const Sel3E = document.querySelector(".Rad3e");

// Pasas los datos al worker
myWorker.postMessage({
  Card3E: Card3E.style.display,
  CardCharge: CardCharge.style.display,
  Sel2E: Sel2E.checked,
  Sel3E: Sel3E.checked,
});

// Manejas la respuesta del worker
myWorker.onmessage = function (e) {
  console.log("Message received from worker", e.data);
  var numEstados;
  if (document.getElementById("Rad2e").checked) {
    numEstados = 2;
  } else if (document.getElementById("Rad3e").checked) {
    numEstados = 3;
  }
  // Aquí puedes actualizar tu tabla con los datos recibidos del worker
  var automatasNoEquivalentesBase = e.data;

  // Mostrar los autómatas en la tabla
  var table = document.querySelector("table");
  table.innerHTML = "";
  var thead = document.createElement("thead");
  thead.innerHTML =
    "<tr>" +
    '<th scope="col">#</th>' +
    '<th scope="col">E0</th>' +
    '<th scope="col">E1</th>' +
    (numEstados == 3 ? '<th scope="col">E2</th>' : "");
  ("</tr>");
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  for (let index = 0; index < automatasNoEquivalentesBase.length; index++) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<th scope="row">' +
      (index + 1) +
      "</th>" +
      "<td>" +
      automatasNoEquivalentesBase[index][0].R +
      " " +
      automatasNoEquivalentesBase[index][0].T.join(" ") +
      "</td>" +
      "<td>" +
      automatasNoEquivalentesBase[index][1].R +
      " " +
      automatasNoEquivalentesBase[index][1].T.join(" ") +
      "</td>" +
      (numEstados == 3
        ? "<td>" +
          automatasNoEquivalentesBase[index][2].R +
          " " +
          automatasNoEquivalentesBase[index][2].T.join(" ") +
          "</td>"
        : "");
    tbody.appendChild(tr);
  }

  // Terminamos de procesar, adjuntamos tbody y ocultamos el div de carga
  table.appendChild(tbody);
  CardCharge.style.display = "none";
  cardChoose.style.display = "flex";
  Card3E.style.display = "flex";
};

// Agregar un eventListener al botón de submit
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevenir la recarga de la página
  event.preventDefault();

  // Obtener el número de estados seleccionado
  var numEstados;
  if (document.getElementById("Rad2e").checked) {
    numEstados = 2;
  } else if (document.getElementById("Rad3e").checked) {
    numEstados = 3;
  }

  CardCharge.style.display = "flex";
  cardChoose.style.display = "none";
  Card3E.style.display = "none";

  // Pasas los datos al worker
  myWorker.postMessage({
    Card3E: Card3E.style.display,
    CardCharge: CardCharge.style.display,
    Sel2E: Sel2E.checked,
    Sel3E: Sel3E.checked,
    numEstados: numEstados,
  });
});
