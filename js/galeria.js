// array con las obras
let obras = [
    { nombre: "Blow Up", 
      anio: 2007,
      imagen: "./img/obra01.jpg" 
    },
    { nombre: 
        "Navier-Stokes",
         anio: 2009,
         imagen: "./img/obra02.jpg"
    },
    { nombre: "Voice Array",
      anio: 2011, 
      imagen: "./img/obra03.jpg" 
    },
    { nombre: "Kristallstimmen", 
      anio: 2024,
      imagen: "./img/obra04.jpg" 
    },
    { nombre: "Surface Tension", 
      anio: 1992, 
      imagen: "./img/obra05.jpg" 
    }
];

// capturo los elementos del DOM por el id
let contenedor = document.getElementById("contenedor-galeria");
let btnVista = document.getElementById("btn-vista");

// cargo las obras directamente en el HTML con un bucle
for (let i = 0; i < obras.length; i++) {
    contenedor.innerHTML += 
        '<div class="imagen-obra">' +
            '<img src="' + obras[i].imagen + '" alt="' + obras[i].nombre + '">' +
            '<h3>' + obras[i].nombre + '</h3>' +
            '<p> Año: ' + obras[i].anio + '</p>' +
        '</div>';
}

// cambio el color al hacer click
let esModoOscuro = false;

btnVista.addEventListener("click", function() {
    let obrasEnPantalla = document.querySelectorAll(".imagen-obra");

    if (esModoOscuro === false) {
        // modo oscuro
        for (let i = 0; i < obrasEnPantalla.length; i++) {
            obrasEnPantalla[i].style.backgroundColor = "black";
            obrasEnPantalla[i].style.color = "white";
        }
        btnVista.innerText = "Modo claro";
        esModoOscuro = true;
    } else {
        // modo claro
        for (let i = 0; i < obrasEnPantalla.length; i++) {
            obrasEnPantalla[i].style.backgroundColor = "white";
            obrasEnPantalla[i].style.color = "black";
        }
        btnVista.innerText = "Modo oscuro";
        esModoOscuro = false;
    }
});