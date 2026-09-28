import request from "supertest";
import app from "../../src/app.js";
import { expect } from "chai";
import { getToken } from '../helpers/auth.js'

describe("Cadastrar Aluno novo", () => {
    let token

    beforeEach(async () => {
        token = await getToken()
    })
  it("Deve cadastar um aluno com sucesso quando passamos credenciais válidas", async () => {

    const cadastrarAlunoResposta = await request("http://localhost:3000")
      .post("/api/admin/alunos")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
            nome: "Thales QA",
            email: "thales.qa@example.com",
            matricula: "199426",
            senha: "123456"
      });

    expect(cadastrarAlunoResposta.status).to.equal(201);
    expect(cadastrarAlunoResposta.body.nome).to.equal("Thales QA");
    expect(cadastrarAlunoResposta.body.email).to.equal("thales.qa@example.com");
    expect(cadastrarAlunoResposta.body.matricula).to.equal("199426");
    expect(cadastrarAlunoResposta.body.role).to.equal("aluno");
  });

  it('Deve dar erro ao tentar cadastrar um aluno que já existe na base e retornar 409', async () => {

    const cadastrarAlunoResposta = await request("http://localhost:3000")
      .post("/api/admin/alunos")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
            nome: "Ana Souza",
            email: "ana.souza@example.com",
            matricula: "2024001",
            senha: "123456"
      });

    expect(cadastrarAlunoResposta.status).to.equal(409);
    expect(cadastrarAlunoResposta.body.error).to.equal("Já existe um aluno cadastrado com essa matrícula ou e-mail.");
  })
});
