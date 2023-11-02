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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: user.username,
        password: user.password,
      }).then((response) => {
        localStorage.setItem(
          'loggedBloglistUser',
          JSON.stringify(response.body)
        );
        cy.visit('');
      });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('form.blog-form').as('blogForm');
      const blog = {
        title: 'Example title',
        author: 'Example author',
        url: 'example.com',
      };
      cy.get('@blogForm').contains('title').find('input').type(blog.title);
      cy.get('@blogForm').contains('author').find('input').type(blog.author);
      cy.get('@blogForm').contains('url').find('input').type(blog.url);
      cy.get('@blogForm').find('.submit-button').click();
      cy.contains(`${blog.title} ${blog.author}`);
    });
  });
});
