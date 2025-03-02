Cypress.Commands.add('iniciarPreCadastro', (usuario) => {
    cy.visit('/')

    cy.get('a[href=pre-cadastro]')
        .click()

    cy.get('form h2')
        .should('be.visible')
        .should('have.text', 'Seus dados')

    cy.get('input[placeholder="John Doe"]').as('nome')
    cy.get('input[placeholder="john.doe@rockshaver.com"]').as('email')

    if (usuario?.nome) {
        cy.get('@nome').type(usuario.nome, { delay: 0 })
    }

    if (usuario?.email) {
        cy.get('@email').type(usuario.email, { delay: 0 })
    }

    cy.contains('button[type="submit"]', 'Continuar')
        .click()
})

Cypress.Commands.add('verificarPreCadastro', (usuario) => {
    cy.get('span[class*="usuario-nome"]')
        .should('be.visible')
        .should('have.text', 'Olá, ' + usuario.nome.split(' ')[0])

    cy.get('span[class*="usuario-email"]')
        .should('be.visible')
        .should('have.text', usuario.email)

    cy.window().then((win)=> {
        const chaveUsuario = win.localStorage.getItem('usuario')
        expect(chaveUsuario).to.eql(JSON.stringify(usuario))
    })
})

Cypress.Commands.add('preCadastroLS', (usuario) => {
    cy.window().then((win)=> {
        win.localStorage.setItem('usuario', JSON.stringify(usuario))
        cy.visit('/')
        cy.contains(usuario.email)
            .should('be.visible')
    })
})

Cypress.Commands.add('verificarAlerta', (campo, texto) => {
    cy.contains('label', campo)
        .parent()
        .find('.alert-msg')
        .should('be.visible')
        .should('have.text', texto)
})