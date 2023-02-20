const URL = '127.0.0.1:8080'

context('Memotest', () => {

    before(() => {
        cy.visit(URL);
    });

    describe('Juega al memotest', () =>{
        const NUMERO_CUADROS = 16;

        it('Se asegura que haya un tablero con cuadros', () => {
            cy.get('#tablero').find('.card').should('have.length', NUMERO_CUADROS);
        });


        // Esta prueba será incorrecta en un promedio de 1 en cada 16 ejecuciones.
        it('Se asegura que los cuadros sean aleatorios', () => {
          cy.visit(URL);
        
          cy.get('#nuevo-juego').click();
        
          cy.get('#card-1').click().then(($card) => {
            cy.wrap($card).find('img').invoke('attr', 'src').then((seleccion1) => {
              cy.visit(URL);
              cy.get('#nuevo-juego').click();
        
              cy.get('#card-1').click().then(($card) => {
                cy.wrap($card).find('img').invoke('attr', 'src').then((seleccion2) => {
                  expect(seleccion1).not.to.equal(seleccion2);
                });
              });
            });
          });
        });

        it('Termina el juego y muestra felicitaciones', () => {
          cy.visit(URL);
        
          cy.get('#nuevo-juego').click();
          cy.get('.card').as('cards');
        
          cy.get('@cards').then((cards) => {
            for (let i = 0; i < cards.length; i++) {
              if (!Cypress.$(`#card-${i+1}`).hasClass('correcto')) {
                cy.get(`#card-${i+1}`).click();
                
                if (!Cypress.$(`#card-${i+1}`).hasClass('correcto')) {
                  cy.get('@cards').each((card, j) => {
                    if (i != j && !Cypress.$(card).hasClass('correcto')) {
                      cy.get(card).click();
                      cy.get(card).find('img').invoke('attr', 'src').then((src2) => {
                        cy.get(`#card-${i+1}`).click().find('img').invoke('attr', 'src').then((src1) => {
                          if (src1 === src2) {
                            cy.get(`#card-${j+1}`).should('have.class', 'correcto');
                          }
                        });
                      });
                    }
                  });
                }
              }
            }
          });
          cy.get('#felicitaciones').should('be.visible');
        });
        
    })
})

/*
it('Termina el juego', () => {
          cy.visit(URL);
          cy.get('#nuevo-juego').click();

          const cartas = Array.from(document.querySelectorAll('.card'))

          for(let i = 0; i < NUMERO_CUADROS; i++){
            let cartaActual = cy.get(`#card-${i+1}`)
            cartas.forEach(function (cartaActual, i){
              cartaActual.click().then((cartaActual) => {
                cy.wrap(cartaActual).find('img').invoke('attr, src').then((cartaActual) =>{
                  cy.get(cartas[i]).click().then(($segundaCarta) =>{
                    cy.wrap($segundaCarta).find('img').invoke('attr, src')

                    if (i === 0){
                      return;
                    }

                    if (cartaActual != $segundaCarta){
                      cy.wait(1000)
                      return;
                    }

                    if (cartaActual === $segundaCarta){
                      return;
                    }
                  })
                })
              });
            })
          }
          cy.get('#felicitaciones').should('be.visible');
        })
*/