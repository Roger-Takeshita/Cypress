/// <reference types="cypress"/>

describe('Submit sessions', () => {
    beforeEach(() => {
        cy.visit('/conference');
        cy.get('h1').contains('View Sessions').click();
        cy.url().should('include', '/sessions');

        cy.get('a').contains('Submit a Session!').click();
        cy.url().should('include', '/conference/sessions/new');
    });

    it('Should navigate to submit sessions page', async () => {});

    it('Should submit a session successfully', async () => {
        cy.contains('Title').type('New session title');
        cy.contains('Description').type('This is the greatest session');
        cy.contains('Day').type('Thursday');
        cy.contains('Level').type('Advance');
        cy.get('form').submit();
        cy.contains('Session Submitted Successfully!');
    });
});
