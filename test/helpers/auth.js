import {api} from '../helpers/api.js'

let tokenEmCache

export async function comTokenDeAdmin() {
    if (!tokenEmCache) {
        const loginResposta = await api()
            .post("/api/auth/login")
            .set("Content-Type", "application/json")
            .send({
                    email: process.env.EMAIL_ADMIN,
                    senha: process.env.SENHA_ADMIN,
            })

        tokenEmCache = loginResposta.body.token
    } 
    return `Bearer ${tokenEmCache}`
}


export async function getToken() {
    const loginResposta = await api()
        .set("Content-Type", "application/json")
        .send({
                email: process.env.EMAIL_ADMIN,
                senha: process.env.SENHA_ADMIN,
    });

    return loginResposta.body.token;
}

