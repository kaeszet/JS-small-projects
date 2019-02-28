

let przyciskWstaw;
let notatka_pojemnik;
let notatka_div;
let temat;
let tresc;
let podpis;
let notatka;
let _kolor = "lightgrey";

// po załadowaniu DOM zostaje uruchomiona funkcja start
document.addEventListener('DOMContentLoaded', start);
let tablicaNotatek = []
class Notatka {
    constructor(temat, tresc, podpis) {
        this.temat = temat;
        this.tresc = tresc;
        this.podpis = podpis;
        this.czyPrzypieta = false;
        this.czas_id = Date.now();
        this.kolor = _kolor;  
    }
}

function start() {
    notatka_pojemnik = document.getElementById("tablica");
    document.getElementById("wstaw").addEventListener("click", stworzNotatke);
    Wczytaj();
    Pokaz();
}
// tworzy instancję klasy Notatka, wprowadza wartości do właściwości, dodaje notatkę do tablicy i do diva
function stworzNotatke() {
    temat = document.getElementById("temat").value;
    tresc = document.getElementById("tresc").value;
    podpis = document.getElementById("podpis").value;
    notatka = new Notatka(temat,tresc,podpis);
    tablicaNotatek.push(notatka);
    Zapisz();
    naTablice(notatka, true);
}
//zapisuje tablicę w localstorage string w formacie JSON
function Zapisz() {
    localStorage.setItem("tablica", JSON.stringify(tablicaNotatek));
}
//tworzy obiekt tablicaNotatek poprzez sparsowanie pliku w formacie JSON
function Wczytaj() {
    tablicaNotatek = JSON.parse(localStorage.getItem("tablica")) || []
    Sortuj();
}
//wrzuca tablicę notatek do diva
function Pokaz() {
    tablicaNotatek.forEach(notatka => {
        naTablice(notatka);
    });
}
function Odswiez() {
    Wczytaj();
    notatka_pojemnik.innerHTML = '';
    Pokaz();
}
//przypinanie notatki
function Przypnij(id) {
    const tempId = tablicaNotatek.findIndex(notatka => notatka.czas_id == id);
    tablicaNotatek[tempId].czyPrzypieta = !tablicaNotatek[tempId].czyPrzypieta;
   
    Zapisz();
    Odswiez();
    
}
//usuwanie notatki z tablicy i z diva
function Usun(id) {
    //przeszukuje tablice w poszukiwaniu id przekazanego jako argument funkcji
    const tempId = tablicaNotatek.findIndex(notatka => id == notatka.czas_id);
    //usuwa znaleziony element tablicy (tempId) i tylko ten (1)
    tablicaNotatek.splice(tempId, 1);
    //usunięcie notatki z id=tablica
    const doWywalenia = document.getElementById(`notatka_nr_${id}`);
    notatka_pojemnik.removeChild(doWywalenia);
    Zapisz();

}
//zmiana koloru przez dodanie klasy
function zmienKolor(kolor, id) {
    //document.getElementById(`notatka_nr_${id}`).getElementById(`${kolor}`);
    document.querySelector(`#${id}`).className = `nowa_notatka ${kolor}`;
    tablicaNotatek.find(notatka => id == `notatka_nr_${notatka.czas_id}`).kolor = kolor;
    Zapisz();
    //notatka.kolor = _kolor;
    //zm
}
//obsługuje wyświetlanie tablicy notatek w divie oraz wywołanie funkcji przypisanych do buttonów
function naTablice(notatka, czyPierwsza) {
    let x;
    let przypieta;
    if(czyPierwsza == undefined) {
        czyPierwsza = false;
    }
    if(notatka.czyPrzypieta) {
        przypieta = "przypnij";
    }
    
    notatka_div = document.createElement('div');
    notatka_div.classList.add('nowa_notatka');
    notatka_div.classList.add(notatka.kolor);
    notatka_div.id = `notatka_nr_${notatka.czas_id}`;
    x = new Date(notatka.czas_id)
    notatka_div.innerHTML= 
    `
        <div id='nowa_notatka_temat'>${notatka.temat}</div>
        <div id='nowa_notatka_tresc'>${notatka.tresc}</div>
        <div id='nowa_notatka_podpis'>${notatka.podpis}</div>
        <div id='nowa_notatka_czas'>${x.toLocaleDateString()} ${x.toLocaleTimeString()}</div>
        <div id='nowa_notatka_buttony'>
            <div>
                <button id="usun_${notatka.czas_id}">U</button>
                <button id="przypnij_${notatka.czas_id}" class=${przypieta}>P</button>
            </div>
            <div id="kolory">
                <button id="default" data-numerNot="${notatka_div.id}" data-kolor="default"></button>
                <button id="czerwony" data-numerNot="${notatka_div.id}" data-kolor="czerwony"></button>
                <button id="zolty" data-numerNot="${notatka_div.id}" data-kolor="zolty"></button>
                <button id="zielony" data-numerNot="${notatka_div.id}" data-kolor="zielony"></button>
            </div>
        </div>
    `
    if(czyPierwsza == false){
        notatka_pojemnik.appendChild(notatka_div);
    }
    else{
        //let pierwszyNaTablicy = tablica[0].id;
        let pierwszaNotatka = document.getElementById(`${'notatka_nr_' + tablicaNotatek[0].id}`);
        notatka_pojemnik.insertBefore(notatka_div, pierwszaNotatka);
        Sortuj();
    }
    document.getElementById(`usun_${notatka.czas_id}`).addEventListener('click', function() { return Usun(notatka.czas_id)});
    document.getElementById(`przypnij_${notatka.czas_id}`).addEventListener('click', function(e) {return Przypnij(notatka.czas_id)})
    document.querySelectorAll("#default, #czerwony, #zolty, #zielony").forEach(id => {
        id.addEventListener('click', (e) => {
            const kolor = e.target.dataset.kolor;
            const id = e.target.dataset.numernot;
            zmienKolor(kolor, id);
        });
    });
}
//sortowanie, najwyżej przypięte notatki, później nieprzypięte w kolejności od najpóźniejszego czasu do najwcześniejszego
function Sortuj() {
    tablicaNotatek.sort(function(not1, not2) {
        return not2.czas_id - not1.czas_id;
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
