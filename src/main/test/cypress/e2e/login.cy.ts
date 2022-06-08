describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })
})
