describe('Bloglist app', () => {
  let user;

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    user = {
      name: 'Example User',
      username: 'example',
      password: 'example',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.get('form.login-form');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('form.login-form').as('loginForm');
      cy.get('@loginForm').find('#username').type(user.username);
      cy.get('@loginForm').find('#password').type(user.password);
      cy.get('@loginForm').find('#login-button').click();
      cy.contains(`${user.name} logged in`);
    });

    it('fails with wrong credentials', function () {
      cy.get('form.login-form').as('loginForm');
      cy.get('@loginForm').find('#username').type(user.username);
      cy.get('@loginForm').find('#password').type('wrong');
      cy.get('@loginForm').find('#login-button').click();
      cy.contains(`${user.name} logged in`).should('not.exist');
      cy.get('.notification.error').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });
});
