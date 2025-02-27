class Header {

    goToPreReg() {
        cy.get('a[href=pre-cadastro]')
            .click()
    }

    verifyPreRegistration(firstname, email) {
        cy.get('span[class*="user-name"]')
            .should('be.visible')
            .should('have.text', 'Olá, ' + firstname)

        cy.get('span[class*="user-email"]')
            .should('be.visible')
            .should('have.text', email)
    }
}

export default new Header()