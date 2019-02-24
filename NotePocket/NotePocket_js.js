
let tablicaNotatek;
let przyciskWstaw;
let notatka_pojemnik;
let notatka_div;
let temat;
let tresc;
let podpis;
let notatka;
let _kolor = "lightgrey";


document.addEventListener("DOMContentLoaded", start);
class Notatka {
    constructor(temat, tresc, podpis) {
        this.temat = temat;
        this.tresc = tresc;
        this.podpis = podpis;
        this.czyPrzypieta = false;
        this.czas = Date.Now();
        this.kolor = _kolor;  
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
    notatka = new Notatka(temat,tresc,podpis);
    tablicaNotatek.push(notatka);
    Zapisz();
}
function Zapisz() {
    localStorage.setItem("tablicaNotatek", JSON.stringify(tablicaNotatek));
}
function Wczytaj() {
    tablicaNotatek = JSON.parse(localStorage.getItem('tablicaNotatek'));
}
function zmienKolor(_kolor) {
    notatka.kolor = _kolor;
}
function naTablice(notatka, czyPierwsza) {
    if(czyPierwsza == undefined) {
        czyPierwsza = false;
    }
    let losoweID = new Date();
    notatka_div = document.createElement('div');
    notatka_div.classList.add('nowa_notatka');
    notatka_div.classList.add(notatka.kolor);
    notatka_div.id = 'notatka_nr ' + losoweID.valueOf();
    notatka_div.innerHTML= 
    `
        <div id='nowa_notatka_temat'>${notatka.temat}</div>
        <div id='nowa_notatka_tresc'>${notatka.tresc}</div>
        <div id='nowa_notatka_podpis'>${notatka.podpis}</div>
        <div id='nowa_notatka_czas'>${notatka.czas.toLocaleDateString()} ${notatka.czas.toLocaleTimeString()}</div>
        <div id='nowa_notatka_buttony'>
            <div>
                <button id="usun">U</button>
                <button id="przypnij">P</button>
            </div>
            <div id="kolory">
                <button id="default" data-numerNot="${notatka_div.id}" data-kolor="lightgrey"></button>
                <button id="czerwony" data-numerNot="${notatka_div.id}" data-kolor="red"></button>
                <button id="zolty" data-numerNot="${notatka_div.id}" data-kolor="yellow"></button>
                <button id="zielony" data-numerNot="${notatka_div.id}" data-kolor="green"></button>
            </div>
        </div>
    `
    if(czyPierwsza == false){
        notatka_pojemnik.appendChild(notatka_div);
    }
    else{
        //let pierwszyNaTablicy = tablica[0].id;
        let pierwszaNotatka = document.getElementById(`${'notatka_nr ' + tablica[0].id}`);
        notatka_pojemnik.insertBefore(notatka_div, pierwszaNotatka);
    }
    
    
}
