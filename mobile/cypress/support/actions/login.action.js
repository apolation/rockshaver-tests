Cypress.Commands.add('login', (funcionario) => {
    cy.get('[name="matricula"]')
        .type(funcionario.matricula, { delay: 0 })

    cy.get('[name="senha"]')
        .type(funcionario.senha, { delay: 0 })

    cy.contains('button', 'Entrar')
        .click()
})

Cypress.Commands.add('verificarUsuarioLogado', (funcionario) => {
    cy.get('[class="usuario-logado"]').within(() => {
        cy.get('small')
            .should('be.visible')
            .should('have.text', `Olá ${funcionario.nome},`)

        cy.get('h2')
            .should('be.visible')
            .should('have.text', 'esse é o seu painel de atendimento!')
    })
})