import { faker } from '@faker-js/faker'


export function novaDisciplina() {

    const timestamp = Date.now()
    const nomeDisciplina = faker.science.chemicalElement().name
    const valorCargaHorario = faker.number.int({ max: 500 })

    return {
        "nome": nomeDisciplina,
        "codigo": timestamp,
        "cargaHoraria": valorCargaHorario
    }
    
}