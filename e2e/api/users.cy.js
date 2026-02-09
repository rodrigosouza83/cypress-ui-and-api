/**
 * Exemplo de testes API - Usuários
 */
describe('API - Users', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');

  it('GET /users - deve listar usuários', () => {
    cy.request('GET', `${apiBaseUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.keys(
        'id',
        'name',
        'username',
        'email',
        'address',
        'phone',
        'website',
        'company'
      );
    });
  });

  it('GET /users/1 - deve retornar um usuário específico', () => {
    cy.request('GET', `${apiBaseUrl}/users/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body).to.have.property('email');
    });
  });
});
