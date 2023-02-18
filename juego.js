const $nuevoJuego = document.querySelector('#nuevo-juego');
$nuevoJuego.addEventListener('click', comenzarJuego);

const $reiniciarJuego = document.querySelector('#reiniciar');
$reiniciarJuego.addEventListener('click', reiniciarJuego);

const $tablero = document.querySelector('#tablero');
let $tiempo = document.querySelector('#tiempo-actual');
let $tiempoRecord = document.querySelector('#tiempo-record');
let $intentos = document.querySelector('#intentos');
const $grilla = document.querySelectorAll('.card')
const $felicitaciones = document.querySelector('#felicitaciones');
const $nuevoRecord = document.querySelector('#nuevo-record')
let segundos = 0;
let intentos = 0;
let interval;
let removerEventListeners = null;
let cantidadPares = 0;

function comenzarJuego(){
    if (removerEventListeners) {
        removerEventListeners();
    }
    esconderRecord();
    esconderFelicitaciones();
    cantidadPares = 0
    intentos++;
    $intentos.innerText = intentos;
    permitirInput();
    borrarAciertos();
    borrarIncorrectos();
    borrarImagenesAnteriores();
    mostrarEstadisticas();
    reiniciarTiempo();
    interval = setInterval(aumentarSegundos, 1000);

    let carasMezcladas =  cuadrosAleatorios();

    removerEventListeners = verificarSeleccionUsuario(carasMezcladas);
}

function reiniciarJuego(){
    $tiempoRecord.innerHTML = "";
    esconderFelicitaciones();
    ocultarEstadisticas();
    clearInterval(interval);
    segundos = 0;
    $tiempo.innerText = segundos;
    intentos = 0;
    $intentos.innerText = intentos;
    borrarImagenesAnteriores();
    borrarAciertos();
    borrarIncorrectos();
    bloquearInput();
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
];

function cuadrosAleatorios() {
    const carasCopia = caras.slice();
  
    for (let i = carasCopia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [carasCopia[i], carasCopia[j]] = [carasCopia[j], carasCopia[i]];
    }

    for (let i = caras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [caras[i], caras[j]] = [caras[j], caras[i]];
    }

    const mazosJuntados = caras.concat(carasCopia);

    for (let i = mazosJuntados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazosJuntados[i], mazosJuntados[j]] = [mazosJuntados[j], mazosJuntados[i]];
    }

    return mazosJuntados;
}

paresTotales = $grilla.length / 2

function verificarSeleccionUsuario(carasMezcladas) {
  let seleccionados = [];
  let listenerFunctions = [];

  $grilla.forEach(function (cuadrado, index) {
    const listener = function () {
      if (seleccionados.includes(index) || cuadrado.classList.contains('correcto')) {
        return;
      }

      const cara = carasMezcladas[index];
      cuadrado.innerHTML = `<img src="${cara.img}">`;

      seleccionados.push(index);

      if (seleccionados.length === 2) {
        const [index1, index2] = seleccionados;
        const cara1 = carasMezcladas[index1];
        const cara2 = carasMezcladas[index2];

        if (cara1.img === cara2.img) {
          $grilla[index1].classList.add('correcto');
          $grilla[index2].classList.add('correcto');
          cantidadPares++;
          if (cantidadPares === paresTotales) {
            felicitar();
            $felicitaciones.innerText = 'Felicitaciones! Has ganado.';
            detenerTiempo();
            if ($tiempoRecord.innerHTML === ""){
                $tiempoRecord.innerHTML = Number(segundos);
                mostrarRecord();
            }
            if (Number($tiempoRecord.innerHTML) > segundos){
                $tiempoRecord.innerHTML = Number(segundos);
                mostrarRecord();
            }
          }
        } else {
          $grilla[index1].classList.add('incorrecto');
          $grilla[index2].classList.add('incorrecto');
          bloquearInput();

          setTimeout(() => {
            $grilla[index1].classList.remove('incorrecto');
            $grilla[index2].classList.remove('incorrecto');
            $grilla[index1].innerHTML = '?';
            $grilla[index2].innerHTML = '?';
            permitirInput();
          }, 1000);
        }

        seleccionados = [];
      }
    };

    cuadrado.addEventListener('click', listener);
    listenerFunctions.push(listener);
  });


  return function removerEventListeners() {
    $grilla.forEach(function (cuadrado, index) {
      cuadrado.removeEventListener('click', listenerFunctions[index]);
    });
  };
}

function permitirInput(){
    $tablero.classList.remove('bloqueado');
}

function felicitar(){
    $felicitaciones.classList.remove('oculto');
}

function esconderFelicitaciones(){
    $felicitaciones.classList.add('oculto');
}

function esconderRecord(){
    $nuevoRecord.classList.add('oculto');
}

function mostrarRecord(){
    $nuevoRecord.classList.remove('oculto');
}

function bloquearInput(){
    $tablero.classList.add('bloqueado');
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

function detenerTiempo(){
    clearInterval(interval);
}

function borrarImagenesAnteriores(){
    $grilla.forEach(function(cuadrado){
        cuadrado.innerHTML = '?';
    })
}

function borrarIncorrectos(){
    $grilla.forEach(function(cuadrado){
        cuadrado.classList.remove('incorrecto');
    })
}

function borrarAciertos(){
    $grilla.forEach(function(cuadrado){
        cuadrado.classList.remove('correcto');
    })
}


function mostrarEstadisticas(){
    document.querySelector('#estadisticas').classList.remove("oculto");
}

function ocultarEstadisticas(){
    document.querySelector('#estadisticas').classList.add("oculto");
}