const $botonComenzar = document.querySelector('#comenzar');
let arregloConImagenes = ['a.jpg', 'a.jpg', 'b.jpg', 'b.jpg', 'c.jpg', 'c.jpg', 'd.jpg', 'd.jpg', 'e.jpg', 'e.jpg', 'f.jpg', 'f.jpg'];
let movimientos = 0;
let aciertos;
let movimientosTotales = 0;
let n;
let contadorTiempo;

$botonComenzar.onclick = function (event) {
    desactivarBoton();
    
    reiniciar();
    
    creaEstructura(3);
    desbloquearCartas();

    event.preventDefault();
}

function desactivarBoton() {
    $botonComenzar.disabled = 'true';
}

let srcCarta1 = '';
let srcCarta2 = '';
let idCarta1 = '';
let idCarta2 = '';

function juegaUsuario(e) {

    let cartaSeleccionada = e.target;
    let idDeCartaSeleccionada = cartaSeleccionada.attributes.id.value;
    
    cartaSeleccionada.style.transition = "all 0.7s ease" ;
    cartaSeleccionada.style.transform = "rotateY(360deg)";
    
    setTimeout(function(){
        cartaSeleccionada.style.transition = '';
        cartaSeleccionada.style.transform = '';
    }, 500);
    
    cartaSeleccionada.src = "img/" + arregloConImagenes[idDeCartaSeleccionada];

    movimientos++;

    if (movimientos === 1) {
        srcCarta1 = cartaSeleccionada.attributes.src.value;
        idCarta1 = cartaSeleccionada.attributes.id.value;
        document.getElementById(idCarta1).onclick = function () {};
        

    } else {
        bloquearCartas();
        srcCarta2 = cartaSeleccionada.attributes.src.value;
        idCarta2 = cartaSeleccionada.attributes.id.value;
        
        movimientosTotales++;

        if (acierta(srcCarta1, srcCarta2)) {

            document.getElementById(idCarta1).style = 'pointer-events: none';
            document.getElementById(idCarta2).style = 'pointer-events: none';

            aciertos++;

            movimientos = 0;
        } else {
            setTimeout(function () {
                document.getElementById(idCarta1).src = 'img/carta01.jpg';
                document.getElementById(idCarta2).src = 'img/carta01.jpg';
            }, 500);

            movimientos = 0;
            desbloquearCartas();
        }
    }

    if (esGanador()) {
        document.querySelector('#estado').innerText = 'GANASTE!!! Hace click en comenzar para empezar de nuevo :)';
        clearInterval(contadorTiempo);
        $botonComenzar.disabled = false;
    }
}

function juegaIntermedio() {
    creaEstructura(6);
}

function juegaDificil() {
    creaEstructura(9);
}

function creaEstructura(filas) {
    let numeroCarta = 0;
    let tablero = document.querySelector('#cartas');
    for (let j = 0; j < filas; j++) {
        let nuevoContenedor = document.createElement('div');
        nuevoContenedor.className = 'row';

        tablero.appendChild(nuevoContenedor);

        for (let i = 0; i < 4; i++) {
            let nuevoCuadro = document.createElement('div');
            nuevoCuadro.className = 'col-sm';
            nuevoContenedor.appendChild(nuevoCuadro);

            let nuevaImagen = document.createElement('img');
            nuevaImagen.className = 'fondo-imagenes';
            nuevaImagen.src = "img/carta01.jpg";
            nuevaImagen.id = numeroCarta;

            nuevoCuadro.appendChild(nuevaImagen);
            numeroCarta++;
        }
    }
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

console.log(mezclarImagenes());

function desbloquearCartas() {
    document.querySelectorAll('img').forEach(function ($carta) {
        $carta.onclick = juegaUsuario;
    });
}

function acierta(src1, src2) {
    if (src1 !== src2) {
        return false;
    } else {
        return true;
    }
}


function esGanador() {
    if (aciertos === ((arregloConImagenes.length) / 2)) {
        return true;
    } else {
        return false;
    }
}

function reiniciar(){
    document.querySelector('#estado').innerText = 'A jugar!';
    eliminarCartasExistentes();
    mezclarImagenes();
}

    document.querySelector('#cartas').innerText = '';
}

