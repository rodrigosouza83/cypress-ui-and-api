describe('UI - Visiting the website and checking the title', () => {
  beforeEach(() => {
    cy.visit('/roupas-fitness');
  });

  it('should load the website and check the URL', () => {
    cy.url().should('include', Cypress.config().baseUrl);
  });

  it('should check the title of the website', () => {
    cy.contains('Roupas Fitness').should('exist')
  });
});
