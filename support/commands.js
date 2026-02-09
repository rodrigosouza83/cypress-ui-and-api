// ***********************************************
// Comandos customizados - use em qualquer teste
// ***********************************************

/**
 * Exemplo: cy.login('user', 'pass')
 */
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    // Implementar login conforme sua aplicação
    cy.visit('/login');
    cy.get('[data-cy=username]').type(username);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=submit]').click();
  });
});
