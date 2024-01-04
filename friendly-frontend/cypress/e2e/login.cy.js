describe('The Login Page', () => {
    it('navigates to Register page when signup btn clicked', function(){
        cy.visit('/login')
        cy.get("[data-testid=signup-btn]").click()
        cy.get("[data-testid=register-page]")
    })
    
    it('set current user when logged in', function(){
        cy.visit('/login')
        cy.fixture('user')
        .then((user)=>{
            const email = user.email
            const password = user.password
            cy.get('[data-testid=email]').type(email)
            cy.get('[data-testid=password]').type(`${password}{enter}`)
        }).should(()=>{
            expect(localStorage.getItem("userData")).contains("username")
        })
    })
  })