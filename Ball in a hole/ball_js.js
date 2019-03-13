/*jshint esversion: 6 */
let dziurka;
let cel;
let sciana;
let canvas = document.getElementById ('canva');
let canvas_ball = document.getElementById ('canva_ball');
let ctx = canvas.getContext ('2d');
let ctx_ball = canvas_ball.getContext ('2d');
let output = document.querySelector ('.output');
let maxX = canvas.width - canvas_ball.width; //poll.clientWidth - ball.clientWidth;
let maxY = canvas.height - canvas_ball.height; //poll.clientHeight - ball.clientHeight;
const start_value = 20;
let iloscDziurek = 0;
let score_f = document.querySelector ('#score');
let score = 0;
//document.addEventListener('DOMContentLoaded', uruchom)
function uruchom () {
  ctx.beginPath ();
  ctx.rect (0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#396b2b`;
  ctx.fill ();
  stworzPilke (ctx_ball, canvas_ball, 10, 'black');
  stworzDziurke ();
  stworzCel();
  ctx.drawImage (canvas_ball, start_value, start_value);
  window.addEventListener ('deviceorientation', ruszaj);
}
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
  context.lineWidth = 5;
  context.strokeStyle = `#396b2b`;
  context.stroke ();
  //context.drawImage(canvas, 20, 20);
}
function ruszaj (e) {
  let x = e.beta;
  let y = e.gamma;
  ctx_ball.fillStyle = '#396b2b';
  ctx_ball.fill ();
  let old_top = canvas_ball.top;
  let old_left = canvas_ball.left;
  if (old_top == undefined) {
    old_top = start_value;
    old_left = start_value;
  }
  ctx.drawImage (canvas_ball, old_left, old_top);
  //ctx.clearRect()
  console.log (e);
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
  //ball.style.top
  canvas_ball.top = maxX * x / 180;
  //ball.style.left
  canvas_ball.left = maxY * y / 180;
  ctx_ball.fillStyle = `black`;
  ctx_ball.fill ();
  ctx_ball.lineWidth = 5;
  ctx_ball.strokeStyle = `#396b2b`;
  ctx_ball.stroke ();
  ctx.drawImage (canvas_ball, canvas_ball.left, canvas_ball.top);
  if (
    canvas_ball.left >= (canvas.width / 2) - (cel.width / 2) &&
    canvas_ball.left <= (canvas.width / 2) - (cel.width / 2) + cel.width - canvas_ball.width &&
    canvas_ball.top >= cel.top &&
    canvas_ball.top <= cel.height - (cel.height / 2)

    //canvas_ball.left >= dziurka.left &&
    //canvas_ball.left <= dziurka.left + 25 &&
    //canvas_ball.top >= dziurka.top &&
    //canvas_ball.top <= dziurka.top + 25
  ) {
    score++;
    
    alert ('Trafiony');
    score_f.innerHTML = score;
    stworzDziurke ();
    stworzCel();
    
  }
}
function stworzDziurke () {
  //z każdym punktem ma się tworzyć nowa zła dziurka min 20 od krawędzi, kolor czerwony
  // punkt docelowy na krawędzi, najlepiej innej za każdym razem, kolor jasnozielony

  let czas;
  let ctx_dziurka;
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
  ctx_dziurka.globalCompositeOperation = "xor";
  iloscDziurek++;
  ctx.drawImage(dziurka, dziurka.left, dziurka.top);
  
}
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
  if (sciana == canvas.height - cel.height || sciana == undefined) {
    ctx.drawImage(cel, (canvas.width / 2) - (cel.width / 2), 0);
  }
  else {
    ctx.drawImage(cel, (canvas.width / 2) - (cel.width / 2), canvas.height - cel.height);
  }
  
  
  

}
