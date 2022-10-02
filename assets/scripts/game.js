const optionsContainer = document.querySelector('.options');
const options = document.querySelectorAll('.option');
const button = document.getElementById('generator-button');
const storyTitle = document.querySelector('.story-title');

let selectedOption;
let isSoundPlaying = false;
let titleRndNum;
// sounds
const piano = new Audio('./assets/sounds/piano.mp3');
const recorder = new Audio('./assets/sounds/recorder.mp3');
const organ = new Audio('./assets/sounds/organ.mp3');
const violin = new Audio('./assets/sounds/violin.mp3');
const correct = new Audio('./assets/sounds/correct.mp3');
const wrong = new Audio ('./assets/sounds/wrong.mp3');

const sounds = [piano, recorder, organ, violin];

const titles = [
    {title: 'Unei fecioare', song:piano},
    {title: 'Nevroză', song:piano},
    {title: 'Toamnă murind', song: violin},
    {title: 'Tu ai murit...', song:violin}
]

function generateNewTitle() {
    titleRndNum = Math.trunc(Math.random() * titles.length);
    storyTitle.textContent = `"${titles[titleRndNum].title}"`;
    button.textContent = 'Check';
}

optionsContainer.addEventListener('click', event => {
    if(event.target.className == 'option' && storyTitle.textContent.trim() != '') {
        const selected = event.target;
        for (const option of options) {
            if(option === selected && !isSoundPlaying) {
                option.style.backgroundColor = '#f6c873'
                selectedOption = option;
                for (let i = 0; i < options.length; i++) {
                    const element = options[i];
                    if (element === selected) {
                        sounds[i].play();
                        isSoundPlaying = true;
                        setTimeout(() => {
                            sounds[i].pause();
                            sounds[i].currentTime = 0;
                            isSoundPlaying = false;
                        }, 2500);
                    }
                }
            } 
            else{
                option.style.backgroundColor = 'white';
            }
        }
        
    }
})

button.addEventListener('click', () => {
    if(button.textContent.toLowerCase() == 'generate') {
        generateNewTitle();
    }
    if(button.textContent.toLowerCase() == 'check') {
        console.log()
        for (let i = 0; i < options.length; i++) {
            const element = options[i];
            if (element === selectedOption) {
                if(sounds[i] == titles[titleRndNum].song) {
                    console.log('succes');
                    sounds[i].pause();
                    sounds[i].currentTime = 0;
                    element.style.backgroundColor = 'green';
                    button.textContent = '...'
                    correct.play();
                    setTimeout(() => {
                        element.style.backgroundColor = 'white';
                        generateNewTitle();
                    }, 2500);
                } else {
                    console.log('fail');
                    sounds[i].pause();
                    sounds[i].currentTime = 0;
                    element.style.backgroundColor = 'red';
                    button.textContent = '...'
                    wrong.play();
                    setTimeout(() => {
                        element.style.backgroundColor = 'white';
                        generateNewTitle();
                    }, 2500);
                }
            }
        }
    }
})