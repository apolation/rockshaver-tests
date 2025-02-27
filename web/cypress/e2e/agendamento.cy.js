import agendamentos from '../fixtures/agendamentos.json'
import calendario from '../fixtures/calendario.json'

describe('Agendamentos', () => {

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3333/api/calendario', {
            statusCode: 200,
            body: calendario
        });
    })

    it('Deve fazer um novo agendamento', () => {
        const agendamento = agendamentos.sucesso;

        cy.deleteMany(
            { emailCliente: agendamento.usuario.email },
            { collection: 'agendamentos' }
        ).then(result => {
            cy.log(result);
        });

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

    it('Deve mostrar o slot ocupado', () => {
        const agendamento = agendamentos.duplicado;

        cy.deleteMany(
            { emailCliente: agendamento.usuario.email },
            { collection: 'agendamentos' }
        ).then(result => {
            cy.log(result);
        });

        cy.agendamentoApi(agendamento)

        cy.iniciarPreCadastro(agendamento.usuario);
        cy.verificarPreCadastro(agendamento.usuario);

        cy.iniciarAgendamento();
        cy.escolherProfissional(agendamento.profissional.nome);
        cy.selecionarServico(agendamento.servico.descricao);
        cy.escolherDiaAgendamento(agendamento.dia);

        cy.get(`[slot="${agendamento.hora} - ocupado"]`)
            .should('be.visible')
            .find('svg')
            .should('be.visible')
            .should('have.css', 'color', 'rgb(255, 255, 255)')
    });

    it('Deve retornar notificação no sumário em caso de conflito de disponibilidade', () => {
        const agendamento = agendamentos.conflito;

        cy.deleteMany(
            { emailCliente: agendamento.usuario.email },
            { collection: 'agendamentos' }
        ).then(result => {
            cy.log(result);
        });

        cy.iniciarPreCadastro(agendamento.usuario);
        cy.verificarPreCadastro(agendamento.usuario);

        cy.iniciarAgendamento();
        cy.escolherProfissional(agendamento.profissional.nome);
        cy.selecionarServico(agendamento.servico.descricao);
        cy.escolherDiaAgendamento(agendamento.dia);
        cy.escolherHorarioAgendamento(agendamento.hora);
        cy.agendamentoApi(agendamento)
        cy.finalizarAgendamento();

        cy.erroAlerta('Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
    });
});
