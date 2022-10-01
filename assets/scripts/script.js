const backdrop = document.querySelector('.backdrop');
const burgerMenu = document.querySelector('.burger-menu');
const links = document.querySelector('.links');

function removeBackdrop() {
    backdrop.classList.remove('display-block');
    links.classList.remove('display-flex');
    document.body.style.overflow = 'visible';
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

addEventListener('resize', () => {
    if (innerWidth >= 1000 ) {
        removeBackdrop();
    }
})