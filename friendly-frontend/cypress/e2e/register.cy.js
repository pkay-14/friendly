describe('The Signup Page flow', () => {
    it("checks 'login' btn click", function(){
        cy.visit('/register')
        cy.get("[data-testid=login-btn]")
        .click()
        .then(()=>{
            expect(cy.url().should('include', '/login'))
            expect(cy.get("[data-testid=login-page]").should('exist'))
        })
        
    })
    
    it('checks userData and redirection to HomeView after succesfull page submit', function(){
        cy.visit('/register')
        cy.fixture('users')
        .then((users)=>{
            const user = users.newUsers[0]
            const {email, username, password} = user
            cy.get('[data-testid=email]').type(email)
            cy.get('[data-testid=username]').type(username)
            cy.get('[data-testid=password]').type(`${password}`)
            cy.get('[data-testid=passwordConfirm]').type(`${password}{enter}`)
        }).should(()=>{
            expect(localStorage.getItem("userData")).contains("username")
        }).then(()=>{
            expect(cy.get('[data-testid=homeView]').should('exist'))
        })
    })
  })