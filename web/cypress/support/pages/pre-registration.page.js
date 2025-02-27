class PreRegistrationPage {

    fillForm(fullname, email) {
        cy.get('form h2')
            .should('be.visible')
            .should('have.text', 'Seus dados')

        cy.get('input[placeholder="John Doe"]')
            .type(fullname, { delay: 0 })

        cy.get('input[placeholder="john.doe@rockshaver.com"]')
            .type(email, { delay: 0 })
    }

    submit() {
        cy.contains('button[type="submit"]', 'Continuar')
            .click()
    }

    alertHave(fieldname, text) {
        cy.contains('label', fieldname)
            .parent()
            .find('.alert-msg')
            .should('be.visible')
            .should('have.text', text)
    }
}

export default new PreRegistrationPage()