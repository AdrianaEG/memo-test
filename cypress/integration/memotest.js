const URL = '127.0.0.1:8080';
const NUMERO_CARTAS = 20;

context('memotest', () => {

    before(() => {
        cy.visit(URL);
    });

    describe('testea el juego', () => {

        it('se asegura que haya un tablero con cuadros', () => {
            cy.get('#comenzar').click();
            cy.get('#cartas').find('img').should('have.length', NUMERO_CARTAS);
        });

        it('se asegura que las cartas sean aleatorias', () => {
            let clasesOriginales = [];
            cy.get('img').then((imagenes) => {
                imagenes.each(function (i, imagen) {
                    clasesOriginales.push(imagen.className);
                });
            });

            cy.visit(URL);

            cy.get('#comenzar').click();
            let clasesNuevas = [];
            cy.get('img').then((nuevasImagenes) => {
                nuevasImagenes.each(function (i, imagen) {
                    clasesNuevas.push(imagen.className);
                });
            });

            cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas);

        });

    });

    describe('resuelve el juego', () => {
        let mapaDePares, listaDePares;

        before(() => {
            cy.clock();
        });
        
        it('elige una combinacion erronea', () => {
            cy.get('img').then(imagenes => {
                mapaDePares = obtenerParesDeImagenes(imagenes);
                listaDePares = Object.values(mapaDePares);

                console.log(listaDePares);

                cy.get(listaDePares[0][0]).click();
                cy.get(listaDePares[1][0]).click();

                cy.get('img').should('have.length', NUMERO_CARTAS);
            });
        });

        it('resuelve el juego', () => {

            cy.get('img').should('have.length', NUMERO_CARTAS);

            listaDePares.forEach((par) => {
                cy.tick(1000);
                cy.get(par[0]).click();
                cy.get(par[1]).click();
            });

            cy.get('img').should('have.length', 0);

            cy.get('#estado').contains('GANASTE!!! Hace click en comenzar para empezar de nuevo :)');

        });

    });

});

function obtenerParesDeImagenes(imagenes) {
    const pares = {};

    imagenes.each((i, imagen) => {
        const claseImagen = imagen.className.replace('img-fluid fondo-imagenes ', '');

        if (pares[claseImagen]) {
            pares[claseImagen].push(imagen);
        } else {
            pares[claseImagen] = [imagen];
        }
    });

    //console.log(pares);
    return pares;
}
