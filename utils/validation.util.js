const joi = require('joi')

const createUserSchema = joi.object({
    name: joi.string().required(),
    role: joi.string().valid('admin', 'user').default('user'),
    email: joi.string().min(4).max(100).required(),
    isVerified: joi.boolean(),
    address: joi.object({
        city: joi.string().required().allow(''),
        street: joi.string(),
        apt: joi.number(),
    }).optional()
})

module.exports.createUserValidation = (data, opts = null) => {
    return createUserSchema.validateAsync(data, (opts || { abortEarly: false, allowUnknown: false }))
}

