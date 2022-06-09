/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

const baseUrl: string = 'http://localhost:3000'

describe('Login', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-wrapper').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório')

    cy.getByTestId('password-wrapper').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-wrapper').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-wrapper').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-wrapper').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-wrapper').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present invalidCredentialsError on 401', () => {
    cy.intercept({
      method: 'POST',
      url: /login/,
    }, {
      statusCode: 401
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present unexpectedError on 400 or 404 or 500', () => {
    cy.intercept({
      method: 'POST',
      url: /login/,
    }, {
      statusCode: 400 || 404 || 500
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present unexpectedError if invalid data is returned', () => {
    cy.intercept({
      method: 'POST',
      url: /login/,
    }, {
      statusCode: 200,
      body: {
        invalidProperty: faker.datatype.uuid()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')
    
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.intercept({
      method: 'POST',
      url: /login/,
    }, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
  
  it('should present multiple submits', () => {
    cy.intercept({
      method: 'POST',
      url: /login/,
    }, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if form is invalid', () => {
    cy.intercept({
      method: 'POST',
      url: /login/,
    }, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    
    cy.get('@request.all').should('have.length', 0)
  })
})
