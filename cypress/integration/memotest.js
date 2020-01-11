const URL = '127.0.0.1:8080';
const NUMERO_CARTAS = 20;

context('memotest', () => {

    before(() => {
        cy.visit(URL);
    });

    describe('testea el juego', () => {
        
        it('se asegura que haya un tablero con cuadros', () => {
            cy.get('#cartas').find('img').should('have.length', NUMERO_CARTAS);
        });
        
        
    })



});
