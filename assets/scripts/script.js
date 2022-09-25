const skull = document.getElementById('skull');
const cards = document.querySelectorAll('.card');
const leftCard = document.getElementById('card-left');
const circles = document.getElementsByClassName('circle');
const contentSection = document.querySelector('.content-section');

function moveCircles() {
    const sectionCenter = Math.trunc(contentSection.clientWidth / 2); 
    const offsetLeftCard = leftCard.getBoundingClientRect().right;

    const LEFT_DIFFERENCE = Math.trunc(sectionCenter - offsetLeftCard);

    for (let i = 0; i < circles.length; i++) {
        const element = circles[i];

        element.style.right = `-${LEFT_DIFFERENCE + 17}px`
    }
}

window.onload = moveCircles;

window.addEventListener('scroll', () => {
    const scrollY = Math.trunc(window.scrollY / 10);

    skull.style.transform = `translate(-50%, calc(-50% + ${scrollY}%))`
})

window.addEventListener('resize', moveCircles);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
            if (entry.isIntersecting) observer.unobserve(entry.target)
        })
    },
    {
        threshold: .2
    }
)

cards.forEach(card =>{
    observer.observe(card);
})