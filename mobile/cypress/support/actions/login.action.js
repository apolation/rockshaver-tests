Cypress.Commands.add("login", (profissional) => {
    cy.get('[name="matricula"]').type(profissional.matricula, { delay: 0 })

    cy.get('[name="senha"]').type(profissional.senha, { delay: 0 })

    cy.contains("button", "Entrar").click()
})

Cypress.Commands.add("verificarUsuarioLogado", (profissional) => {
    cy.get('[class="usuario-logado"]').within(() => {
        cy.get("small")
            .should("be.visible")
            .should("have.text", `Olá ${profissional.nome},`)

        cy.get("h2")
            .should("be.visible")
            .should("have.text", "esse é o seu painel de atendimento!")
    })
})