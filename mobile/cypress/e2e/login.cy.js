describe('template spec', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')
    cy.contains('p', 'Faça login com a sua conta').should('be.visible')
  })

  it('Deve logar como barbeiro', () => {

    const profissional = {
      matricula: '1007',
      senha: 'pwd123',
      nome: 'Slash',
    }

    cy.login(profissional)
    cy.verificarUsuarioLogado(profissional)
  })

  it('Não deve logar quando a senha é inválida', () => {

    const profissional = {
      matricula: '1008',
      senha: 'pwd1233',
    }

    cy.login(profissional)
    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')

    cy.get('[role="status"]')
      .should('be.visible')
      .should('have.text', 'Falha ao realizar login. Verifique suas credenciais.')
  })

  it('Não deve logar com matrícula não existente', () => {

    const profissional = {
      matricula: '1111',
      senha: 'pwd1233',
    }

    cy.login(profissional)
    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')

  })

  it('Não deve logar com os campos vazios', () => {

    cy.get('form').submit()
    cy.verificarToast('Informe sua matrícula e sua senha!')
  })
})