import { Types } from 'mongoose'

describe('DELETE /agendamentos/:id', () => {

    const funcionario = {
        matricula: '1004',
        senha: 'pwd123'
    }

    beforeEach(() => {
        cy.login(funcionario.matricula, funcionario.senha)
    })

    context('Quando tenho um agendamento', () => {
        const agendamento = {
            nomeCliente: 'Matheus Teste',
            emailCliente: 'matheus@teste.com.br',
            data: '03/03/2025',
            hora: '18:30',
            matricula: funcionario.matricula,
            senha: funcionario.senha,
            codigoServico: 3
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
        

        it('Deve poder remover pelo id', () => {
            cy.deleteAgendamento(agendamentoId).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Agendamento cancelado com sucesso')
            })
        })
    })

    it('Deve retornar 404 quando o agendamento não existe', () => {
        cy.deleteAgendamento(new Types.ObjectId()).should((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.error).to.eq('Agendamento não encontrado')
        })
    })
})
