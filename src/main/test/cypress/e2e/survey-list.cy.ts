/// <reference types="cypress" />

import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/surveys/

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')

const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

describe('#SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()

    cy.visit('http://localhost:3000')
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()

    cy.visit('http://localhost:3000')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    const { name } = Helper.getLocalStorageItem('account')

    mockUnexpectedError()

    cy.visit('http://localhost:3000')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    mockUnexpectedError()

    cy.visit('http://localhost:3000')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})
