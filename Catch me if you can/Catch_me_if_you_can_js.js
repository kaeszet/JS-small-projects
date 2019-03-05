/*jshint esversion: 6 */
let lokalizacja_start; 
let mapa; 
let marker;
let websocket;
let gracze = {};
let nick = 'Dolan';
let avek = "https://i.ibb.co/njBQ793/dolan-30-30.png";
document.addEventListener('DOMContentLoaded', start);
function initMap(){
    lokalizacja_start = {lat: -25.363, lng: 131.044};
    mapa = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 6,
        center: lokalizacja_start,
        keyboardShortcuts: false
    });
    
    marker = new google.maps.Marker({
        position: lokalizacja_start,
        map: mapa,
        animation: google.maps.Animation.DROP,
        icon: avek,
        title: "Dolan!"
        
    });
    pobierzLokalizacje();
    UruchomWebSocket();
    window.addEventListener('keydown', poruszMarkerem);
    //
    //
}
function start(){
    let wyslij = document.getElementById("wyslij");
    wyslij.addEventListener('click', WyslijWiadomosc);
    let ok = document.getElementById('button_ok');
    ok.addEventListener('click', WprowadzLogin);
}
function poruszMarkerem(e){
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();

    switch(e.code) {
        case 'ArrowUp':
        lat += 0.05;
        break;
        case 'ArrowDown':
        lat -= 0.05;
        break;
        case 'ArrowRight':
        lng += 0.05;
        break;
        case 'ArrowLeft':
        lng -= 0.05;
        break;

    }
    let pozycja = { lat, lng };
    let websocket_data = { 
        lat : lat,
        lng: lng,
        id: nick
    };
    marker.setPosition(pozycja);
    
    websocket.send(JSON.stringify(websocket_data));
}
function UruchomWebSocket() {
    let url = 'ws://91.121.6.192:8010';
    websocket = new WebSocket(url);
    websocket.addEventListener('open', WebSocket_OPEN);
    websocket.addEventListener('message', WebSocket_MESSAGE);
}
function WebSocket_OPEN(data) {
    console.log(data);
}
function WebSocket_MESSAGE(e) {
    let data = JSON.parse(e.data);
    if(gracze['user' + data.id] == false) {
        gracze['user' + data.id] = new google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map: mapa,
            animation: google.maps.Animation.DROP,
            
        });
    }
    else {
        players['user' + data.id].setPosition({
            lat: data.lat,
            lng: data.lng
        });
    }
    if(data.includes("msg")) {
        //utw div
        //uzup div nowa_wiadomosc
        //dod do okna
    }
}
function loc_Zezwalaj(data) {
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    };
    mapa.setCenter(coords);
    marker.setPosition(coords);
}
function loc_Blokuj (err) {
    console.log(err);
}
function pobierzLokalizacje(){
    navigator.geolocation.getCurrentPosition(loc_Zezwalaj, loc_Blokuj);
}
function WyslijWiadomosc(){
    let wiadomosc = document.getElementById("wpisz_tekst").value;
    let wyslij = {
        msg: wiadomosc,
        nick: nick
    };
    websocket.send(JSON.stringify(wyslij));
    wiadomosc.value = '';
}
function WprowadzLogin() {
    nick = document.getElementById('wpisz_login').value;
    let okno_login = document.querySelector(".okno_login");
    okno_login.classList.add('schowaj');
    document.getElementById('info').innerHTML = `Twój login to <b>${nick}</b>`;
}