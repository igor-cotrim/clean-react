/// <reference types="cypress" />

const baseUrl: string = 'http://localhost:3000'

describe('Login', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type('Igor')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('password').focus().type('123')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type('igorxuxicotrim@gmail.com')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus().type('12345')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').focus().type('igorxuxicotrim@gmail.com')
    cy.getByTestId('password').focus().type('igor12345')
    cy.getByTestId('submit').click()
    
    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.getByTestId('email').focus().type('mango@gmail.com')
    cy.getByTestId('password').focus().type('12345')
    cy.getByTestId('submit').click()
    
    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
    
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
