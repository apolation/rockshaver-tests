class PreRegistrationPage {
    go() {
        cy.visit('/')
        cy.get('a[href=pre-cadastro]')
            .click()

        cy.get('form h2')
            .should('be.visible')
            .should('have.text', 'Seus dados')
    }

    fillForm(fullname, email) {
        cy.get('input[placeholder="John Doe"]')
            .type(fullname, { delay: 0 })

        cy.get('input[placeholder="john.doe@rockshaver.com"]')
            .type(email, { delay: 0 })
    }

    submit() {
        cy.contains('button[type="submit"]', 'Continuar')
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

    alertHave(fieldname, text) {
        cy.contains('label', fieldname)
            .parent()
            .find('.alert-msg')
            .should('be.visible')
            .should('have.text', text)
    }
}

export default new PreRegistrationPage()