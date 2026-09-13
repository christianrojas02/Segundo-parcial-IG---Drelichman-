console.log("Sistema de luces");

let cantidad //guarda cuantas obras ingresa
let kmwHora // guarda cuanto consume una sola luz por hora
let costoKwh // guarda el precio de cada kwh

let arrayDeObras = []; //arranco un array vacio donde voy a guardar cada obra como objecto

// ahora capturo los elementos del DOM por el id
// campos y botones del primer formulario
let inputCantObras = document.querySelector("#cant-obras");
let inputConsumoHoras = document.querySelector("#consumo-horas");
let inputCostoKwh = document.querySelector("#costo-kwh");
let botonIniciar = document.querySelector("#btn-iniciar");
let fieldsetConfig = document.querySelector("#fieldset-configuracion");

// campos y botones del segundo formulario, carga individual de las obras
let fieldsetObras = document.querySelector("#fieldset-obras");
let inputNombreObra = document.querySelector("#nombre-obra");
let inputCantidadLuz = document.querySelector("#cantidad-luz");
let inputTiempoDia = document.querySelector("#tiempo-dia");
let botonAgregarObra = document.querySelector("#btn-agregar-obra");
let contadorTexto = document.querySelector("#contador");

// botones y contenedor de respuestas
let botonCalcular = document.querySelector("#btn-calcular");
let botonReiniciar = document.querySelector("#btn-reiniciar");
let salidaResultados = document.querySelector("#resultados");

// confirmacion de datos
botonIniciar.addEventListener("click", function (e) {
    e.preventDefault(); // para que no se recargue la pagina

    // entradas del primer formulario a numeros
    cantidad = Number(inputCantObras.value);
    kmwHora = Number(inputConsumoHoras.value);
    costoKwh = Number(inputCostoKwh.value);

    // validación de datos
    if (cantidad <= 0 || isNaN(cantidad)) {
        alert("Ingrese una cantidad válida de obras.");
        return;
    }

    if (kmwHora <= 0 || isNaN(kmwHora)) {
        alert("Ingrese un consumo por hora válido.");
        return;
    }

    if (costoKwh <= 0 || isNaN(costoKwh)) {
        alert("Ingrese un costo por kWh válido.");
        return;
    }
    
    // si es valida pasa, deshabilito la configuracion y habilito la carga de obras
    fieldsetConfig.disabled = true;
    fieldsetObras.disabled = false;

    contadorTexto.innerText = "Obras cargadas: 0 de " + cantidad; // contador actualizado
});

// boton para agregar cada obra al array vacio
botonAgregarObra.addEventListener("click", function(e) {
    e.preventDefault();

    let nombre = inputNombreObra.value;
    let luces = Number(inputCantidadLuz.value);
    let horas = Number(inputTiempoDia.value);

    // chequear si los datos son validos
    if (nombre == "") {
        alert("Ingrese un nombre válido");
        return;
    }
    if (luces <= 0 || isNaN(luces)) {
        alert("Ingrese una cantidad válida");
        return;
    }
    if (horas <= 0 || horas > 24 || isNaN(horas)) {
        alert("Ingrese una cantidad de horas válidas");
        return;
    }

    // armo el objeto con los datos requeridos para la obra 
    let objetoObra = {
        nombre: nombre,
        luces: luces,
        horas: horas
    };

    // guardo el objeto adentro de nuestro array global
    arrayDeObras.push(objetoObra);

    // se vacian los casilleros para la siguiente obra
    inputNombreObra.value = "";
    inputCantidadLuz.value = "";
    inputTiempoDia.value = "";

    // el contador se actualiza consultando el tamaño que tiene el array
    contadorTexto.innerText = "Obras cargadas: " + arrayDeObras.length + " de " + cantidad;

    // Si ya cargamos la cantidad estipulada, deshabilitamos la carga y activamos el botón de calcular
    if (arrayDeObras.length === cantidad) {
        fieldsetObras.disabled = true;
        botonCalcular.disabled = false;
    }
});

// parte final: calcular y mostrar resultados
botonCalcular.addEventListener("click", function(e) {
    e.preventDefault();

    let totalKwhDiario = 0; // acumulador para el consumo diario total
    let obraMayor = arrayDeObras[0]; // guardamos la primera obra como referencia
    let mas20 = 0; // contador para obras con mas de 20 luces

    // bucle para recorrer todo el array de las obras 
    for (let i = 0; i < arrayDeObras.length; i++) {
        
        //consumo de la obra actual = luces * horas * consumo diario
        let consumoObra = arrayDeObras[i].luces * arrayDeObras[i].horas * kmwHora;
        totalKwhDiario = totalKwhDiario + consumoObra;

        // comparo si la obra actual funciona mas horas que la mayor guardada
        if (arrayDeObras[i].horas > obraMayor.horas) {
            obraMayor = arrayDeObras[i];
        }

        // el contador aumenta si la obra tiene mas de 20 luces
        if (arrayDeObras[i].luces > 20) {
            mas20 = mas20 + 1;
        }
    }

    // operaciones para resolver las tres preguntas:
    let consumoPromedio = totalKwhDiario / cantidad;
    let consumoMayorObra = obraMayor.luces * obraMayor.horas * kmwHora;
    let costoDiarioMayorObra = consumoMayorObra * costoKwh;
    let porcentajeMas20 = (mas20 * 100) / cantidad;


    // se ponen las respuestas en el HTML concatenando texto con el operador de suma
    salidaResultados.innerHTML = 
        "<h3>Resultados del Análisis:</h3>" +
        "<p>1. Consumo diario total: " + totalKwhDiario + " kWh</p>" +
        "<p>Consumo diario promedio por obra: " + consumoPromedio + " kWh</p>" +
        "<p>2. Obra con mayor tiempo: " + obraMayor.nombre + " (" + obraMayor.horas + " hs/día)</p>" +
        "<p>Costo diario de esta obra: $" + costoDiarioMayorObra + "</p>" +
        "<p>3. Porcentaje de obras con más de 20 luces: " + porcentajeMas20 + "%</p>";

    // deshabilito el boton calcular y habilito el de reiniciar
    botonCalcular.disabled = true;
    botonReiniciar.disabled = false;
});

// reiniciar todo
botonReiniciar.addEventListener("click", function(e) {
    e.preventDefault();

    // se vacia el array para arrancar otra carga
    arrayDeObras = [];

    // los formularios tambien se vacian con reset
    document.querySelector("#form-configuracion").reset();
    document.querySelector("#ingresar-obras").reset();

    // se restauran la habilitacion inicial de los fieldsets y botones
    fieldsetConfig.disabled = false;
    fieldsetObras.disabled = true;
    botonCalcular.disabled = true;
    botonReiniciar.disabled = true;

    // se restaura el contador y se limpia la caja de respuestas
    contadorTexto.innerText = "Obras cargadas: 0";
    salidaResultados.innerHTML = "";
});