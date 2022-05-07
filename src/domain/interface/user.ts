import { User, GetUser } from '../model'
export interface UserInterface {
    register({ name, email, password }: { name: string, email: string, password: string }): Promise<GetUser>
    login({ email, password }: { email: string, password: string }): Promise<{ name: string }>
}