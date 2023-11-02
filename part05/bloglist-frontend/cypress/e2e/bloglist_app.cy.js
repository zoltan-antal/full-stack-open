describe('Bloglist app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.get('form.login-form');
  });
});
