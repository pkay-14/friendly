describe('Homepage spec', () => {
  it('succesfully loads login as landing page', () => {
    cy.visit('/')
    cy.get("[data-testid=login-page]").should('exist')
  })
})