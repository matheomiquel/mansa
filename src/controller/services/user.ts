import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterTypeRequest, RegisterTypeResponse } from '../schemas/register'
import { hash } from 'bcrypt'
import { UserDomain, User } from '../../domain'
export class UserService {
    private readonly userDomain: UserDomain
    constructor({ userDomain }: { userDomain: UserDomain }) {
        this.userDomain = userDomain
    }
    async register(request: FastifyRequest<{ Body: RegisterTypeRequest, Reply: RegisterTypeResponse }>, reply: FastifyReply) {
        const userData = {
            name: request.body.name,
            email: request.body.email,
            password: await hash(request.body.password, 10)
        }
        const result = await this.userDomain.register(userData)
        console.log(result)
        reply
            .code(201)
            .send(result)
    }
    async login(request: FastifyRequest, reply: FastifyReply) {
        reply
            .code(200)
            .send({ name: 'toto', email: 'toto.titi' })
    }
}