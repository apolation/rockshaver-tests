describe('POST /api/agendamentos', () => {
  it('Deve criar um novo agendamento', () => {

    const body = {
      "emailCliente": "matheus@gmail1.com",
      "nomeCliente": "Matheus Teste",
      "data": "20/12/2024",
      "hora": "14:00",
      "matricula": "1001",
      "codigoServico": "1"
    }

    cy.deleteMany(
      { matricula: body.matricula },
      { collection: 'agendamentos' }
    )

    cy.postAgendamento(body)
      .should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Agendamento criado com sucesso')
        expect(response.body.agendamentoId).to.match(/^[a-fA-F0-9]{24}$/)
      })
  })

  it('Deve retornar quando o agendamento já existe', () => {

    const body = {
      "emailCliente": "matheus@gmail2.com",
      "nomeCliente": "Matheus Teste",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "1002",
      "codigoServico": "2"
    }

    cy.deleteMany(
      { matricula: body.matricula },
      { collection: 'agendamentos' }
    )

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(201)
    })
    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.message).to.eq('Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
    })
  })

  it('Deve retornar quando o email é inválido', () => {

    const body = {
      "emailCliente": "matheus$gmail2.com",
      "nomeCliente": "Matheus Teste",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "1002",
      "codigoServico": "2"
    }

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('O campo emailCliente deve conter um email válido.')
    })
  })

  it('Deve retornar quando o funcionário não existe', () => {

    const body = {
      "emailCliente": "matheus@gmail2.com",
      "nomeCliente": "Matheus Teste",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "100234",
      "codigoServico": "2"
    }

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.error).to.eq('Funcionário não encontrado.')
    })
  })

  it('Deve retornar quando o código de serviço não existe', () => {

    const body = {
      "emailCliente": "matheus@gmail2.com",
      "nomeCliente": "Matheus Teste",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "1001",
      "codigoServico": "21231"
    }

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.error).to.eq('Serviço não encontrado para o código fornecido.')
    })
  })

  context('Campos obrigatrórios', () => {
    const camposObrigatorios = [
      { campo: 'emailCliente', mensagem: 'O campo emailCliente é obrigatório.' },
      { campo: 'nomeCliente', mensagem: 'O campo nomeCliente é obrigatório.' },
      { campo: 'data', mensagem: 'O campo data é obrigatório.' },
      { campo: 'hora', mensagem: 'O campo hora é obrigatório.' },
      { campo: 'matricula', mensagem: 'O campo matricula é obrigatório.' },
      { campo: 'codigoServico', mensagem: 'O campo codigoServico é obrigatório.' }
    ]

    camposObrigatorios.forEach((x) => {
      it(`Deve retornar quando o ${x.campo} é obrigatório`, () => {

        const body = {
          "emailCliente": "matheus@teste3.com.br",
          "nomeCliente": "Matheus Teste",
          "data": "20/12/2024",
          "hora": "10:00",
          "matricula": "1001",
          "codigoServico": "1"
        }

        delete body[x.campo]

        cy.postAgendamento(body).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.eq(x.mensagem)
        })
      })
    })
  })
})