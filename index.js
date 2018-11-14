// Navbar and Footer
$('.navbar').load('navbar.html');
$('footer').load('footer.html');

// Slider
var slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(index) {
    let i;
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.dot');

    if (index > slides.length) slideIndex = 1;
    else if (index < 1) slideIndex = slides.length;
    else slideIndex = index;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }

    slides[slideIndex - 1].style.display = "grid";
    dots[slideIndex - 1].className += " active";

    console.log(slideIndex);
}

// Burger Menu trigger
function burgerMenu() {
    document.querySelector('.mobile-menu').style.transform = "translateX(0)";
}

function closeBurgerMenu() {
    document.querySelector('.mobile-menu').style.transform = "translateX(-100vw)";
}
