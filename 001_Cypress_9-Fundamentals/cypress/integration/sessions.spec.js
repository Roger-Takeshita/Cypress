/// <reference types="cypress"/>

describe('Sessions Page', () => {
    beforeEach(() => {
        cy.visit('/conference');
        cy.get('h1').contains('View Sessions').click();
        cy.url().should('include', '/sessions');

        // Aliases
        cy.get('[data-cy=AllSessions').as('AllSessionsBtn');
        cy.get('[data-cy=Wednesday').as('WednesdayBtn');
        cy.get('[data-cy=Thursday').as('ThursdayBtn');
        cy.get('[data-cy=Friday').as('FridayBtn');
    });

    it('Should navigate to conference sessions page and view day filter buttons', async () => {
        // Validate that buttons exist
        cy.get('@AllSessionsBtn');
        cy.get('@WednesdayBtn');
        cy.get('@ThursdayBtn');
        cy.get('@FridayBtn');
    });

    it('Should filter sessions and display only Friday sessions when Friday button is clicked', async () => {
        cy.get('@FridayBtn').click();

        // Assertions
        cy.get('[data-cy=day').contains('Wednesday').should('not.exist');
        cy.get('[data-cy=day').contains('Thursday').should('not.exist');
        cy.get('[data-cy=day').contains('Friday').should('be.visible');
    });

    it('Should filter sessions and display only Wednesday sessions when Wednesday button is clicked', async () => {
        cy.get('@WednesdayBtn').click();

        // Retry
        cy.get('[data-cy=day]').should('have.length', 21);
        cy.get('[data-cy=day').contains('Wednesday').should('be.visible');
        cy.get('[data-cy=day').contains('Thursday').should('not.exist');
        cy.get('[data-cy=day').contains('Friday').should('not.exist');
    });
});
