const backdrop = document.querySelector('.backdrop');
const burgerMenu = document.querySelector('.burger-menu');
const links = document.querySelector('.links');
const bookArrow = document.getElementById('bookArrow');
const storyBook = document.getElementById('story-book');
const pages = document.querySelector('.pages');

const audio = new Audio('./assets/sounds/page flip.mp3')


let arrowWasPressed = false;
let isSoundPlaying = false;
let scrollPosition = 0;
let pagesPercentage = 0;


function removeBackdrop() {
    backdrop.classList.remove('display-block');
    links.classList.remove('display-flex');
    storyBook.classList.remove('display-block');
    document.body.style.overflow = 'visible';
    if (arrowWasPressed) {
        arrowWasPressed = false;
        window.scrollTo(0, scrollPosition);
        links.style.zIndex = 10000;
    }
}

backdrop.addEventListener('click', removeBackdrop)

burgerMenu.addEventListener('click', () => {
    backdrop.classList.add('display-block');
    links.classList.add('display-flex');
    backdrop.scrollIntoView();
    document.body.style.overflow = 'hidden';
})

links.addEventListener('click', event => {
    if (event.target.className == 'link') {
        removeBackdrop();
    }
})

bookArrow.addEventListener('click', () => {
    backdrop.classList.add('display-block');
    storyBook.classList.add('display-block');
    document.body.style.overflow = 'hidden';
    scrollPosition = window.scrollY;
    arrowWasPressed = true;
    backdrop.scrollIntoView();
    links.style.zIndex = 9998;
})

addEventListener('resize', () => {
    if (innerWidth >= 1000 ) {
        removeBackdrop();
    }
})

storyBook.addEventListener('click', event => {
    if(event.target.className == 'right-arrow' && !isSoundPlaying) {
        pagesPercentage -= 100;
        pages.style.transform = `translate(${pagesPercentage}%)`
        audio.play();
        isSoundPlaying = true;
        setTimeout(() => {
            isSoundPlaying = false;
        }, 1000);
    } else if(event.target.className == 'left-arrow' && !isSoundPlaying) {
        pagesPercentage +=100;
        pages.style.transform = `translate(${pagesPercentage}%)`
        audio.play();
    } else {
        return;
    }
})