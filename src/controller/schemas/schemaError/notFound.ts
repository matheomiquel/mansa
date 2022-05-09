import * as Joi from 'joi'
const notFoundSchema = Joi.object({
    code: Joi.number().default(404),
    message: Joi.string().example("resource not found")
})

export { notFoundSchema }