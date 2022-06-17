/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'

describe('#SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { 
      accessToken: faker.datatype.uuid(), 
      name: faker.name.findName() 
    })
  })

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()

    cy.visit('http://localhost:3000')

    cy.getByTestId('error').should(
      'contain.text', 
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()

    cy.visit('http://localhost:3000')

    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    const { name } = Helper.getLocalStorageItem('account')
    
    Http.mockUnexpectedError()

    cy.visit('http://localhost:3000')

    cy.getByTestId('username').should('contain.text', name)
  })
})
