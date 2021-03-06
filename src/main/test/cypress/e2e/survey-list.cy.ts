/// <reference types="cypress" />

import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/surveys/

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'survey-list')

describe('#SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
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

  it('should reload on button click', () => {
    mockUnexpectedError()

    cy.visit('http://localhost:3000')
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    mockSuccess()

    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
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

  it('Should present survey items', () => {
    mockSuccess()
    cy.visit('http://localhost:3000')

    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2022')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '20')
      assert.equal(li.find('[data-testid="month"]').text(), 'out')
      assert.equal(li.find('[data-testid="year"]').text(), '2022')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then((icon) => {
        assert.equal(
          li.find('[data-testid="icon"]').attr('src'),
          icon.thumbDown
        )
      })
    })
  })
})
