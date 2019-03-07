/*jshint esversion: 6 */
let lokalizacja_start;
let mapa;
let marker;
let websocket;
let gracze = {};
// gracz wprowadza login przed startem dom i mapy
let nick = prompt ('Twój nick:');
let avek = 'https://i.ibb.co/njBQ793/dolan-30-30.png';
let status_pol = document.getElementById ('status_polaczenia');
let status_lok = document.getElementById ('status_lokalizacji');
document.addEventListener ('DOMContentLoaded', start);
//funkcja uruchamiająca mapę i ustawiająca marker z podanymi parametrami
function initMap () {
  lokalizacja_start = {lat: -25.363, lng: 131.044};
  mapa = new google.maps.Map (document.getElementById ('mapa'), {
    zoom: 6,
    center: lokalizacja_start,
    keyboardShortcuts: false,
  });

  marker = new google.maps.Marker ({
    position: lokalizacja_start,
    map: mapa,
    animation: google.maps.Animation.DROP,
    icon: avek,
    title: 'Dolan!',
  });
  pobierzLokalizacje ();
  UruchomWebSocket ();
  window.addEventListener ('keydown', poruszMarkerem);
}
//funkcja startuje po załadowaniu DOM (obsługa wyślij, wyświetlenie loginu)
function start () {
  let wyslij = document.getElementById ('wyslij');
  wyslij.addEventListener ('click', WyslijWiadomosc);
  //let ok = document.getElementById('button_ok');
  //ok.addEventListener('click', WprowadzLogin);
  let okno_login = document.querySelector ('.okno_login');
  okno_login.classList.add ('schowaj');
  document.getElementById ('info').innerHTML = `Twój login to <b>${nick}</b>`;
}
//funkcja odpowiadająca za ruch markerem i przekazywanie współrzędnych na websocket
function poruszMarkerem (e) {
  let lat = marker.getPosition ().lat ();
  let lng = marker.getPosition ().lng ();

  switch (e.code) {
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
  let pozycja = {lat, lng};
  let websocket_data = {
    lat: lat,
    lng: lng,
    id: nick,
  };
  marker.setPosition (pozycja);
  websocket.send (JSON.stringify (websocket_data));
}
//uruchomienie Websocketu, dodannie listenerów
function UruchomWebSocket () {
  let url = 'ws://91.121.6.192:8010';
  websocket = new WebSocket (url);
  websocket.addEventListener ('open', WebSocket_OPEN);
  websocket.addEventListener ('message', WebSocket_MESSAGE);
  websocket.onerror = function (e) {
    status_pol.style.color = 'darkred';
    status_pol.innerHTML = `<i class="icon-lightbulb"></i> Połączenie <b>FAIL</b>`;
  };
}
//funkcja uruchamiana po przejściu websocketu na status open
function WebSocket_OPEN (data) {
  status_pol.style.color = 'green';
  status_pol.innerHTML = `<i class="icon-lightbulb"></i> Połączenie <b>OK</b>`;
  console.log (data);
}
//funkcja uruchmiana podczas przekazywania wiadomości na websocket
function WebSocket_MESSAGE (e) {
  let data = JSON.parse (e.data);
  //let data = JSON.parse(data_2);
  if (!gracze['user' + data.id]) {
    gracze['user' + data.id] = new google.maps.Marker ({
      position: {lat: data.lat, lng: data.lng},
      map: mapa,
      animation: google.maps.Animation.DROP,
      icon: avek,
    });
  } else {
    gracze['user' + data.id].setPosition ({
      lat: data.lat,
      lng: data.lng,
    });
  }
  let msg_ws = JSON.stringify (e.data);
  //wyświetlanie wiadomości zadziała tylko jeśli JSON zawiera 'msg'
  if (msg_ws.includes ('msg')) {
    //dane do diva z wiadomością
    let msg = JSON.parse (e.data);
    let json_nick = msg['nick'];
    let json_msg = msg['msg'];
    let oknoWiadomosci = document.querySelector ('.okno_wiadomosci');
    //utworzenie diva z wiadomością
    let nowaWiadomosc = document.createElement ('div');
    nowaWiadomosc.classList.add ('nowa_wiadomosc');
    nowaWiadomosc.innerHTML = `<b>${json_nick}</b>: ${json_msg}`;
    //dodanie do okna wiadomości
    oknoWiadomosci.appendChild (nowaWiadomosc);
    oknoWiadomosci.scrollTop = oknoWiadomosci.scrollHeight;
  }
}
//success callback
function loc_Zezwalaj (data) {
  let coords = {
    lat: data.coords.latitude,
    lng: data.coords.longitude,
  };
  mapa.setCenter (coords);
  marker.setPosition (coords);
  status_lok.style.color = 'green';
  status_lok.innerHTML = `<i class="icon-map-signs"></i> Lokalizacja <b>OK</b>`;
}
//error callback
function loc_Blokuj (err) {
  status_lok.style.color = 'darkred';
  status_lok.innerHTML = `<i class="icon-map-signs"></i> Lokalizacja <b>FAIL</b>`;
  console.log (err);
}
//pobranie lokalizacji
function pobierzLokalizacje () {
  navigator.geolocation.getCurrentPosition (loc_Zezwalaj, loc_Blokuj);
}
//wysyłanie wiadomości
function WyslijWiadomosc () {
  let wiadomosc = document.getElementById ('wpisz_tekst');
  let wyslij = {
    msg: wiadomosc.value,
    nick: nick,
  };
  websocket.send (JSON.stringify (wyslij));
  wiadomosc.value = ``;
}
/*
function WprowadzLogin() {
    nick = document.getElementById('wpisz_login').value;
    let okno_login = document.querySelector(".okno_login");
    okno_login.classList.add('schowaj');
    document.getElementById('info').innerHTML = `Twój login to <b>${nick}</b>`;
}
*/
