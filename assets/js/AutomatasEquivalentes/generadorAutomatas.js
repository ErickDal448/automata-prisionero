// Web Worker
const myWorker = new Worker("assets/js/AutomatasEquivalentes/worker.js");
const BestWorker = new Worker(
  "assets/js/AutomatasEquivalentes/workerTheBest.js"
);

// const Card2E = document.querySelector(".Card2E")
const Card3E = document.querySelector(".Card3E");
const CardCharge = document.querySelector(".CardCharge");
const cardChoose = document.querySelector(".cardChoose");
const cardBest = document.querySelector(".cardBest");
const downloadCard = document.querySelector(".downloadCard");

// // Card2E.style.display = "none"
Card3E.style.display = "none";
CardCharge.style.display = "none";
cardBest.style.display = "none";

const Sel2E = document.querySelector(".Rad2e");
const Sel3E = document.querySelector(".Rad3e");
const Sel4E = document.querySelector(".Rad4e");
const Sel5E = document.querySelector(".Rad5e");

// Pasar los datos al worker
myWorker.postMessage({
  Card3E: Card3E.style.display,
  CardCharge: CardCharge.style.display,
  Sel2E: Sel2E.checked,
  Sel3E: Sel3E.checked,
});

var numEstados;
// Manejar la respuesta del worker
myWorker.onmessage = function (e) {
  console.log("Message received from worker", e.data);
  if (document.getElementById("Rad2e").checked) {
    numEstados = 2;
  }
  if (document.getElementById("Rad3e").checked) {
    numEstados = 3;
  }
  // actualizar tabla con los datos del worker
  var automatasNoEquivalentesBase = e.data;

  const tituloEquivalencia = document.querySelector(".tituloEquivalencia");

  tituloEquivalencia.innerHTML =
    "Tabla de Automatas no equivalentes de " + numEstados + " estados";

  // Mostrar los autómatas en la tabla
  var table = document.querySelector(".ListaAutomatas");
  table.innerHTML = "";
  var thead = document.createElement("thead");
  thead.innerHTML =
    "<tr>" +
    '<th scope="col">#</th>' +
    '<th scope="col">E0</th>' +
    '<th scope="col">E1</th>' +
    (numEstados == 3 ? '<th scope="col">E2</th>' : "") +
    "</tr>";
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  for (let index = 0; index < automatasNoEquivalentesBase.length; index++) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<th scope="row">' +
      (index + 1) +
      "</th>" +
      "<td>" +
      automatasNoEquivalentesBase[index][0] +
      " " +
      automatasNoEquivalentesBase[index][1] +
      " " +
      automatasNoEquivalentesBase[index][2] +
      "</td>" +
      "<td>" +
      automatasNoEquivalentesBase[index][3] +
      " " +
      automatasNoEquivalentesBase[index][4] +
      " " +
      automatasNoEquivalentesBase[index][5] +
      "</td>" +
      (numEstados == 3
        ? "<td>" +
          automatasNoEquivalentesBase[index][6] +
          " " +
          automatasNoEquivalentesBase[index][7] +
          " " +
          automatasNoEquivalentesBase[index][8] +
          "</td>"
        : "");
    tbody.appendChild(tr);
  }

  // Terminamos de procesar, adjuntamos tbody y ocultamos el div de carga
  table.appendChild(tbody);
  CardCharge.style.display = "none";
  Card3E.style.display = "flex";
  cardBest.style.display = "none";

  if (automatasNoEquivalentesBase.length >= 22 && numEstados == 2) {
    cardBest.style.display = "flex";
    cardChoose.style.display = "flex";
    // Pasar los datos al worker
    BestWorker.postMessage({
      Automatas: automatasNoEquivalentesBase,
    });
  }
  if (automatasNoEquivalentesBase.length >= 950 && numEstados == 3) {
    cardBest.style.display = "flex";
    cardChoose.style.display = "flex";
    BestWorker.postMessage({
      Automatas: automatasNoEquivalentesBase,
    });
  }
};

