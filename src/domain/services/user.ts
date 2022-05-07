import { UserInterface } from '../interface'
import { GetUser } from '../model'

export class UserDomain {
    private readonly userProvider: UserInterface
    constructor({ userProvider }: { userProvider: UserInterface }) {
        this.userProvider = userProvider
    }
    async register({ name, email, password }: { name: string, email: string, password: string }): Promise<GetUser> {
        return this.userProvider.register({ name, email, password })
    }
    async  login({ email, password }: { email: string, password: string }): Promise<{ name: string }> {
        return this.userProvider.login({ email, password })
    }
}