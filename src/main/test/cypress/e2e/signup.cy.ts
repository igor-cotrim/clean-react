/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

import * as FormHelper from '../support/form-helpers'
import * as Helper from '../support/helpers'
import * as Http from '../support/signup-mocks'

const populateFields = (): void => {
  const password = faker.random.alphaNumeric(5)

  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simuleteValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
  })

  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(2))
    FormHelper.testInputStatus('name', 'Valor inválido')

    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(5)

    cy.getByTestId('name').focus().type(faker.name.findName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()

    simuleteValidSubmit()

    FormHelper.testMainError('Esse e-mail já está em uso')

    Helper.testUrl('/signup')
  })

  it('should present unexpectedError on default error cases', () => {
    Http.mockUnexpectedError()

    simuleteValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    Helper.testUrl('/signup')
  })

  it('should present save account if valid credentials are provided', () => {
    Http.mockOk()

    simuleteValidSubmit()

    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')

    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('should present multiple submits', () => {
    Http.mockOk()

    populateFields()
    cy.getByTestId('submit').dblclick()

    Helper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    Http.mockOk()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helper.testHttpCallsCount(0)
  })
})
