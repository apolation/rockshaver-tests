import preRegistrationPage from '../support/pages/pre-registration.page'

describe('Pre-Cadastro', () => {
  it('Deve realizar o pré-cadastro do cliente', () => {
    preRegistrationPage.go()
    preRegistrationPage.fillForm('Matheus Teste', 'matheus@teste.com.br')
    preRegistrationPage.submit()
    preRegistrationPage.verifyPreRegistration('Matheus', 'matheus@teste.com.br')
  })

  it('Campos obrigatórios', () => {
    preRegistrationPage.go()
    // preRegistrationPage.fillForm('Matheus Teste', 'matheus@teste.com.br')
    preRegistrationPage.submit()
    preRegistrationPage.alertHave('Nome Completo','O campo nome é obrigatório.')
    preRegistrationPage.alertHave('E-mail','O campo e-mail é obrigatório.')
    
  })

  it('Não deve realizar o pre cadastro apenas com primeiro nome', () => {
    preRegistrationPage.go()
    preRegistrationPage.fillForm('Matheus', 'matheus@teste.com.br')
    preRegistrationPage.submit()
    preRegistrationPage.alertHave('Nome Completo','Informe seu nome completo.')
  })

  it('Não deve realizar o pre cadastro com email incorreto', () => {
    preRegistrationPage.go()
    preRegistrationPage.fillForm('Matheus Teste', 'www.matheusteste.com.br')
    preRegistrationPage.submit()
    preRegistrationPage.alertHave('E-mail','O e-mail inserido é inválido.')
  })
})