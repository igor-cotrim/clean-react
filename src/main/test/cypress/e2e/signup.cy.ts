/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

import * as FormHelper from '../support/form-helper'
import * as Http from '../support/signup-mocks'

const simuleteValidSubmit = (): void => {
  const password = faker.random.alphaNumeric(5)

  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
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

    FormHelper.testUrl('/signup')
  })

  it('should present unexpectedError on default error cases', () => {
    Http.mockUnexpectedError()

    simuleteValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    FormHelper.testUrl('/signup')
  })

  it('should present unexpectedError if invalid data is returned', () => {
    Http.mockInvalidData()

    simuleteValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    FormHelper.testUrl('/signup')
  })
})
