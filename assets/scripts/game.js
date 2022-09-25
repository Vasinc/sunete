const backdrop = document.querySelector('.backdrop');
const shopBtn = document.getElementById('shop-button');
const shopUI = document.querySelector('.shopUI');
const statsBtn = document.getElementById('stats-button');
const statsUI = document.querySelector('.statsUI');
const bvcovia = document.getElementById('bvcovia');
const bvcoviaText = document.querySelector('.bvcovia_text');
const money = document.querySelector('.money');
const fame = document.querySelector('.fame');

const singingMoney = [1, 50];
const concertMoney = [5000, 10000];

const audio = new Audio('./assets/sounds/audio.mp3');
audio.volume = .3;
const crowd = new Audio('./assets/sounds/crowd.mp3');
crowd.volume = .3;

let MONEY_VAL = 0;
let FAME_VAL = 0;

let isSinging = false;

function toggleBackdrop() {
    backdrop.classList.toggle('display-block');
    shopUI.classList.remove('display-block');
    statsUI.classList.remove('display-block');
}

function updateMoney () {
    money.textContent = MONEY_VAL;
}

function updateFame () {
    fame.textContent = FAME_VAL;
}

function sing () {
    const rndNum = Math.trunc(Math.random() * (singingMoney[1] - singingMoney[0]) + singingMoney[0])
    audio.play();
    bvcovia.style.cursor = 'not-allowed';
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        MONEY_VAL += rndNum;
        updateMoney();
        FAME_VAL += 1;
        updateFame();
        isSinging = false;
        bvcovia.style.cursor = 'pointer';
        bvcoviaText.textContent = rndNum;
        bvcoviaText.classList.add('display-block');
        setTimeout(() => {
            bvcoviaText.classList.remove('display-block');
        }, 300)
    },
    500
    )
}

bvcovia.addEventListener('click', () => {
    if (isSinging == false) {
        isSinging = true
        sing();
    } else {
        return;
    }
})

backdrop.addEventListener('click', toggleBackdrop);

shopBtn.addEventListener('click', () => {
    toggleBackdrop();
    shopUI.classList.add('display-block');
})

statsBtn.addEventListener('click', () => {
    toggleBackdrop();
    statsUI.classList.add('display-block');
})