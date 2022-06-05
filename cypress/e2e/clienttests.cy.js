/// <reference types="cypress" />


Cypress.on("uncaught:exception", (err, runnable) => 
  
   false
)

describe("showcase app", () => {
  beforeEach(() => {
    
    cy.visit("http://localhost:3000/")
  })

  it("should sign up, log in, and view project", () => {
    cy.viewport(1024, 768)

    cy.contains('Sign').click()
    
    cy.get('input[name="firstName"]')
      .type('Gus')
      .should('have.value', 'Gus');

      cy.get('input[name="lastName"]')
      .type('Cameron')
      .should('have.value', 'Cameron');

      cy.get('input[name="email"]')
      .type('gus@email.ie')
      .should('have.value', 'gus@email.ie');
      
    cy.get('input[name="password"]')
      .type('pass')
      .should('have.value', 'pass');

      cy.get('select').select('Client')
      

    cy.get('button[class="button is-link"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/');

    cy.contains('Client').click()

    cy.get('input[name="email"]')
      .type('gus@email.ie')
      .should('have.value', 'gus@email.ie');
    
    cy.get('input[name="password"]')
      .type('pass')
      .should('have.value', 'pass');

    cy.get('button[class="button is-link"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/clientdashboard');

    cy.get('a[class="ui icon button"]').first().click();

    cy.location('pathname', { timeout: 10000 }).should('contain', '/clientproject/');

  })

  it("should log in, view project, post review, and favourite", () => {
    cy.viewport(1024, 768)

    cy.contains('Client').click()

    cy.get('input[name="email"]')
      .type('gus@email.ie')
      .should('have.value', 'gus@email.ie');
    
    cy.get('input[name="password"]')
      .type('pass')
      .should('have.value', 'pass');

    cy.get('button[class="button is-link"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/clientdashboard');

    cy.get('a[class="ui icon button"]').first().click();

    cy.location('pathname', { timeout: 10000 }).should('contain', '/clientproject/');

    cy.get('input[name="reviewTitle"]')
      .type('Awesome project!')
      .should('have.value', 'Awesome project!');

      cy.get('input[name="comment"]')
      .type('How long did this take?')
      .should('have.value', 'How long did this take?');

      cy.get('select').select('5')

      cy.get('button[class="button is-primary"]').click();

      cy.contains('My Reviews').click()

      cy.location('pathname', { timeout: 10000 }).should('eq', '/reviews');

      cy.get('table[class="table is-fullwidth"]').find("tr").should("have.length", 2);

      cy.get('a[class="ui icon button"]').first().click();

      cy.get('a[class="button is-link"]').click();

      cy.contains('My Favourites').click()

      cy.location('pathname', { timeout: 10000 }).should('eq', '/favourites');

      cy.get('table[class="table is-fullwidth"]').find("tr").should("have.length", 2);

  })



})
