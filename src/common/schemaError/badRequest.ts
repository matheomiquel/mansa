import * as Joi from 'joi'
const badRequestSchema = Joi.object({
    code: Joi.number().default(400),
    message: Joi.string().example("name should be a type of text")
})


export { badRequestSchema }