const $botonComenzar = document.querySelector('#comenzar');
let arregloConImagenes = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h', 'o', 'o', 'p', 'p'];
let movimientos = 0; //movimientos en cada vuelta 
let aciertos;
let movimientosTotales = 0;  
let n; //variable auxiliar utilizada para contar los segundos
let contadorTiempo;

$botonComenzar.onclick = function (event) {

    reiniciar();
    creaEstructura(4);
    desbloquearCartas();
    
    event.preventDefault();
}

function reiniciar() {
    aciertos = 0;
    movimientosTotales = 0;
    eliminarColoresGanador();
    setearMensajes();
    reiniciarTiempo();
    limpiarTablero();
    mezclarImagenes();
}

function eliminarColoresGanador() {
    let contenedoresVerdes = document.querySelectorAll('.alert-success');
    if (contenedoresVerdes !== null) {
        contenedoresVerdes.forEach(function ($contenedor) {
            $contenedor.classList.remove('alert-success');
            $contenedor.classList.add('alert-primary');
        });
    }
}

function setearMensajes() {
    document.querySelector('#contador-movimientos').innerText = 'Cantidad de intentos: ';
    document.querySelector('#estado').innerText = 'A jugar!';
}

function reiniciarTiempo() {
    clearInterval(contadorTiempo);
    n = 0;
    contadorTiempo = setInterval(function () {
        document.querySelector('#visor-tiempo').innerText = 'Tiempo de juego: ' + n;
        n++;
    }, 1000);
}

function limpiarTablero() {
    document.querySelector('#cartas').innerText = '';
}

function mezclarImagenes() {
    let aleatorio = 0;
    let auxiliar = 0;
    for (let i = 0; i < arregloConImagenes.length; i++) {
        aleatorio = Math.floor(Math.random() * (arregloConImagenes.length));
        auxiliar = arregloConImagenes[aleatorio];

        arregloConImagenes.splice(aleatorio, 1);
        arregloConImagenes.push(auxiliar);
    }
    return arregloConImagenes;
}

function creaEstructura(filas) {
    let numeroCarta = 0;
    let tablero = document.querySelector('#cartas');
    for (let j = 0; j < filas; j++) {
        let nuevoContenedor = document.createElement('div');
        //nuevoContenedor.className = 'row row-cols-5';
        nuevoContenedor.className = 'row';

        tablero.appendChild(nuevoContenedor);

        for (let i = 0; i < 5; i++) {
            let nuevoCuadro = document.createElement('div');
            nuevoCuadro.className = 'col';
            nuevoContenedor.appendChild(nuevoCuadro);

            let nuevaImagen = document.createElement('img');
            nuevaImagen.className = 'img-fluid fondo-imagenes';
            nuevaImagen.classList.add(arregloConImagenes[numeroCarta]);//esta clase a, b, c... etc No hace absolutamente nada pero me sirve para hacer el test. 
            nuevaImagen.src = "img/imagen00.gif";
            nuevaImagen.id = numeroCarta;

            nuevoCuadro.appendChild(nuevaImagen);
            numeroCarta++;
        }
    }
}

function desbloquearCartas() {
    document.querySelectorAll('img').forEach(function ($carta) {
        $carta.onclick = juegaUsuario;
    });
}

let srcCarta1 = '';
let srcCarta2 = '';
let idCarta1 = '';
let idCarta2 = '';

function juegaUsuario(e) {

    let cartaSeleccionada = e.target;
    let idDeCartaSeleccionada = cartaSeleccionada.attributes.id.value;

    darEfectoAlGirar(cartaSeleccionada);
    quitarEfecto(cartaSeleccionada);
    mostrarReversoCarta(cartaSeleccionada, idDeCartaSeleccionada);
    movimientos++;

    if (movimientos === 1) {
        srcCarta1 = cartaSeleccionada.attributes.src.value;
        idCarta1 = cartaSeleccionada.attributes.id.value;
        document.getElementById(idCarta1).onclick = function () {};

    } else { //ya seleccionó dos cartas entonces:
        bloquearCartas();
        srcCarta2 = cartaSeleccionada.attributes.src.value;
        idCarta2 = cartaSeleccionada.attributes.id.value;

        movimientosTotales++;
        document.querySelector('#contador-movimientos').innerText = 'Cantidad de intentos: ' + movimientosTotales;

        if (acierta(srcCarta1, srcCarta2)) {
            //deshabilitarCartasAcertadas(idCarta1, idCarta2);
            eliminarCartas(idCarta1, idCarta2);
            aciertos++;
            movimientos = 0;
        } else {
            ocultarReversoCarta(idCarta1, idCarta2);
            movimientos = 0;
            setTimeout(function () {
                desbloquearCartas();
            }, 800)
        }
        setTimeout(function () {
            desbloquearCartas();
        }, 800);
    }
    
    if (esGanador()) {
        ganar();
    }
}

function eliminarCartas(id1, id2){
    setTimeout(function(){
        document.getElementById(id1).remove();
        document.getElementById(id2).remove();
    }, 800);
}

function darEfectoAlGirar(carta) {
    carta.style.transition = "all 0.7s ease";
    carta.style.transform = "rotateY(360deg)";
}

function quitarEfecto(carta) {
    setTimeout(function () {
        carta.style.transition = '';
        carta.style.transform = '';
    }, 800);
}

function mostrarReversoCarta(carta, id) {
    carta.src = "img/" + arregloConImagenes[id] + ".jpg";
}

function bloquearCartas() {
    document.querySelectorAll('img').forEach(function ($imagen) {
        $imagen.onclick = function () {

        };
    });
}

function acierta(src1, src2) {
    if (src1 !== src2) {
        return false;
    } else {
        return true;
    }
}

function deshabilitarCartasAcertadas(id1, id2) {
    setTimeout(function () {
        document.getElementById(id1).style = 'pointer-events: none';
        document.getElementById(id2).style = 'pointer-events: none';
    }, 800);
}

function ocultarReversoCarta(id1, id2) {
    setTimeout(function () {
        document.getElementById(id1).src = 'img/imagen00.gif';
        document.getElementById(id2).src = 'img/imagen00.gif';
    }, 800);
}

function esGanador() {
    if (aciertos === ((arregloConImagenes.length) / 2)) {
        return true;
    } else {
        return false;
    }
}

function ganar() {

    clearInterval(contadorTiempo);//detener tiempo
    cambiarColoresMensajes();
    crearMensajesGanador();
}

function cambiarColoresMensajes(){
    let contenedores = document.querySelectorAll('.alert-primary');
    contenedores.forEach(function ($contenedor) {
        $contenedor.classList.remove('alert-primary');
        $contenedor.classList.add('alert-success');
    });
}

function crearMensajesGanador() {
    document.querySelector('#estado').innerText = 'GANASTE!!! Hace click en comenzar para empezar de nuevo :)';
}
