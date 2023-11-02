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
      cy.login({ username: user.username, password: user.password });
    });

    it('a blog can be created', function () {
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

    describe('And a blog exists', function () {
      let blog;

      beforeEach(function () {
        blog = {
          title: 'Example title',
          author: 'Example author',
          url: 'example.com',
          likes: Math.floor(Math.random() * 100),
        };
        cy.createBlog(blog);
      });

      it('a blog can be liked', function () {
        cy.contains(`${blog.title} ${blog.author}`).parent().as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').contains('likes').find('button').click();
        cy.get('@blog')
          .contains('likes')
          .should('include.text', blog.likes + 1);
      });
    });
  });
});
