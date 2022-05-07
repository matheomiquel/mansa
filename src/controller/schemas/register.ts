import * as Joi from 'joi'
import j2s from 'joi-to-swagger';
import { badRequestSchema, conflictSchema, notFoundSchema } from '../../common'
const name = 'Matheo'
const email = 'matheo@gmail.com'
const password = 'password12'

type RegisterTypeRequest = {
    name: string
    email: string
    password: string
}
type RegisterTypeResponse = {
    name: string
    email: string
}
const RegisterSchemaBody = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.min': `"name" should have a minimum length of {#limit}`,
            'string.max': `"name" should have a maximum length of {#limit}`,
            'any.required': `"name" is a required field`
        }).example(name),
    email: Joi.string()
        .email()
        .max(256)
        .required()
        .messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.max': `"email" should have a maximum length of {#limit}`,
            'string.email': 'email must be valid',
            'any.required': `"email" is a required field`
        }).example(email),
    password: Joi.string()
        .min(8)
        .max(255)
        .required()
        .messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.min': `"password" should have a minimum length of {#limit}`,
            'string.max': `"password" should have a maximum length of {#limit}`,
            'any.required': `"password" is a required field`
        })
        .example(password),
})

const RegisterSchemaResponse = Joi.object({
    name: Joi.string().example(name),
    email: Joi.string().example(email),
})

const RegisterSchema = {
    schema: {
        tags: ['user'],
        description: 'register',
        body: j2s(RegisterSchemaBody).swagger,
        response: {
            201: {
                ...j2s(RegisterSchemaResponse).swagger,
                description: 'User created'
            },
            400: {
                ...j2s(badRequestSchema).swagger,
                description: 'error in field'
            },
            404: {
                ...j2s(notFoundSchema).swagger,
                description: 'user not found'
            },
            409: {
                ...j2s(conflictSchema).swagger,
                description: 'name or email already exist'
            }
        }
    },
    validatorCompiler: () => {
        return function (data) {
            try {
                const result = RegisterSchemaBody.validate(data, { abortEarly: false })
                const error = result.error
                if (result.error) {
                    throw error
                }
            } catch (e) {
                return { error: e }
            }
        }
    }
}
export { RegisterSchema, RegisterSchemaBody, RegisterTypeRequest, RegisterTypeResponse }