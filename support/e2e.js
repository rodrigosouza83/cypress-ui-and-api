// ***********************************************************
// Suporte global para testes E2E (UI e API)
// ***********************************************************

// Importar comandos customizados
require('./commands.js');

// Tratar falhas não capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  // retornar false evita que o Cypress falhe o teste
  return false;
});
