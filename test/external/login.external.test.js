import request from "supertest";
import app from "../../src/app.js";
import { expect } from "chai";
import * as sinon from "sinon";
import authService from "../../src/services/auth.service.js";

describe("Login Externo", () => {
  it("Login deve retornar 200 quando o usuário e senha forem corretos", async () => {
    const loginResposta = await request("http://localhost:3000")
        .post("/api/auth/login")
        .set("Content-Type", "application/json")
        .send({
            email: "admin@escola.com",
            senha: "admin123",
    });

    expect(loginResposta.status).to.equal(200);
  });

  it("Login sem senha dele retornar erro e com status code 400", async () => {
    const loginResposta = await request("http://localhost:3000")
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({
              email: "admin@escola.com",
    });

    expect(loginResposta.status).to.equal(400);
    expect(loginResposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
  });

  it("Deve retornar 500 quando acontecer algum problema de conexão com o banco de dados", async () => {
    const authServiceMock = sinon.stub(authService, "login");
    authServiceMock.throws(new Error("DEU ERRO AQUIII DOIDAO, CORRE!"));

    const loginResposta = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({
              email: "admin@escola.com",
              senha: "admin123",
    });

    expect(loginResposta.status).to.equal(500);
    expect(loginResposta.body.error).to.equal("Erro interno do servidor.");

    sinon.restore();
  });

});
