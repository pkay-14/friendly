describe('The Login Page flow', () => {
    it("checks 'signup' btn click", function(){
        cy.visit('/login')
        cy.get("[data-testid=signup-btn]")
        .click()
        .then(()=>{
            expect(cy.url().should('include', '/register'))
            expect(cy.get("[data-testid=register-page]").should('exist'))
        })
        
    })
    
    it('checks userData and redirection to HomeView when logged in', function(){
        cy.visit('/login')
        cy.fixture('users')
        .then((users)=>{
            const user = users.testUsers[0]
            const email = user.email
            const password = user.password
            cy.get('[data-testid=email]').type(email)
            cy.get('[data-testid=password]').type(`${password}{enter}`)
        }).should(()=>{
            expect(localStorage.getItem("userData")).contains("username")
        }).then(()=>{
            expect(cy.get('[data-testid=homeView]').should('exist'))
        })
    })
  })