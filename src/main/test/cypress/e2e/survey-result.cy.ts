/// <reference types="cypress" />

import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/surveys/

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'load-survey-result')

describe('#SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()

    cy.visit('http://localhost:3000/surveys/any_id')
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('should reload on button click', () => {
    mockUnexpectedError()

    cy.visit('http://localhost:3000/surveys/any_id')
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    mockSuccess()

    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()

    cy.visit('http://localhost:3000/surveys/any_id')
    Helper.testUrl('/login')
  })
})
