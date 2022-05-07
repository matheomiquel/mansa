export class GetUser {
    name: string;
    email: string;
    constructor({ name, email }:
        { name: string, email: string }) {
        this.name = name
        this.email = email;
    }
}