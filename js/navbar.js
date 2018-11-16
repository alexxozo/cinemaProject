document.write(`
<nav>
    <i class= "fas fa-bars desktop-hidden burger" onclick = "burgerMenu()"></i>
    <h1 class="logo">CinemaCity</h1>
    <div class="mobile-hidden">
        <ul>
            <li><a href="index.html">Acasa</a></li>
            <li><a href="program.html">Program</a></li>
            <li class="dropdown">
                <a href="filme-noi.html">Filme</a>
                <div class="dropdown-content">
                    <a href="filme-noi.html">Filme Noi</a>
                    <a href="filme-vechi.html">Filme Vechi</a>
                </div>
            </li>
            <li><a href="spectacole.html">Spectacole</a></li>
            <li><a href="promotii.html">Promotii</a></li>
        </ul>
    </div>
</nav>

<nav class="mobile-menu">
    <span class="close-button" onclick="closeBurgerMenu()">X</span>
    <ul>
        <li><a href="index.html">Acasa</a></li>
        <li><a href="program.html">Program</a></li>
        <li class="dropdown">
            <a>Filme</a>
            <div class="dropdown-content">
                <a href="filme-noi.html">Filme Noi</a>
                <a href="filme-vechi.html">Filme Vechi</a>
            </div>
        </li>
        <li><a href="spectacole.html">Spectacole</a></li>
        <li><a href="promotii.html">Promotii</a></li>
    </ul>
</nav>
`);