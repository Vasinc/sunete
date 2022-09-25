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

// screen.orientation.lock("portrait")
// 	.then(function() {
// 		alert('Locked');
// 	})
// 	.catch(function(error) {
// 		alert(error);
// 	});

const audio = new Audio('./assets/sounds/audio.mp3');
audio.volume = .3;
const crowd = new Audio('./assets/sounds/crowd.mp3');
crowd.volume = .3;

let MONEY_VAL = 0;
let FAME_VAL = 0;
let fameMultiplier = 1;
let concertMultiplier = 500;

let isSinging = false;

function toggleBackdrop() {
    backdrop.classList.toggle('display-block');
    shopUI.classList.remove('display-block');
    statsUI.classList.remove('display-block');
}

function updateMoney () {
    money.textContent = MONEY_VAL;
}

updateMoney();

function updateFame () {
    fame.textContent = FAME_VAL;
}

function updateStats() {
    document.querySelector('.stat__min-money_sing').textContent = singingMoney[0];
    document.querySelector('.stat__max-money_sing').textContent = singingMoney[1];
    
    document.querySelector('.stat__min-money_concert').textContent = concertMoney[0];
    document.querySelector('.stat__max-money_concert').textContent = concertMoney[1];

    document.querySelector('.stat__fame-sign').textContent = fameMultiplier * 1;
    document.querySelector('.stat__fame-concert').textContent = concertMultiplier;
}

updateStats();

function sing () {
    const rndNum = Math.trunc(Math.random() * (singingMoney[1] - singingMoney[0]) + singingMoney[0])
    audio.play();
    bvcovia.style.cursor = 'not-allowed';
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        MONEY_VAL += rndNum;
        updateMoney();
        FAME_VAL += 1 * fameMultiplier;
        updateFame();
        isSinging = false;
        bvcovia.style.cursor = 'pointer';
        bvcoviaText.textContent = rndNum;
        bvcoviaText.classList.add('display-block');
        setTimeout(() => {
            bvcoviaText.classList.remove('display-block');
        }, 2000)
    },
    4500
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

shopBtn.addEventListener('click', (event) => {
    toggleBackdrop();
    shopUI.classList.add('display-block');
})

shopUI.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        let price = parseInt(event.target.textContent);
        let minLevel = parseInt(event.target.parentElement.querySelector('.min-level').textContent.trim());
        const maxLevel = parseInt(event.target.parentElement.querySelector('.max-level').textContent.trim());
        if (price <= MONEY_VAL && minLevel < maxLevel) {
            MONEY_VAL -= price;
            updateMoney();
            minLevel += 1;
            event.target.parentElement.querySelector('.min-level').textContent = minLevel;
            price = Math.trunc(price * 1.4)
            event.target.textContent = price;

            singingMoney[0] += 10;
            singingMoney[1] = Math.trunc(singingMoney[1] * 1.1);

            concertMoney[0] += 1000;
            concertMoney[1] += 1000;

            fameMultiplier += 50
            concertMultiplier += 500

            updateStats();
        }

        if (minLevel == maxLevel) {
            event.target.textContent = 'MAX';
            event.target.style.background = 'red'
            event.target.style.cursor = 'not-allowed'
        }
    } else {
        return;
    }
})

statsBtn.addEventListener('click', () => {
    toggleBackdrop();
    statsUI.classList.add('display-block');
})