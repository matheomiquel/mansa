import { UserInterface, GetUser } from '../../domain'
export class UserData implements UserInterface {
    async register({ name, email, password }: { name: string, email: string, password: string }): Promise<GetUser> {
        return new GetUser({ name: 'genius', email: 'titi' })
    }
    async login({ email, password }: { email: string, password: string }): Promise<{ name: string }> {
        return { name: 'toto' }
    }
}