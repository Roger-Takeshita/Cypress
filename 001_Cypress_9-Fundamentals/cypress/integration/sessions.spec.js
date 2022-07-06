/// <reference types="cypress"/>

describe('Sessions Page', () => {
    beforeEach(() => {
        cy.visit('/conference');
        cy.get('h1').contains('View Sessions').click();
        cy.url().should('include', '/sessions');
    });

    it('Should navigate to conference sessions page and view day filter buttons', async () => {
        // Validate that buttons exist
        cy.get('[data-cy=AllSessions');
        cy.get('[data-cy=Wednesday');
        cy.get('[data-cy=Thursday');
        cy.get('[data-cy=Friday');
    });

    it('Should filter sessions and display only Wednesday sessions when Wednesday button is clicked', async () => {
        cy.get('[data-cy=Wednesday').click();

        // Assertions
        cy.get('[data-cy=day').contains('Wednesday').should('be.visible');
        cy.get('[data-cy=day').contains('Thursday').should('not.exist');
        cy.get('[data-cy=day').contains('Friday').should('not.exist');
    });

    it('Should filter sessions and display only Wednesday sessions when Wednesday button is clicked', async () => {
        cy.get('[data-cy=Wednesday').click();

        // Retry
        cy.get('[data-cy=day]').should('have.length', 21);
        cy.get('[data-cy=day').contains('Wednesday').should('be.visible');
        cy.get('[data-cy=day').contains('Thursday').should('not.exist');
        cy.get('[data-cy=day').contains('Friday').should('not.exist');
    });
});
