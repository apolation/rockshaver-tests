import { Types } from 'mongoose'

describe('POST /agendamentos/:id/lembrete', () => {

    const funcionario = {
        matricula: '1005',
        senha: 'pwd123'
    }

    beforeEach(() => {
        cy.login(funcionario.matricula, funcionario.senha)
    })

    context('Quando tenho um agendamento', () => {
        const agendamento = {
            nomeCliente: 'Matheus Teste Testando',
            emailCliente: 'matheus@testador.com.br',
            data: '03/03/2025',
            hora: '18:30',
            matricula: funcionario.matricula,
            senha: funcionario.senha,
            codigoServico: 1
        }

        let agendamentoId

        before(() => {
            cy.deleteMany({ matricula: agendamento.matricula }, { collection: 'agendamentos' })
                .then((result) => {
                    cy.log(result)
                })
            cy.postAgendamento(agendamento)
                .should((response) => {
                    expect(response.status).to.eq(201)
                    agendamentoId = response.body.agendamentoId
                })
        })

        it('Deve poder enviar um lembre por email', () => {
            cy.postLembrete(agendamentoId).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Lembrete enviado com sucesso')
            })

            cy.findOne(
                { agendamentoId: new Types.ObjectId(agendamentoId) },
                { collection: 'lembretes' }
            ).then((result) => {
                expect(result.conteudoHtml).to.include(agendamento.nomeCliente)
            })
        })
    })

    it('Deve retornar 404 quando o agendamento não existe', () => {
        cy.postLembrete(new Types.ObjectId()).should((response) => {
            expect(response.status).to.eq(404)
        })
    })
})
