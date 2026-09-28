import { api } from "../helpers/api.js";
import { expect } from "chai";
import {comTokenDeAdmin} from '../helpers/auth.js'
import { novoAluno } from "../factories/alunosFactories.js";
import { novaDisciplina } from "../factories/disciplinasFactories.js";
import 'dotenv/config'
import testesDeMatricula from '../fixtures/matriculas.json' with {type: 'json'}

describe('Disciplinas Externo', () => {
    let token 

    beforeEach(async () => {
        token = await comTokenDeAdmin()
    })

    testesDeMatricula.forEach(testeDeMatricula => {
        it.only(testeDeMatricula.testTitle, async () => {

        // Arrange 
        await api()
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: process.env.EMAIL_ADMIN,
                senha: process.env.SENHA_ADMIN,
        });


        const adminAlunosResposta = await api()
            .post('/api/admin/alunos')
            .set("Content-Type", "application/json")
            .set('Authorization', token)
            .send(testeDeMatricula.dadosAluno)
        
        const idAluno = adminAlunosResposta.body.id

        const adminDisciplinaResposta = await api()
            .post('/api/admin/disciplinas')
            .set("Content-Type", "application/json")
            .set('Authorization', token)
            .send(testeDeMatricula.dadosDisciplina) 

            const idDisciplina = adminDisciplinaResposta.body.id
        
        // Act
        const adminCadastradoAlunoDisciplinaResposta = await api()
            .post(`/api/admin/disciplinas/${idDisciplina}/matriculas`)
            .set("Content-Type", "application/json")
            .set('Authorization', token)
            .send({
                    alunoId: idAluno
            }) 


        // Assert
        expect(adminCadastradoAlunoDisciplinaResposta.status).to.equal(testeDeMatricula.statusCodeEsperado)
        expect(adminCadastradoAlunoDisciplinaResposta.body.alunoId).to.equal(idAluno)
        expect(adminCadastradoAlunoDisciplinaResposta.body.disciplinaId).to.equal(idDisciplina)

        console.log(testeDeMatricula)
        console.log("-------------------------------")
    })
    })

    it('Validar matricula de um novo aluno em uma nova disciplina com sucesso', async () => {

        // Arrange 
        await api()
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                email: process.env.EMAIL_ADMIN,
                senha: process.env.SENHA_ADMIN,
        });


        const adminAlunosResposta = await api()
            .post('/api/admin/alunos')
            .set("Content-Type", "application/json")
            .set('Authorization', token)
            .send(novoAluno())
        
        const idAluno = adminAlunosResposta.body.id

        const adminDisciplinaResposta = await api()
            .post('/api/admin/disciplinas')
            .set("Content-Type", "application/json")
            .set('Authorization', token)
            .send(novaDisciplina()) 

            const idDisciplina = adminDisciplinaResposta.body.id
        
        // Act
        const adminCadastradoAlunoDisciplinaResposta = await api()
            .post(`/api/admin/disciplinas/${idDisciplina}/matriculas`)
            .set("Content-Type", "application/json")
            .set('Authorization', token)
            .send({
                    alunoId: idAluno
            }) 


        // Assert
        expect(adminCadastradoAlunoDisciplinaResposta.status).to.equal(201)
        expect(adminCadastradoAlunoDisciplinaResposta.body.alunoId).to.equal(idAluno)
        expect(adminCadastradoAlunoDisciplinaResposta.body.disciplinaId).to.equal(idDisciplina)
    })
})

