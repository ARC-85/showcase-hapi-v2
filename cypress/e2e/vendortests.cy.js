/// <reference types="cypress" />


Cypress.on("uncaught:exception", (err, runnable) => 
  
   false
)

describe("showcase app", () => {
  beforeEach(() => {
    
    cy.visit("http://localhost:3000/")
  })

  it("should sign in and create porfolio", () => {
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

    cy.get('input[name="title"]')
      .type('Luxury')
      .should('have.value', 'Luxury');

      cy.get('select').select('New Builds')

      cy.get('button[class="button is-link"]').click();
    
      cy.get('table[class="table is-fullwidth"]').find("tr").should("have.length", 2);
  })

  it("should sign in and create project", () => {
    cy.viewport(1024, 768)

    cy.contains('Vendor').click()

    cy.get('input[name="email"]')
      .type('andrew@email.ie')
      .should('have.value', 'andrew@email.ie');
    
    cy.get('input[name="password"]')
      .type('pass')
      .should('have.value', 'pass');

    cy.get('button[class="button is-link"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/dashboard');

    cy.get('i[class="fas fa-folder-open"]').parent().click();

    cy.get('input[name="projectTitle"]')
      .type('Country House')
      .should('have.value', 'Country House');

      cy.get('input[name="styleDescription"]')
      .type('Fancy')
      .should('have.value', 'Fancy');

      cy.get('input[name="latitude"]')
      .type('52')
      .should('have.value', '52');

      cy.get('input[name="longitude"]')
      .type('-9')
      .should('have.value', '-9');

      cy.get('input[name="areaSqM"]')
      .type('200')
      .should('have.value', '200');

      cy.get('input[name="priceEu"]')
      .type('400000')
      .should('have.value', '400000');

      cy.get('input[name="projectDescription"]')
      .type('A nice big house.')
      .should('have.value', 'A nice big house.');

      cy.get('select').select('Public')

      cy.get('button[class="button is-primary"]').click();
    
      cy.get('table[class="table is-fullwidth"]').find("tr").should("have.length", 2);
  })


})
