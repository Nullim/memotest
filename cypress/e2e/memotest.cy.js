const URL = '127.0.0.1:8080'

function cardClicker(cards, currentIndex = 0){
  if (currentIndex === 16){
    return;
  }
  let currentCard = cards[currentIndex];
  let secondCounter = 1;
  while(!currentCard.classList.contains('correcto')){
    cy.get(currentCard).click();
    cy.get(cards[secondCounter]).click();
    currentCard = cards[currentIndex];
    secondCounter++;
    if (secondCounter === 16){
      break;
    }
  }
  cardClicker(cards, currentIndex + 1);
}

context('Memotest', () => {
    before(() => {
        cy.visit(URL);
        cy.clearCookies();
    });

    describe('Juega al memotest', () =>{
        const NUMERO_CUADROS = 16;

        it('Se asegura que haya un tablero con cuadros', () => {
            cy.get('#tablero').find('.card').should('have.length', NUMERO_CUADROS);
        });

        it('Se asegura que los cuadros sean aleatorios', () => {
          cy.visit(URL);
          cy.get('#nuevo-juego').click();
          const firstCard = cy.get('#card-1').click().find('img').invoke('attr', 'src');
          const secondCard = cy.get('#card-2').click().find('img').invoke('attr', 'src');

          cy.reload()
          cy.get('#nuevo-juego').click();
          const newFirstCard = cy.get('#card-1').click().find('img').invoke('attr', 'src');
          const newSecondCard = cy.get('#card-2').click().find('img').invoke('attr', 'src').then(() => {
            if (firstCard != newFirstCard){
              expect(firstCard).not.to.equal(newFirstCard)
            } else{
              expect(secondCard).not.to.equal(newSecondCard);
            }
          })
        });

        it('Termina el juego y muestra felicitaciones', () => {
          cy.visit(URL);
        
          cy.get('#nuevo-juego').click();
          cy.get('.card').as('cards');
        
          cy.get('@cards').then((cards) => {
            cardClicker(cards);
          });
          cy.get('#felicitaciones').should('be.visible');
        });

        it('Se asegura que no muestre estadisticas de jugador al reiniciar', () => {
          cy.visit(URL);
        
          cy.get('#nuevo-juego').click();

          cy.get('#reiniciar').click().then(() => {
            cy.get('#estadisticas').should('have.class', 'oculto');
          })
        })
    })
})
