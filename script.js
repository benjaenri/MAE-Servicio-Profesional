/* ==========================================================
   MENU HAMBURGUESA
========================================================== */

const menuBtn = document.getElementById("menuBtn");
const menuMobile = document.getElementById("menuMobile");

menuBtn.addEventListener("click", () => {

    menuMobile.classList.toggle("active");

});


/* ==========================================================
   CAMBIO COLOR HEADER
========================================================== */

const header = document.querySelector(".encabezado");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ==========================================================
   CARRUSELES
========================================================== */

/* ==========================================================
   CARRUSELES
========================================================== */

const carouseles = document.querySelectorAll(".carousel");

carouseles.forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");

    const slides = carousel.querySelectorAll(".slide");

    const prev = carousel.querySelector(".prev");

    const next = carousel.querySelector(".next");

    const dots =
        carousel.parentElement.querySelectorAll(".dot");

    let indice = 0;


    function actualizarCarrusel() {

        track.style.transform =
            `translateX(-${indice * 100}%)`;

        dots.forEach((dot) => {

            dot.classList.remove("activo");

        });

        if (dots[indice]) {

            dots[indice].classList.add("activo");

        }

    }


    function siguiente() {

        indice++;

        if (indice >= slides.length) {

            indice = 0;

        }

        actualizarCarrusel();

    }


    function anterior() {

        indice--;

        if (indice < 0) {

            indice = slides.length - 1;

        }

        actualizarCarrusel();

    }


    next.addEventListener("click", () => {

        siguiente();

    });


    prev.addEventListener("click", () => {

        anterior();

    });


    dots.forEach((dot, i) => {

        dot.addEventListener("click", () => {

            indice = i;

            actualizarCarrusel();

        });

    });


    actualizarCarrusel();

});

;/* ==========================================================
   LIGHTBOX
========================================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const cerrarLightbox =
document.getElementById("cerrarLightbox");

let imagenesActuales = [];

let imagenActual = 0;

document.querySelectorAll(".carousel").forEach(carousel=>{

    const imagenes =
    carousel.querySelectorAll(".slide");

    imagenes.forEach((img,index)=>{

        img.addEventListener("click",()=>{

            imagenesActuales=[...imagenes];

            imagenActual=index;

            mostrarImagen();

            lightbox.classList.add("activo");

        });

    });

});

function mostrarImagen(){

    lightboxImg.src =
    imagenesActuales[imagenActual].src;

}

cerrarLightbox.onclick=()=>{

    lightbox.classList.remove("activo");

}

document
.getElementById("lightboxPrev")
.onclick=()=>{

    imagenActual--;

    if(imagenActual<0){

        imagenActual=
        imagenesActuales.length-1;

    }

    mostrarImagen();

};

document
.getElementById("lightboxNext")
.onclick=()=>{

    imagenActual++;

    if(imagenActual>=imagenesActuales.length){

        imagenActual=0;

    }

    mostrarImagen();

};

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("activo");

    }

});/* ==========================================================
   TECLADO LIGHTBOX
========================================================== */

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("activo")) {
        return;
    }

    if (e.key === "Escape") {

        lightbox.classList.remove("activo");

    }

    if (e.key === "ArrowLeft") {

        imagenActual--;

        if (imagenActual < 0) {

            imagenActual = imagenesActuales.length - 1;

        }

        mostrarImagen();

    }

    if (e.key === "ArrowRight") {

        imagenActual++;

        if (imagenActual >= imagenesActuales.length) {

            imagenActual = 0;

        }

        mostrarImagen();

    }

});


/* ==========================================================
   ANIMACIÓN DE OBRAS AL HACER SCROLL
========================================================== */

const obras = document.querySelectorAll(".obra");

const observadorObras = new IntersectionObserver(

    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observadorObras.unobserve(entrada.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);

obras.forEach((obra) => {

    observadorObras.observe(obra);

});


/* ==========================================================
   SWIPE EN CELULAR
========================================================== */

document.querySelectorAll(".carousel").forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");

    const slides = carousel.querySelectorAll(".slide");

    const dots = carousel
        .parentElement
        .querySelectorAll(".dot");

    let inicioX = 0;

    let finX = 0;

    carousel.addEventListener(
        "touchstart",
        (e) => {

            inicioX = e.touches[0].clientX;

        },
        {
            passive: true
        }
    );

    carousel.addEventListener(
        "touchend",
        (e) => {

            finX = e.changedTouches[0].clientX;

            const distancia = inicioX - finX;

            if (Math.abs(distancia) < 50) {
                return;
            }

            let indiceActual = 0;

            dots.forEach((dot, indice) => {

                if (dot.classList.contains("activo")) {

                    indiceActual = indice;

                }

            });

            if (distancia > 0) {

                indiceActual++;

                if (indiceActual >= slides.length) {

                    indiceActual = 0;

                }

            } else {

                indiceActual--;

                if (indiceActual < 0) {

                    indiceActual = slides.length - 1;

                }

            }

            track.style.transform =
                `translateX(-${indiceActual * 100}%)`;

            dots.forEach((dot) => {

                dot.classList.remove("activo");

            });

            dots[indiceActual].classList.add("activo");

        },
        {
            passive: true
        }
    );

});


/* ==========================================================
   CERRAR MENÚ MOBILE AL TOCAR UN LINK
========================================================== */

document
    .querySelectorAll(".menu-mobile a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            menuMobile.classList.remove("active");

        });

    });