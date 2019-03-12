/*jshint esversion: 6 */
let canvas = document.getElementById ('canva');
let canvas_ball = document.getElementById ('canva_ball');
let ctx = canvas.getContext ('2d');
let ctx_ball = canvas_ball.getContext ('2d');
let output = document.querySelector ('.output');
let maxX = canvas.width - canvas_ball.width; //poll.clientWidth - ball.clientWidth;
let maxY = canvas.height - canvas_ball.height; //poll.clientHeight - ball.clientHeight;
const start_value = 20;
let iloscDziurek = 1;
//document.addEventListener('DOMContentLoaded', uruchom)
function uruchom () {
  ctx.beginPath ();
  ctx.rect (0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#396b2b`;
  ctx.fill ();
  stworzPilke ();
  ctx.drawImage (canvas_ball, start_value, start_value);
  window.addEventListener ('deviceorientation', ruszaj);
}
function stworzPilke () {
  ctx_ball.beginPath ();
  ctx_ball.arc (
    canvas_ball.width / 2,
    canvas_ball.height / 2,
    10,
    0,
    2 * Math.PI,
    false
  );
  ctx_ball.stroke ();
  ctx_ball.fillStyle = 'black';
  ctx_ball.fill ();
  ctx_ball.lineWidth = 5;
  ctx_ball.strokeStyle = `#396b2b`;
  ctx_ball.stroke();
  //ctx_ball.drawImage(canvas, 20, 20);
}
function ruszaj (e) {
  let x = e.beta;
  let y = e.gamma;
  ctx_ball.fillStyle = '#396b2b';
  ctx_ball.fill();
  let old_top = canvas_ball.top;
  let old_left = canvas_ball.left;
  if(old_top == undefined) {
    old_top = start_value;
    old_left = start_value;
  }
  ctx.drawImage(canvas_ball, old_left, old_top);
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
  ctx_ball.fill();
  ctx_ball.lineWidth = 5;
  ctx_ball.strokeStyle = `#396b2b`;
  ctx_ball.stroke();
  ctx.drawImage (canvas_ball, canvas_ball.left, canvas_ball.top);

}
function stworzDziurke() {
  let czas;
  for(i = 0; i < iloscDziurek; i++) {
    czas = Date.now();
    canvas.innerHTML = `
    <canvas width="30" height="30" id="dziurka_${czas}"></canvas>
    `;
    let dziurka = document.getElementById(`dziurka_${czas}`);
    let ctx_dziurka = dziurka.getContext ('2d');
  }
}
