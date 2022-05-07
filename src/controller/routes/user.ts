import { FastifyInstance } from "fastify";
import { RegisterSchema, LoginSchema } from '../schemas'
import { UserService } from '../services'

export class UserRoute {
    constructor({ app, userService }: { app: FastifyInstance, userService: UserService }) {

        app.post('/register', {
            ...RegisterSchema,
        }, userService.register.bind({ ...userService }))
        app.post('/login', {
            ...LoginSchema,
        }, userService.login.bind({ ...userService }))
    }

}