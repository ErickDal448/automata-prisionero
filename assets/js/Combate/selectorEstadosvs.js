// declara secciones
const BtnSection = document.querySelector(".BtnSection");
const automatasDivs = document.querySelector(".automatasDivs");

BtnSection.style.display = "none";
automatasDivs.style.display = "none";

// declarar cartas de estados

const cardE1 = document.querySelectorAll(".cardE0");
const cardE2 = document.querySelectorAll(".cardE1");
const cardE3 = document.querySelectorAll(".cardE2");
const cardE4 = document.querySelectorAll(".cardE3");
const cardE5 = document.querySelectorAll(".cardE4");

function DisNone(card) {
  card.style.display = "none";
}

function DisBlock(card) {
  card.style.display = "block";
}

cardE1.forEach(DisNone);
cardE2.forEach(DisNone);
cardE3.forEach(DisNone);
cardE4.forEach(DisNone);
cardE5.forEach(DisNone);

// Determinar el numero de estados
const Sel2E = document.querySelector(".Rad2e");
const Sel3E = document.querySelector(".Rad3e");
const Sel4E = document.querySelector(".Rad4e");
const Sel5E = document.querySelector(".Rad5e");

var NumeroEstados;

// Dar valor a la variable segun el estado seleccionado
Sel2E.addEventListener("click", () => {
  NumeroEstados = 2;
  automatasDivs.style.display = "flex";
  cardE1.forEach(DisBlock);
  cardE2.forEach(DisBlock);
  cardE3.forEach(DisNone);
  cardE4.forEach(DisNone);
  cardE5.forEach(DisNone);

  BtnSection.style.display = "block";
});

Sel3E.addEventListener("click", () => {
  NumeroEstados = 3;
  automatasDivs.style.display = "flex";
  cardE1.forEach(DisBlock);
  cardE2.forEach(DisBlock);
  cardE3.forEach(DisBlock);
  cardE4.forEach(DisNone);
  cardE5.forEach(DisNone);

  BtnSection.style.display = "block";
});

Sel4E.addEventListener("click", () => {
  NumeroEstados = 4;
  automatasDivs.style.display = "flex";
  cardE1.forEach(DisBlock);
  cardE2.forEach(DisBlock);
  cardE3.forEach(DisBlock);
  cardE4.forEach(DisBlock);
  cardE5.forEach(DisNone);

  BtnSection.style.display = "block";
});

Sel5E.addEventListener("click", () => {
  NumeroEstados = 5;
  automatasDivs.style.display = "flex";
  cardE1.forEach(DisBlock);
  cardE2.forEach(DisBlock);
  cardE3.forEach(DisBlock);
  cardE4.forEach(DisBlock);
  cardE5.forEach(DisBlock);

  BtnSection.style.display = "block";
});
