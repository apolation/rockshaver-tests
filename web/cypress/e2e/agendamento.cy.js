import agendamentos from '../fixtures/agendamentos.json'
import calendario from '../fixtures/calendario.json'

describe('Agendamentos', () => {
    it('Deve fazer um novo agendamento', () => {
        const agendamento = agendamentos.sucesso;

        cy.dropCollection('agendamentos', { failSilently: 'true' })
            .then(result => {
                cy.log(result);
            });

        cy.intercept('GET', 'http://localhost:3333/api/calendario', {
            statusCode: 200,
            body: calendario
        }).as('getCalendario');

        cy.iniciarPreCadastro(agendamento.usuario);
        cy.verificarPreCadastro(agendamento.usuario);

        cy.iniciarAgendamento();
        cy.escolherProfissional(agendamento.profissional.nome);
        cy.selecionarServico(agendamento.servico.descricao);
        cy.escolherDiaAgendamento(agendamento.dia);
        cy.escolherHorarioAgendamento(agendamento.hora);
        cy.finalizarAgendamento();

        cy.get('h3')
            .should('be.visible')
            .should('have.text', 'Tudo certo por aqui! Seu horário está confirmado.');
    });

    it.only('Deve mostrar o slot ocupado', () => {
        const agendamento = agendamentos.duplicado;

        cy.dropCollection('agendamentos', { failSilently: 'true' })

        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/api/agendamentos',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72',
            },
            body: {
                nomeCliente: agendamento.usuario.nome,
                emailCliente: agendamento.usuario.email,
                data: agendamento.data,
                matricula: agendamento.profissional.matricula,
                codigoServico: agendamento.servico.codigo
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.intercept('GET', 'http://localhost:3333/api/calendario', {
            statusCode: 200,
            body: calendario,
        }).as('getCalendario');

        cy.iniciarPreCadastro(agendamento.usuario);
        cy.verificarPreCadastro(agendamento.usuario);

        cy.iniciarAgendamento();
        cy.escolherProfissional(agendamento.profissional.nome);
        cy.selecionarServico(agendamento.servico.descricao);
        cy.escolherDiaAgendamento(agendamento.dia);
        cy.escolherDiaAgendamento(agendamento.dia);

        cy.get('[slot="19:00 - ocupado"]')
            .should('be.visible')
            .find('svg')
            .should('be.visible')
            .should('have.css', 'color', 'rgb(255, 255, 255)')
    });
});
