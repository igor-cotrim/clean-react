/// <reference types="cypress" />

import * as Helper from '../support/helpers'

describe('#Private Routes', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('http://localhost:3000')

    Helper.testUrl('/login')
  });
})
