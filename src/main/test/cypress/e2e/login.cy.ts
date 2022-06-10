/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simuleteValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present invalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()

    simuleteValidSubmit()

    FormHelper.testMainError('Credenciais inválidas')

    FormHelper.testUrl('/login')
  })

  it('should present unexpectedError on default error cases', () => {
    Http.mockUnexpectedError()

    simuleteValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    FormHelper.testUrl('/login')
  })

  it('should present unexpectedError if invalid data is returned', () => {
    Http.mockInvalidData()

    simuleteValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    FormHelper.testUrl('/login')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    Http.mockOk()

    simuleteValidSubmit()

    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')

    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('should present multiple submits', () => {
    Http.mockOk()

    populateFields()
    cy.getByTestId('submit').dblclick()

    FormHelper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    Http.mockOk()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    FormHelper.testHttpCallsCount(0)
  })
})
