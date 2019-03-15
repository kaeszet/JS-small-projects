/*jshint esversion: 6 */
let dziurka;
let cel;
let sciana;
let canvas = document.getElementById ('canva');
let canvas_ball = document.getElementById ('canva_ball');
let ctx = canvas.getContext ('2d');
let ctx_ball = canvas_ball.getContext ('2d');
let output = document.querySelector ('.output');
let maxX = canvas.width - canvas_ball.width;
let maxY = canvas.height - canvas_ball.height;
let score = parseInt(localStorage.getItem(`score`), 10) || 0;
let iloscDziurek = score + 1;
let score_f = document.querySelector ('#score');
score_f.innerHTML = score;
let dziurkaArray = [];

//funkcja wczystuje się po załadowaniu body
function uruchom () {
  ctx.beginPath ();
  ctx.rect (0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#396b2b`;
  ctx.fill ();
  stworzPilke (ctx_ball, canvas_ball, 10, 'black');
  stworzDziurke ();
  stworzCel();
  ctx.drawImage (canvas_ball, canvas.width / 2 - canvas_ball.width / 2, canvas.height / 2 - canvas_ball.height / 2);
  //uruchomienie funkcji "ruszaj" po wykryciu zmiany położenia urządzenia
  window.addEventListener ('deviceorientation', ruszaj);
  document.getElementById('reset').addEventListener('click', reset);
  //fukcja, która czyści localStorage przed ponownym załadowaniem aplikacji
  window.addEventListener('beforeunload', function(event) {
    localStorage.clear();
 }, false);
}
//funkcja tworząca kulkę poruszaną przez użytkownika i (częściowo) kulki-przeszkody
function stworzPilke (context, canv, promien, kolor) {
  context.beginPath ();
  context.arc (
    canv.width / 2,
    canv.height / 2,
    promien,
    0,
    2 * Math.PI,
    false
  );
  context.stroke ();
  context.fillStyle = `${kolor}`;
  context.fill ();
  context.lineWidth = 1;
  context.strokeStyle = `#396b2b`;
  context.stroke ();
  //context.drawImage(canvas, 20, 20);
}
//funkcja obsługująca ruch kulki oraz skutki trafienia do celu lub w przeszkodę
function ruszaj (e) {
  let x = e.beta;
  let y = e.gamma;
  ctx_ball.fillStyle = '#396b2b';
  ctx_ball.fill ();
  let old_top = canvas_ball.top;
  let old_left = canvas_ball.left;
  if (old_top == undefined) {
    old_top = canvas.height / 2 - canvas_ball.height / 2;
    old_left = canvas.width / 2 - canvas_ball.width / 2;
  }
  ctx.drawImage (canvas_ball, old_left, old_top);
  //ctx.clearRect()
  output.innerHTML = 'beta : ' + x + '\n';
  output.innerHTML += 'gamma: ' + y + '\n';
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }
  x += 90;
  y += 90;
  canvas_ball.top = maxX * x / 180;
  canvas_ball.left = maxY * y / 180;
  ctx_ball.fillStyle = `black`;
  ctx_ball.fill ();
  ctx_ball.lineWidth = 5;
  ctx_ball.strokeStyle = `#396b2b`;
  ctx_ball.stroke ();
  ctx.drawImage (canvas_ball, canvas_ball.left, canvas_ball.top);
  //jeżeli cel jest przypięty do górnej krawędzi
  if (score % 2 == 0) {
    if (
      canvas_ball.left >= (canvas.width / 2) - (cel.width / 2) - canvas_ball.width + ctx_ball.lineWidth &&
      canvas_ball.left <= (canvas.width / 2) - (cel.width / 2) + cel.width - ctx_ball.lineWidth &&
      canvas_ball.top >= cel.height - cel.height &&
      canvas_ball.top <= cel.height - (cel.height / 2)
    ) {
      punkt();
    }
  }
  //jeżeli cel jest przypiety do dolnej krawędzi
  else {
    if (
      canvas_ball.left >= (canvas.width / 2) - (cel.width / 2) - canvas_ball.width + ctx_ball.lineWidth &&
      canvas_ball.left <= (canvas.width / 2) - (cel.width / 2) + cel.width - ctx_ball.lineWidth &&
      canvas_ball.top >= canvas.height - cel.height - canvas_ball.height &&
      canvas_ball.top <= canvas.height
    ) {
      punkt();
    }
  }
  //forEach do sprawdzenia, czy piłka nie wpadła w którąś przeszkodę
  dziurkaArray.forEach(dziurka => {
    if (
      canvas_ball.left >= dziurka.left - canvas_ball.width + ctx_ball.lineWidth &&
      canvas_ball.left <= dziurka.left + dziurka.width - ctx_ball.lineWidth &&
      canvas_ball.top >= dziurka.top - canvas_ball.height + ctx_ball.lineWidth &&
      canvas_ball.top <= dziurka.top + dziurka.height - ctx_ball.lineWidth
    ) {
      przegrana("Przegrałeś!");
    }
  });
}
//funkcja do tworzenia przeszkody (z każdym punktem tworzona jest dodatkowa dziurka)
function stworzDziurke () {
  let czas;
  let ctx_dziurka;
  for (i = 0; i < iloscDziurek; i++) {
    czas = Date.now ();
    canvas.innerHTML += `<canvas width="30" height="30" id="dziurka_${czas}"></canvas>`;
    dziurka = document.getElementById (`dziurka_${czas}`);
    ctx_dziurka = dziurka.getContext ('2d');
    stworzPilke (ctx_dziurka, dziurka, 15, 'red');
    let dziurkaHeight = canvas.height - dziurka.height; //poll.clientHeight - hole.clientHeight;
    let dziurkaWidth = canvas.width - dziurka.width; //poll.clientWidth - hole.clientWidth;
    let dziurkaX = Math.floor (Math.random () * dziurkaWidth) + 1;
    let dziurkaY = Math.floor (Math.random () * dziurkaHeight) + 1;
    dziurka.left = dziurkaX;
    dziurka.top = dziurkaY;
    dziurkaArray.push(dziurka);
    ctx.drawImage(dziurka, dziurka.left, dziurka.top);
  }
  iloscDziurek++;
  
  
}
//funkcja do tworzenia celu (białej "bramki")
function stworzCel() {
  let czas;
  let ctx_cel;
  
  czas = Date.now ();
  canvas.innerHTML += `<canvas width="50" height="10" id="cel_${czas}"></canvas>`;
  cel = document.getElementById (`cel_${czas}`);
  ctx_cel = cel.getContext ('2d');
  ctx_cel.beginPath ();
  ctx_cel.rect (0, 0, cel.width, cel.height);
  ctx_cel.fillStyle = `#ffffff`;
  ctx_cel.fill ();
  if (score % 2 == 0) {
    ctx.drawImage(cel, (canvas.width / 2) - (cel.width / 2), 0);
  }
  else {
    ctx.drawImage(cel, (canvas.width / 2) - (cel.width / 2), canvas.height - cel.height);
  }

}
//czyszczenie Storage i przeładowanie strony
function reset() {
  localStorage.clear();
  location.reload();
}
//naliczanie punktów za trafienie do celu
function punkt(){
  score++;
  score_f.innerHTML = score;
  location.reload();
  //doZapisu.push(score);
  localStorage.setItem(`score`, `${score}`);
}
//generuje napis w przypadku przegranej
function przegrana(tekst) {
  window.removeEventListener ('deviceorientation', ruszaj);
  ctx.font = `30pt Arial`;
  ctx.fillStyle = `pink`;
  ctx.textAlign = `center`;
  ctx.textBaseline = `middle`;
  ctx.fillText(`${tekst}`, canvas.width / 2, canvas.height / 2);
  ctx.font = `15pt Arial`;
  ctx.fillText(`Twój wynik: ${score}`, canvas.width / 2, (canvas.height / 2) + 40 );
  setTimeout(function() {reset();}, 2000);
  
}
//czasomierz
function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  let inter = 1000;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      //timer--;
      if (timer == 0) {
        przegrana("Koniec czasu!");
        timer = 0;
        inter = 100000;
       
      }
      else {
        timer--;
      }
      
  }, inter);
}

setTimeout(function () {
  const setCountdown = 30,
      display = document.querySelector('#time');
  startTimer(setCountdown, display);
}, 20);

