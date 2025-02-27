describe('Pre-Cadastro', () => {
  it('Deve realizar o pré-cadastro do cliente', () => {
    const usuario = {
      nome: 'Matheus Teste', 
      email: 'matheus@teste.com.br'
    }
    cy.iniciarPreCadastro(usuario)
    cy.verificarPreCadastro(usuario)
  })

  it('Campos obrigatórios', () => {
    cy.iniciarPreCadastro()
    cy.verificarAlerta('Nome Completo','O campo nome é obrigatório.')
    cy.verificarAlerta('E-mail','O campo e-mail é obrigatório.')
    
  })

  it('Não deve realizar o pre cadastro apenas com primeiro nome', () => {
    const usuario = {
      nome: 'Matheus', 
      email: 'matheus@teste.com.br'
    }
    cy.iniciarPreCadastro(usuario)
    cy.verificarAlerta('Nome Completo','Informe seu nome completo.')
  })

  it('Não deve realizar o pre cadastro com email incorreto', () => {
    const usuario = {
      nome: 'Matheus Teste', 
      email: 'www.matheusteste.com.br'
    }
    cy.iniciarPreCadastro(usuario)
    cy.verificarAlerta('E-mail','O e-mail inserido é inválido.')
  })
})