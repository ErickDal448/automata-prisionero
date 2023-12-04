// declara secciones
const inputCadenaSec = document.querySelector(".inputCadenaSec");
const BtnSection = document.querySelector(".BtnSection");

inputCadenaSec.style.display = "none";
BtnSection.style.display = "none";

// declarar cartas de estados

const cardE1 = document.querySelector(".cardE0");
const cardE2 = document.querySelector(".cardE1");
const cardE3 = document.querySelector(".cardE2");
const cardE4 = document.querySelector(".cardE3");
const cardE5 = document.querySelector(".cardE4");

cardE1.style.display = "none";
cardE2.style.display = "none";
cardE3.style.display = "none";
cardE4.style.display = "none";
cardE5.style.display = "none";

// declarar estados en tabla tr
const TablaAutomata = document.querySelector(".tablaAutomata");
const TrE0 = document.querySelector(".TrE0");
const TrE1 = document.querySelector(".TrE1");
const TrE2 = document.querySelector(".TrE2");
const TrE3 = document.querySelector(".TrE3");
const TrE4 = document.querySelector(".TrE4");

TablaAutomata.style.display = "none";
TrE0.style.display = "none";
TrE1.style.display = "none";
TrE2.style.display = "none";
TrE3.style.display = "none";
TrE4.style.display = "none";

// Determinar el numero de estados
const Sel2E = document.querySelector(".Rad2e");
const Sel3E = document.querySelector(".Rad3e");
const Sel4E = document.querySelector(".Rad4e");
const Sel5E = document.querySelector(".Rad5e");

var NumeroEstados;

// Dar valor a la variable segun el estado seleccionado
Sel2E.addEventListener("click", () => {
  NumeroEstados = 2;

  cardE1.style.display = "block";
  cardE2.style.display = "block";
  cardE3.style.display = "none";
  cardE4.style.display = "none";
  cardE5.style.display = "none";

  TrE0.style.display = "table-row";
  TrE1.style.display = "table-row";
  TrE2.style.display = "none";
  TrE3.style.display = "none";
  TrE4.style.display = "none";

  mostrarSecciones();
});

Sel3E.addEventListener("click", () => {
  NumeroEstados = 3;

  cardE1.style.display = "block";
  cardE2.style.display = "block";
  cardE3.style.display = "block";
  cardE4.style.display = "none";
  cardE5.style.display = "none";

  TrE0.style.display = "table-row";
  TrE1.style.display = "table-row";
  TrE2.style.display = "table-row";
  TrE3.style.display = "none";
  TrE4.style.display = "none";

  mostrarSecciones();
});

Sel4E.addEventListener("click", () => {
  NumeroEstados = 4;

  cardE1.style.display = "block";
  cardE2.style.display = "block";
  cardE3.style.display = "block";
  cardE4.style.display = "block";
  cardE5.style.display = "none";

  TrE0.style.display = "table-row";
  TrE1.style.display = "table-row";
  TrE2.style.display = "table-row";
  TrE3.style.display = "table-row";
  TrE4.style.display = "none";

  mostrarSecciones();
});

Sel5E.addEventListener("click", () => {
  NumeroEstados = 5;

  cardE1.style.display = "block";
  cardE2.style.display = "block";
  cardE3.style.display = "block";
  cardE4.style.display = "block";
  cardE5.style.display = "block";

  TrE0.style.display = "table-row";
  TrE1.style.display = "table-row";
  TrE2.style.display = "table-row";
  TrE3.style.display = "table-row";
  TrE4.style.display = "table-row";

  mostrarSecciones();
});

function mostrarSecciones() {
  if (cardE1.style.display == "block") {
    inputCadenaSec.style.display = "block";
    BtnSection.style.display = "block";
    TablaAutomata.style.display = "block";
  }
}
