document.addEventListener ('DOMContentLoaded', appStart);
//dictionary z id nagrań
const sounds = {
  97: 'clap',
  115: 'boom',
  100: 'hihat',
  102: 'kick',
  103: 'openhat',
  104: 'ride',
  106: 'snare',
  107: 'tink',
  108: 'tom',
};
const channel1 = [];
const channel2 = [];
const channel3 = [];
const channel4 = [];
let channel1_IsChecked = true;
let channel2_IsChecked = false;
let channel3_IsChecked = false;
let channel4_IsChecked = false;
let rec_stop_button = '';
let isRecording = false;
let recStart = 0;
//punkt starowy aplikacji po załadowaniu struktury DOM
function appStart () {
    rec_stop_button = document.querySelector ('#rec');
  window.addEventListener ('keypress', playSound);
  document.querySelector ('#play').addEventListener ('click', playMusic);
  rec_stop_button.addEventListener ('click', recMusic);
  const ch_st = document.querySelectorAll ('#k');
  for (let i = 0; i < ch_st.length; i++) {
    ch_st[i].addEventListener ('click', checkbox_status);
  }
}
//po kliknięciu zmienia stan każdego kanału
function checkbox_status () {
  channel1_IsChecked = document.kanaly.querySelector ('input[name="kanal1"]')
    .checked;
  channel2_IsChecked = document.kanaly.querySelector ('input[name="kanal2"]')
    .checked;
  channel3_IsChecked = document.kanaly.querySelector ('input[name="kanal3"]')
    .checked;
  channel4_IsChecked = document.kanaly.querySelector ('input[name="kanal4"]')
    .checked;
}
//uruchamia nagraną sekwencję
function playMusic () {
    if(channel1_IsChecked) {
        channel1.forEach (sound => {
            setTimeout (() => {
              audioDOM = document.querySelector (`#${sound.name}`);
              //otwórz dźwięk
              //let audio = new Audio()
              audioDOM.currentTime = 0;
              audioDOM.play ();
            }, sound.time);
          });
    }
  if(channel2_IsChecked) {
    channel2.forEach (sound => {
        setTimeout (() => {
          audioDOM = document.querySelector (`#${sound.name}`);
          //otwórz dźwięk
          //let audio = new Audio()
          audioDOM.currentTime = 0;
          audioDOM.play ();
        }, sound.time);
      });
  }
  if(channel3_IsChecked) {
    channel3.forEach (sound => {
        setTimeout (() => {
          audioDOM = document.querySelector (`#${sound.name}`);
          //otwórz dźwięk
          //let audio = new Audio()
          audioDOM.currentTime = 0;
          audioDOM.play ();
        }, sound.time);
      });
  }
  if(channel4_IsChecked) {
    channel4.forEach (sound => {
        setTimeout (() => {
          audioDOM = document.querySelector (`#${sound.name}`);
          //otwórz dźwięk
          //let audio = new Audio()
          audioDOM.currentTime = 0;
          audioDOM.play ();
        }, sound.time);
      });
    }
  }
//nagrywanie muzyki 
function recMusic (e) {
  //zap czas-start
  recStart = Date.now ();
  //zmień tryb nagrywania w odtwarzanie
  isRecording = !isRecording;
  //zaktualizuj napis na buttonie
  if(isRecording) {
    rec_stop_button.innerHTML = '<i class="icon-stop"></i>';
  }
  else{
    rec_stop_button.innerHTML = '<i class="icon-record"></i>';
  }
  //e.target.innerHTML = isRecording ? '<i class="icon-stop" style="background-repeat: no-repeat;"></i>' : '<i class="icon-record style="background-repeat: no-repeat;""></i>';
}
function playSound (e) {
  //pobierz kod znaku
  audioName = sounds[e.charCode];
  //pobierz kod audio z DOM
  audioDOM = document.getElementById (`${audioName}`);
  const key = document.querySelector (`#${audioName}_key.klawisz`);
  const keys = document.querySelectorAll ('.klawisz');
  key.classList.add ('graj');
  //otwórz dźwięk
  //let audio = new Audio()
  audioDOM.currentTime = 0;
  audioDOM.play ();
  keys.forEach (function (key) {
    key.addEventListener ('transitionend', deleteTransform);
  });

  //zapisywanie do ścieżki 1
  if(channel1_IsChecked) {
    if (isRecording) {
        channel1.push ({
          name: audioName,
          time: Date.now () - recStart,
        });
      }
  }
  //zapisywanie do ścieżki 2
 if(channel2_IsChecked) {
    if (isRecording) {
        channel2.push ({
          name: audioName,
          time: Date.now () - recStart,
        });
      }
 }
 //zapisywanie do ścieżki 3
  if(channel3_IsChecked) {
    if (isRecording) {
        channel3.push ({
          name: audioName,
          time: Date.now () - recStart,
        });
      }
  }
  //zapisywanie do ścieżki 4
  if(channel4_IsChecked) {
    if (isRecording) {
        channel4.push ({
          name: audioName,
          time: Date.now () - recStart,
        });
      }
  }
  //usuwa klasę graj (transform)
  function deleteTransform (e) {
    if (e.propertyName !== 'transform') {
      return;
    } else {
      this.classList.remove ('graj');
    }
  }
  //klawisze.forEach(function (klawisz) { klawisz.addEventListener('transitionend', usunZmiane) });
}
