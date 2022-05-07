import * as Joi from 'joi'
import j2s from 'joi-to-swagger';
import { badRequestSchema, notFoundSchema } from '../../common'
const name = 'Matheo'
const email = 'matheo@gmail.com'
const password = 'password12'
const LoginSchemaBody = Joi.object({
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

const LoginSchemaResponse = Joi.object({
    name: Joi.string().example(name),
})

const LoginSchema = {
    schema: {
        tags: ['user'],
        description: 'Login',
        body: j2s(LoginSchemaBody).swagger,
        response: {
            200: {
                ...j2s(LoginSchemaResponse).swagger,
                description: 'Return User'
            },
            400: {
                ...j2s(badRequestSchema).swagger,
                description: 'error in field'
            },
            404: {
                ...j2s(notFoundSchema).swagger,
                description: 'user not found'
            },
        }
    },
    validatorCompiler: () => {
        return function (data) {
            try {
                const result = LoginSchemaBody.validate(data, { abortEarly: false })
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
export { LoginSchema }