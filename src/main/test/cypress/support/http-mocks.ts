import { faker } from '@faker-js/faker'

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.intercept(
    {
      method: 'POST',
      url
    },
    {
      statusCode: 401
    }
  ).as('request')
}

export const mockForbiddenError = (url: RegExp, method: string): void => {
  cy.intercept(
    {
      method: 'POST',
      url
    },
    {
      statusCode: 403
    }
  ).as('request')
}

export const mockServerError = (url: RegExp, method: string): void => {
  cy.intercept(
    {
      method,
      url
    },
    {
      statusCode: faker.helpers.arrayElement([400, 404, 500])
    }
  ).as('request')
}

export const mockOk = (url: RegExp, method: string, body: any): void => {
  cy.intercept(
    {
      method,
      url
    },
    {
      statusCode: 200,
      body
    }
  ).as('request')
}
