/// <reference types="cypress" />

import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/surveys/


const mockLoadSuccess = (): void => Http.mockOk(path, 'GET', 'load-survey-result')

describe('#SurveyResult', () => {
  describe('#Load', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

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

      mockLoadSuccess()

      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
    })

    it('should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('http://localhost:3000/surveys/any_id')

      Helper.testUrl('/login')
    })

    it('Should present survey result', () => {
      mockLoadSuccess()
      cy.visit('http://localhost:3000/surveys/any_id')

      cy.getByTestId('question').should('have.text', 'Question')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', 'fev')
      cy.getByTestId('year').should('have.text', '2018')
      cy.get('li:nth-child(1)').then((li) => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '70%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
      cy.get('li:nth-child(2)').then((li) => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('should go to SurveyList on back button click ', () => {
      cy.visit('http://localhost:3000')
      mockLoadSuccess()
      cy.visit('http://localhost:3000/surveys/any_id')

      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })

  describe('#Save', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'PUT')

    beforeEach(() => {
      cy.fixture('account').then((account) => {
        Helper.setLocalStorageItem('account', account)
      })

      mockLoadSuccess()

      cy.visit('http://localhost:3000/surveys/any_id')
    })

    it('should present error on UnexpectedError', () => {
      mockUnexpectedError()

      cy.get('li:nth-child(2)').click()

      cy.getByTestId('error').should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )
    })
  })
})
