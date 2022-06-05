/// <reference types="cypress" />


Cypress.on("uncaught:exception", (err, runnable) => 
  
   false
)

describe("showcase app", () => {
  beforeEach(() => {
    
    cy.visit("http://localhost:3000/clientlogin")
  })

  it("should fill login details and redirect to client dashboard", () => {
    cy.get('input[name="email"]')
      .type('homer@simpson.com')
      .should('have.value', 'homer@simpson.com');
    
    cy.get('input[name="password"]')
      .type('secret')
      .should('have.value', 'secret');

    cy.get('button[class="button is-link"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/clientdashboard');
    
    
  })


})
