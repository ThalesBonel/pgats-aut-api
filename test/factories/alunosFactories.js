import { faker } from '@faker-js/faker'


export function novoAluno() {

    const timestamp = Date.now()

    const fisrtName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const matricula = faker.commerce.productAdjective()
    const password = faker.internet.password()
   
    return {
        "nome": `${fisrtName} ${lastName}`,
        "email": `${fisrtName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}@test_${timestamp}.com`,
        "matricula": matricula,
        "senha": password
    }
    
}