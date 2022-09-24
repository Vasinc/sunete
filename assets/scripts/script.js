const skull = document.getElementById('skull');

window.addEventListener('scroll', () => {
    const scrollY = Math.trunc(window.scrollY / 10);

    skull.style.transform = `translate(-50%, calc(-50% + ${scrollY}%))`

    console.log(scrollY)
})