//Despliegue de menú de hamburguesa
let anvorguesa = document.getElementById('menu_anvorguesa');
let menumob = document.getElementById('menu_desk');
function abrirCerrarAnvorguesa() {
    anvorguesa.classList.toggle('cross');
    menumob.classList.toggle('open');
    document.body.classList.toggle("stop-scrolling")
    let overlay = document.getElementsByClassName('overlay-menu')[0];
    overlay.classList.toggle('visible');
};

anvorguesa.addEventListener('click', function () {
    abrirCerrarAnvorguesa();
});
