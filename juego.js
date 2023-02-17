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

    ponerImagenEnGrilla(cuadrosAleatorios());
}

const caras = [
    {id: "card-1", name: 'card1', img: 'img/cara-1.jpg'},
    {id: "card-2", name: 'card2', img: 'img/cara-2.jpg'},
    {id: "card-3", name: 'card3', img: 'img/cara-3.jpg'},
    {id: "card-4", name: 'card4', img: 'img/cara-4.jpg'},
    {id: "card-5", name: 'card5', img: 'img/cara-5.jpg'},
    {id: "card-6", name: 'card6', img: 'img/cara-6.jpg'},
    {id: "card-7", name: 'card7', img: 'img/cara-7.jpg'},
    {id: "card-8", name: 'card8', img: 'img/cara-8.jpg'},
    {id: "card-9", name: 'card9', img: 'img/cara-a.jpg'},
    {id: "card-10", name: 'card10', img: 'img/cara-b.jpg'},
    {id: "card-11", name: 'card11', img: 'img/cara-c.jpg'},
    {id: "card-12", name: 'card12', img: 'img/cara-d.jpg'},
    {id: "card-13", name: 'card13', img: 'img/cara-e.jpg'},
    {id: "card-14", name: 'card14', img: 'img/cara-f.jpg'},
    {id: "card-15", name: 'card15', img: 'img/cara-g.jpg'},
    {id: "card-16", name: 'card16', img: 'img/cara-h.jpg'},
];

function cuadrosAleatorios(){
    const randomArray = caras.slice();
    for (let i = randomArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    return randomArray;
}

function ponerImagenEnGrilla(cuadrosAleatorios){
    const grilla = document.querySelectorAll('.card')
    
    grilla.forEach(function(cuadrado, index){
        cuadrado.addEventListener('click', function(){
            const cara = cuadrosAleatorios[index];

            cuadrado.innerHTML = `<img src="${cara.img}">`
        })
    })
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