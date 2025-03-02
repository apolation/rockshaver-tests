describe('template spec', () => {
  it('Deve logar como barbeiro', () => {
    cy.viewport('iphone-xr')
    cy.visit('/')

    const funcionario = {
      matricula: '1007',
      senha: 'pwd123',
      nome: 'Slash'
    }

    cy.contains('p', 'Faça login com a sua conta')
      .should('be.visible')

    cy.login(funcionario)
    cy.verificarUsuarioLogado(funcionario)

  })
})