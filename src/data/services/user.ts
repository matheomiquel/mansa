import { UserInterface, GetUser } from '../../domain'
import { DataError } from '../error'
import { compare } from 'bcrypt'
import { Op } from 'sequelize'
const model = require('../../../models')
export class UserData implements UserInterface {
    async register({ name, email, password }: { name: string, email: string, password: string }): Promise<GetUser> {
        const [user, created] = await model.User.findOrCreate({
            where: {
                [Op.or]: [
                    { name },
                    { email }
                ]
            },
            defaults: {
                name,
                email,
                password: password
            }
        })
        if (created) {
            return new GetUser(user)
        }
        throw DataError.conflict('Name or email already take', 409)

    }
    async login({ email, password }: { email: string, password: string }): Promise<{ name: string }> {
        const user = await model.User.findOne({
            where: {
                email
            }
        })
        if (!user || await !compare(password, user.password)) {
            throw DataError.resource_not_found('User not found', 404)
        }
        return { name: user.name }
    }
}