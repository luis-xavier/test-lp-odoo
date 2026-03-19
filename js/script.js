//Despliegue de menú de hamburguesa
const anvorguesa = document.getElementById('menu_anvorguesa');
const menu = document.getElementById('menu_main');
const mquery = window.matchMedia("(max-width: 992px)").matches;

function abrirCerrarAnvorguesa() {
    anvorguesa.classList.toggle('cross');
    menu.classList.toggle('open');
    document.body.classList.toggle("stop-scrolling")
    let overlay = document.getElementsByClassName('overlay-menu')[0];
    overlay.classList.toggle('visible');
};
function validaViewport() {

}
validaViewport();

anvorguesa.addEventListener('click', function () {
    abrirCerrarAnvorguesa();
});

let menuItems = menu.querySelectorAll('a');
let scrollItems = Array.from(menuItems).map((item) => {
    const hash = item.getAttribute('href').split('#')[1];
    return document.getElementById(hash);
}).filter(Boolean);
//Variable para sube y baja el menú según dirección de scroll
let prevScrollpos1 = 0;

window.addEventListener('scroll', function () {
    //Sube y baja el menú según dirección de scroll
    let currentScrollPos = window.pageYOffset;
    let navbar = document.getElementById("navbar");
    if (prevScrollpos1 > currentScrollPos) {
        navbar.style.top = "0";
        prevScrollpos1 = currentScrollPos;
    } else if (currentScrollPos > 10 && prevScrollpos1 < currentScrollPos) {
        navbar.style.top = "-120px";
        prevScrollpos1 = currentScrollPos;
    }
    if (currentScrollPos > 200) {
        navbar.classList.add('sup');
    } else {
        navbar.classList.remove('sup');
    }
    //Finaliza Sube y baja el menú según dirección de scroll

    const fromTop = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    let activeItem = null;
    let smallestDistance = Infinity; // Para encontrar el elemento más cercano al top

    // Buscar el elemento más cercano al top del viewport
    Array.from(scrollItems).forEach(item => {
        const rect = item.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // Verificar si el elemento está visible en el viewport
        const isVisible = (
            (elementTop >= 0 && elementTop <= viewportHeight) || // Parte superior visible
            (elementBottom >= 0 && elementBottom <= viewportHeight) || // Parte inferior visible
            (elementTop < 0 && elementBottom > viewportHeight) // Elemento más grande que el viewport
        );

        // Si el elemento está visible, calcular su distancia al top del viewport
        if (isVisible) {
            const distanceToTop = Math.abs(elementTop);
            if (distanceToTop < smallestDistance) {
                smallestDistance = distanceToTop;
                activeItem = item;
            }
        }
    });
});

menuItems?.forEach((item) => {
    item.addEventListener('click', function (e) {
        const href = item.getAttribute('href');
        let offsetTop;

        if (href === '#') {
            offsetTop = 0;
        } else {
            const targetElement = document.querySelector(href);
            const targetPosition = targetElement.getBoundingClientRect().top;
            const scrollPosition = window.pageYOffset;
            offsetTop = targetPosition + scrollPosition;
        }

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        if (mquery) {
            abrirCerrarAnvorguesa();
        }

        e.preventDefault();
    });
});