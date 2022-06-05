/// <reference types="cypress" />


Cypress.on("uncaught:exception", (err, runnable) => 
  
   false
)

describe("showcase app", () => {
  beforeEach(() => {
    
    cy.visit("http://localhost:3000/")
  })

  it("should fill signup vendor details, redirect to vendor dashboard, and logout", () => {
    cy.viewport(1024, 768)
    
    cy.contains('Sign').click()
    
    cy.get('input[name="firstName"]')
      .type('Andrew')
      .should('have.value', 'Andrew');

      cy.get('input[name="lastName"]')
      .type('Cameron')
      .should('have.value', 'Cameron');

      cy.get('input[name="email"]')
      .type('andrew@email.ie')
      .should('have.value', 'andrew@email.ie');
      
    cy.get('input[name="password"]')
      .type('pass')
      .should('have.value', 'pass');

      cy.get('select').select('Vendor')
      

    cy.get('button[class="button is-link"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/');

    cy.contains('Vendor').click()

    cy.get('input[name="email"]')
      .type('andrew@email.ie')
      .should('have.value', 'andrew@email.ie');
    
    cy.get('input[name="password"]')
      .type('pass')
      .should('have.value', 'pass');

    cy.get('button[class="button is-link"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/dashboard');

    cy.contains('Logout').click()

    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    
    
  })


})
