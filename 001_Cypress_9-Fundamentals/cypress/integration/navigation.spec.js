/// <reference types="cypress"/>

describe('Navigation', () => {
    it('Should navigate to conference sessions page', async () => {
        cy.ClickViewSessions();
        cy.url().should('include', '/sessions');
    });
});
