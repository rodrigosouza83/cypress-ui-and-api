/**
 * Exemplo de testes API - JSONPlaceholder (API pública para testes)
 * Adicione seus testes de API aqui
 */
describe('API - Posts', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');

  it('GET /posts - deve listar posts', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/posts`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.keys('userId', 'id', 'title', 'body');
    });
  });

  it('GET /posts/1 - deve retornar um post específico', () => {
    cy.request('GET', `${apiBaseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('body');
    });
  });

  it('POST /posts - deve criar um post', () => {
    const novoPost = {
      title: 'Título do teste',
      body: 'Corpo do post de teste',
      userId: 1,
    };

    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/posts`,
      body: novoPost,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq(novoPost.title);
      expect(response.body.body).to.eq(novoPost.body);
      expect(response.body.userId).to.eq(novoPost.userId);
      expect(response.body).to.have.property('id');
    });
  });
});
