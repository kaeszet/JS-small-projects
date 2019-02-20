let tablicaNotatek;
let przyciskWstaw;
let notatka_pojemnik;
let temat;
let tresc;
let podpis;
let notatka;


document.addEventListener("DOMContentLoaded", start);
class Notatka {
    constructor(temat, tresc) {
        this.temat = temat;
        this.tresc = tresc;
        this.czas = Date.Now();
    }
}

function start() {
    tablicaNotatek = [];
    notatka_pojemnik = document.getElementById("#tablica");
    przyciskWstaw = document.getElementById("#wstaw");
    przyciskWstaw = addEventListener("click", stworzNotatke);
}
function stworzNotatke() {
    temat = document.getElementById("#temat");
    tresc = document.getElementById("#tresc");
    podpis = document.getElementById("#podpis");
    notatka = new Notatka(temat,tresc);
    tablicaNotatek.push(notatka);
    Zapisz();
}
function Zapisz() {
    localStorage.setItem("tablicaNotatek", JSON.stringify(tablicaNotatek));
}