BestWorker.onmessage = function (e) {
  automatasNoEquivalentesBase = e.data.Automatas;

  TheBest = e.data.TheBests;
  console.log(TheBest);

  // Mostrar los autómatas en la tabla
  var table = document.querySelector(".ListaAutomatas");
  table.innerHTML = "";
  var thead = document.createElement("thead");
  thead.innerHTML =
    "<tr>" +
    '<th scope="col" class="table-secondary">#</th>' +
    '<th scope="col">E0</th>' +
    '<th scope="col">E1</th>' +
    (numEstados == 3 ? '<th scope="col">E2</th>' : "") +
    '<th scope="col" class="table-secondary"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">' +
    '<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>' +
    '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>' +
    "</svg> </th>" +
    "</tr>";
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  for (let index = 0; index < automatasNoEquivalentesBase.length; index++) {
    var tr = document.createElement("tr");
    // Comprueba si el autómata actual es uno de los mejores
    if (
      TheBest.some(
        (best) => best.automata === automatasNoEquivalentesBase[index]
      )
    ) {
      tr.innerHTML =
        '<th scope="row" class="table-warning ">' +
        (index + 1) +
        "</th>" +
        "<td class='table-warning'>" +
        automatasNoEquivalentesBase[index][0] +
        " " +
        automatasNoEquivalentesBase[index][1] +
        " " +
        automatasNoEquivalentesBase[index][2] +
        "</td>" +
        "<td class='table-warning'>" +
        automatasNoEquivalentesBase[index][3] +
        " " +
        automatasNoEquivalentesBase[index][4] +
        " " +
        automatasNoEquivalentesBase[index][5] +
        "</td>" +
        (numEstados == 3
          ? "<td class='table-warning'>" +
            automatasNoEquivalentesBase[index][6] +
            " " +
            automatasNoEquivalentesBase[index][7] +
            " " +
            automatasNoEquivalentesBase[index][8] +
            "</td>"
          : "") +
        "<td class='table-warning '>" +
        automatasNoEquivalentesBase[index].puntosTotales +
        "</td>";
    } else {
      tr.innerHTML =
        '<th scope="row" class="table-secondary">' +
        (index + 1) +
        "</th>" +
        "<td>" +
        automatasNoEquivalentesBase[index][0] +
        " " +
        automatasNoEquivalentesBase[index][1] +
        " " +
        automatasNoEquivalentesBase[index][2] +
        "</td>" +
        "<td>" +
        automatasNoEquivalentesBase[index][3] +
        " " +
        automatasNoEquivalentesBase[index][4] +
        " " +
        automatasNoEquivalentesBase[index][5] +
        "</td>" +
        (numEstados == 3
          ? "<td>" +
            automatasNoEquivalentesBase[index][6] +
            " " +
            automatasNoEquivalentesBase[index][7] +
            " " +
            automatasNoEquivalentesBase[index][8] +
            "</td>"
          : "") +
        "<td class='table-secondary'>" +
        automatasNoEquivalentesBase[index].puntosTotales +
        "</td>";
    }
    tbody.appendChild(tr);
  }
  
  // Terminamos de procesar, adjuntamos tbody y ocultamos el div de carga
  table.appendChild(tbody);
  Automatas10 = automatasNoEquivalentesBase;
  Automatas10.sort(function (a, b) {
    return a.puntosTotales - b.puntosTotales;
  });
  //Mostrar el mejor Automata en su respectiva tabla
  var table = document.querySelector(".TableTheBest");
  table.innerHTML = "";
  var thead = document.createElement("thead");
  thead.innerHTML =
    "<tr>" +
    '<th scope="col" class="table-secondary">#</th>' +
    '<th scope="col">E0</th>' +
    '<th scope="col">E1</th>' +
    (numEstados == 3 ? '<th scope="col">E2</th>' : "") +
    '<th scope="col" class="table-secondary"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">' +
    '<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>' +
    '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>' +
    "</svg> </th>" +
    "</tr>";
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  for (let index = 0; index < 10; index++) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<th scope="row" class="table-secondary">' +
      (index + 1) +
      "</th>" +
      "<td>" +
      Automatas10[index][0] +
      " " +
      Automatas10[index][1] +
      " " +
      Automatas10[index][2] +
      "</td>" +
      "<td>" +
      Automatas10[index][3] +
      " " +
      Automatas10[index][4] +
      " " +
      Automatas10[index][5] +
      "</td>" +
      (numEstados == 3
        ? "<td>" +
          Automatas10[index][6] +
          " " +
          Automatas10[index][7] +
          " " +
          Automatas10[index][8] +
          "</td>"
        : "") +
      "<td class='table-secondary'>" +
      Automatas10[index].puntosTotales +
      "</td>";

    tbody.appendChild(tr);
  }

  // Terminamos de procesar, adjuntamos tbody y ocultamos el div de carga
  table.appendChild(tbody);

};

// Agregar un eventListener al botón de submit
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevenir la recarga de la página
  event.preventDefault();

  automatasNoEquivalentesBase = [];

  // Obtener el número de estados seleccionado
  var numEstados;
  if (document.getElementById("Rad2e").checked) {
    numEstados = 2;
    downloadCard.style.display = 'none';
  }
  if (document.getElementById("Rad3e").checked) {
    numEstados = 3;
    downloadCard.style.display = 'none';
  }
  if (document.getElementById("Rad4e").checked) {
    numEstados = 4;
    downloadCard.style.display = 'block';
    cardBest.style.display = 'none';
    Card3E.style.display = 'none';
  }
  if (document.getElementById("Rad5e").checked) {
    numEstados = 5;
    downloadCard.style.display = 'block';
    cardBest.style.display = 'none';
    Card3E.style.display = 'none';
  }

  if (numEstados <= 3) {
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
  }
});
