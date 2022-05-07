import * as Joi from 'joi'
const conflictSchema = Joi.object({
    code: Joi.number().default(409),
    message: Joi.string().example("this name is already taken")
})

export { conflictSchema }