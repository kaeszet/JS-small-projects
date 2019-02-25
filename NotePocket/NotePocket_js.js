
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
        this.czas = Date.now();
        this.id = czas.valueOf();
        this.kolor = _kolor;  
    }
}

function start() {
    tablicaNotatek = [];
    notatka_pojemnik = document.getElementById("#tablica");
    przyciskWstaw = document.getElementById("#wstaw");
    przyciskWstaw = addEventListener("click", stworzNotatke);
    Wczytaj();
}
function stworzNotatke() {
    temat = document.getElementById("#temat");
    tresc = document.getElementById("#tresc");
    podpis = document.getElementById("#podpis");
    notatka = new Notatka(temat,tresc,podpis);
    tablicaNotatek.push(notatka);
    Zapisz();
    naTablice(notatka, true);
}
function Zapisz() {
    localStorage.setItem("tablicaNotatek", JSON.stringify(tablicaNotatek));
}
function Wczytaj() {
    tablicaNotatek = JSON.parse(localStorage.getItem('tablicaNotatek'));
}
function Pokaz() {
    tablicaNotatek.forEach(element => {
        naTablice(element);
    });
}
function Odswiez() {
    Wczytaj();
    notatka_pojemnik.innerHTML = '';
    Pokaz();
}
function Przypnij(id) {
    let tempid;
    for(i=0; i < tablicaNotatek.Length; i++) {
        if (id == notatka.id) {
            tempId = notatka.id;
        }
    }
    tablicaNotatek[tempid].czyPrzypieta = !tablicaNotatek[tempid].czyPrzypieta;
    Zapisz();
    Odswiez();
    
}
function Usun(id) {
    let tempId;
    let doWywalenia;
    for(i=0; i < tablicaNotatek.Length; i++) {
        if (id == notatka.id) {
            tempId = notatka.id;
        }
    }
    tablicaNotatek.splice(tempId, 1);
    doWywalenia = document.getElementById("notatka nr " + id);
    notatka_pojemnik.removechild(doWywalenia);
    Zapisz();

}
function zmienKolor(_kolor) {
    //notatka.kolor = _kolor;
    //zm
}
function naTablice(notatka, czyPierwsza) {
    if(czyPierwsza == undefined) {
        czyPierwsza = false;
    }
    
    notatka_div = document.createElement('div');
    notatka_div.classList.add('nowa_notatka');
    notatka_div.classList.add(notatka.kolor);
    notatka_div.id = 'notatka_nr ' + notatka.id;
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
        let pierwszaNotatka = document.getElementById(`${'notatka_nr ' + tablicaNotatek[0].id}`);
        notatka_pojemnik.insertBefore(notatka_div, pierwszaNotatka);
        Sortuj();
    }
    document.getElementById("usun").addEventListener('click', function() { return Usun(notatka.id)});
    
    
}
function Sortuj() {
    tablicaNotatek.sort(function(not1, not2) {
        return not2.czas - not1.czas;
    });
    tablicaNotatek.sort(function(not1, not2) {
        if(not1.czyPrzypieta == true && not2.czyPrzypieta == true) {
            return 0;
        }
        if(not1.czyPrzypieta == true) {
            return -1;
        }
        else{
            return 1;
        }
    })
}
