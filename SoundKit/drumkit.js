document.addEventListener('DOMContentLoaded', appStart)

const sounds = {
    97: "clap",
    115: "boom",
    100: "hihat",
    102: "kick",
    103: "openhat",
    104: "ride",
    106: "snare",
    107: "tink",
    108: "tom"
}
const channel1 = []
let isRecording = false
let recStart = 0

function appStart() {
    window.addEventListener('keypress', playSound);
    document.querySelector('#play').addEventListener('click', playMusic);
    document.querySelector('#rec').addEventListener('click', recMusic);

}
function playMusic(){
    channel1.forEach(sound => { 
    setTimeout(
    () => {
        audioDOM = document.querySelector(`#${sound.name}`)
        //otwórz dźwięk
        //let audio = new Audio()
        audioDOM.currentTime = 0
        audioDOM.play();
    } 
        , sound.time 
    )
})
}
function recMusic(e) {
    //zap czas-start
    recStart = Date.now()
    //zmień tryb nagrywania w odtwarzanie
    isRecording = !isRecording
    //zauktualizuj nnapis na buttonie
    e.target.innerHTML = isRecording ? 'Zakończ' : 'Nagrywaj'
}
function playSound(e) {
    
    
    //pobierz kod znaku
    audioName = sounds[e.charCode]
    //pobierz kod audio z DOM
    audioDOM = document.getElementById(`${audioName}`);
    const key = document.querySelector(`#${audioName}.klawisz`);
    key.classList.add('graj');
    //otwórz dźwięk
    //let audio = new Audio()
    audioDOM.currentTime = 0
    audioDOM.play();
    function usunZmiane(e) {
        if (e.propertyName !== 'transform') {
            return;
        }
        else {
            console.log(this)
            this.classList.remove('graj');
        }
    }
    //zapisywanie do ścieżki 1
    if (isRecording) {
        channel1.push(
            {
                name: audioName,
                time: Date.now() - recStart
            }
        )
    }
    //klawisze.forEach(function (klawisz) { klawisz.addEventListener('transitionend', usunZmiane) });
  
} 
