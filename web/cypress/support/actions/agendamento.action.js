Cypress.Commands.add('iniciarAgendamento', () => {
    cy.contains('a', 'Agendar um horário').click();
});

Cypress.Commands.add('escolherProfissional', (nome) => {
    cy.contains('span', 'Membros da Equipe').should('be.visible');
    cy.get(`img[alt="${nome}"]`).parent().click();
});

Cypress.Commands.add('selecionarServico', (descricao) => {
    cy.contains('span', 'Serviços').should('be.visible');
    cy.get(`img[alt="${descricao}"]`).parent().click();
});

Cypress.Commands.add('escolherDiaAgendamento', (dia) => {
    cy.contains('span', 'Dias Disponíveis').should('be.visible');
    cy.contains('.dia-semana', dia).click();
});

Cypress.Commands.add('escolherHorarioAgendamento', (hora) => {
    cy.contains('span', 'Horários Disponíveis').should('be.visible');
    cy.contains('.hora-opcao', hora).click();
});

Cypress.Commands.add('finalizarAgendamento', () => {
    cy.contains('button', 'Confirmar e reservar').click();
});

Cypress.Commands.add('erroAlerta', (menssagemAlerta) => {
    cy.get('[class*="alert-error"]')
        .should('be.visible')
        .should('have.text', menssagemAlerta)
})