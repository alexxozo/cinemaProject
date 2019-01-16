// Burger Menu trigger
function burgerMenu() {
    document.querySelector('.mobile-menu').style.transform = "translateX(0)";
}

function closeBurgerMenu() {
    document.querySelector('.mobile-menu').style.transform = "translateX(-100vw)";
}

// Cookie 
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}