const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {  // Khi cuộn xuống 50px
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});






