const $botonComenzar = document.querySelector('#comenzar');

let arregloConImagenes = ['a.jpg', 'a.jpg', 'b.jpg', 'b.jpg', 'c.jpg', 'c.jpg'];

let movimientos = 0;

$botonComenzar.onclick = function (event) {
    let nivel = document.querySelector('#nivel').value;

    if (nivel === 'Fácil') {
        juegaFacil();
        desactivarBoton();
        
        
    } else if (nivel === 'Intermedio') {
        juegaIntermedio();
        desactivarBoton();
    } else {
        juegaDificil();
        desactivarBoton();
    }

    event.preventDefault();
}

function desactivarBoton() {
    $botonComenzar.disabled = 'true';
}

function juegaFacil() {
    creaEstructura(3);
    desbloquearCartas();
}


let srcCarta1 = '';
let srcCarta2 = '';
let idCarta1 = '';
let idCarta2 = '';

function juegaUsuario(e) {

    let cartaSeleccionada = e.target;
    let idDeCartaSeleccionada = cartaSeleccionada.attributes.id.value;

    cartaSeleccionada.src = "img/" + arregloConImagenes[idDeCartaSeleccionada];

    movimientos++;

    if (movimientos === 1) {
        srcCarta1 = cartaSeleccionada.attributes.src.value;
        idCarta1 = cartaSeleccionada.attributes.id.value;
        document.getElementById(idCarta1).onclick = function(){};
        
    } else {
        srcCarta2 = cartaSeleccionada.attributes.src.value;
        idCarta2 = cartaSeleccionada.attributes.id.value;
        console.log('LA CARTA 2 es ' + srcCarta2);
        console.log('LA CARTA 1 es ' + srcCarta1);
        console.log(acierta(srcCarta1, srcCarta2));
        
        if (acierta(srcCarta1, srcCarta2)) {
            document.getElementById(idCarta1).onclick = function () {};
            document.getElementById(idCarta2).onclick = function () {};
            
            //document.getElementById(idCarta1).style = 'display:none'; DE ESTA MANERA NUNCA MAS SE LE PUEDE HACER CLICK
            //document.getElementById(idCarta2).style = 'display:none';
            
            movimientos = 0;
        } else {
            setTimeout(function(){
                document.getElementById(idCarta1).src = 'img/carta01.jpg';
                document.getElementById(idCarta2).src = 'img/carta01.jpg';
            }, 500);
            
            movimientos = 0; 
            desbloquearCartas();
        }    
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

        for (let i = 0; i < 2; i++) {
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
