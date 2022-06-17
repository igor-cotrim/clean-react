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
})
