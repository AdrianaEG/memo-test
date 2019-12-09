const $botonComenzar = document.querySelector('#comenzar');

$botonComenzar.onclick = function (event) {
    let nivel = document.querySelector('#nivel').value;

    if (nivel === 'Fácil') {
        juegaFacil();
        desactivarBoton();
    } else if (nivel === 'Intermedio') {
        juegaIntermedio();
    } else {
        juegaDificil();
    }

    event.preventDefault();
}

function desactivarBoton(){
    $botonComenzar.disabled = 'true';
}

function juegaFacil() {
    creaEstructura(3);
}

function juegaIntermedio() {
    creaEstructura(6);
}

function juegaDificil() {
    creaEstructura(9);
}

function creaEstructura(filas) {

    let tablero = document.querySelector('#cartas');
    for (let j = 0; j < filas; j++) {
        let nuevoContenedor = document.createElement('div');
        nuevoContenedor.className = 'row';

        tablero.appendChild(nuevoContenedor);

        for (let i = 0; i < 3; i++) {
            let nuevoCuadro = document.createElement('div');
            nuevoCuadro.className = 'col-sm';
            nuevoContenedor.appendChild(nuevoCuadro);

            let nuevaImagen = document.createElement('img');
            nuevaImagen.className = 'img-fluid';
            nuevaImagen.src = "img/carta01.jpg";

            nuevoCuadro.appendChild(nuevaImagen);
        }
    }
}
