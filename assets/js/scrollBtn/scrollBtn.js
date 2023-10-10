var scrollBtn = document.querySelector('.scrollBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) { // Ajusta este valor según tus necesidades
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
