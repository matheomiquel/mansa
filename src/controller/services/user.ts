import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterTypeRequest, RegisterTypeResponse, LoginTypeRequest, LoginTypeResponse } from '../schemas'
import { hash } from 'bcrypt'
import { UserDomain } from '../../domain'
import { ErrorType } from '../../common'
export class UserService {
    private readonly userDomain: UserDomain
    constructor({ userDomain }: { userDomain: UserDomain }) {
        this.userDomain = userDomain
    }
    async register(request: FastifyRequest<{ Body: RegisterTypeRequest, Reply: RegisterTypeResponse }>, reply: FastifyReply) {
        try {
            const userData = {
                name: request.body.name,
                email: request.body.email,
                password: await hash(request.body.password, Number(process.env.SALT))
            }
            const result = await this.userDomain.register(userData)
            reply
                .code(201)
                .send(result)
        } catch (e) {
            const error = await e as ErrorType
            reply
                .code(error.code)
                .send({ message: error.message })
        }
    }
    async login(request: FastifyRequest<{ Body: LoginTypeRequest, Reply: LoginTypeResponse }>, reply: FastifyReply) {
        try {
            const userData = {
                email: request.body.email,
                password: request.body.password
            }
            const result = await this.userDomain.login(userData)

            reply
                .code(200)
                .send({ name: result.name })
        } catch (e) {
            const error = await e as ErrorType
            reply
                .code(error.code)
                .send({ message: error.message })
        }
    }
    async healthz(request: FastifyRequest, reply: FastifyReply) {
        reply.code(204)
    }
}