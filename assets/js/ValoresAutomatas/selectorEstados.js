const form3E = document.querySelector(".form3E");
const form2E = document.querySelector(".form2E");

form2E.style.display = "none";
form3E.style.display = "none";

const Sel2E = document.querySelector(".Rad2e")
const Sel3E = document.querySelector(".Rad3e")

Sel2E.addEventListener('click', () => {
    if(form2E.style.display === 'none'){
        form2E.style.display = 'flex';
        form3E.style.display = 'none';
    }
})

Sel3E.addEventListener('click', () => {
    if(form3E.style.display === 'none'){
        form3E.style.display = 'flex';
        form2E.style.display = 'none';
    }
})