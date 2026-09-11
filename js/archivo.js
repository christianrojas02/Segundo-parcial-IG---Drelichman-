//  hago un array con todos los datos
let datosRandom = [
    "Rafael Lozano-Hemmer es un artista mexicano-canadiense especializado en instalaciones interactivas en espacios públicos.",
    "Su obra combina tecnología avanzada como sensores biométricos, robótica y datos en tiempo real.",
    "En su proyecto Vectorial Elevation, ciudadanos controlaban reflectores gigantes a través de internet.",
    "Pulse Room es una instalación que traduce los latidos cardíacos de los visitantes en pulsos de luz.",
    "Su trabajo explora la relación entre el cuerpo humano, la tecnología y la vigilancia.",
    "Ha expuesto sus obras en más de 70 países alrededor del mundo.",
    "Lozano-Hemmer estudió ingeniería antes de dedicarse al arte, lo que influye en su enfoque tecnológico.",
    "Sus instalaciones suelen involucrar la participación activa del público para activar la obra.",
    "Fue ganador del prestigioso premio Ars Electronica por su innovador uso de tecnología en arte.",
    "Utiliza la luz como lenguaje poético para explorar temas de identidad, memoria y presencia."
]

// capturo el párrafo y el botón
let textoDato = document.getElementById("dato-curioso");
let botonDato = document.getElementById("btn-dato");

// creo un contador que arranca en la posición 0
let posicion = 0;

function mostrarDato() {
    // la posición actual
    textoDato.innerText = datosRandom[posicion];

    // le sumo 1 a la posición para el próximo click
    posicion = posicion + 1;

    // si llegamos al final de la lista, volvemos al principio (0)
    if (posicion === datosRandom.length) {
        posicion = 0;
    }
}

botonDato.addEventListener("click", mostrarDato);