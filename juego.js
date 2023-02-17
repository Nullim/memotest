const $tablero = document.querySelector('#tablero');

const $nuevoJuego = document.querySelector('#nuevo-juego');
$nuevoJuego.addEventListener('click', comenzarJuego);

const $reiniciarJuego = document.querySelector('#reiniciar');
$reiniciarJuego.addEventListener('click', reiniciarJuego);

let $tiempo = document.querySelector('#tiempo-actual');
let $tiempoRecord = document.querySelector('#tiempo-record');
let $intentos = document.querySelector('#intentos');

let segundos = 0;
let intentos = 0;
let interval;

function comenzarJuego(){
    intentos++;
    $intentos.innerText = intentos;
    mostrarEstadisticas();
    reiniciarTiempo();
    interval = setInterval(aumentarSegundos, 1000);
}

function aumentarSegundos(){
    segundos += 1;
    $tiempo.innerText = segundos;
}

function reiniciarTiempo(){
    clearInterval(interval);
    segundos = 0;
    $tiempo.innerText = segundos;
}

function reiniciarJuego(){
    ocultarEstadisticas();
    clearInterval(interval);
    segundos = 0;
    $tiempo.innerText = segundos;
    intentos = 0;
    $intentos.innerText = intentos;
}

function mostrarEstadisticas(){
    document.querySelector('#estadisticas').classList.remove("oculto");
}

function ocultarEstadisticas(){
    document.querySelector('#estadisticas').classList.add("oculto");
}
