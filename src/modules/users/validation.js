const Joi = require('joi')

module.exports = {
    signup: {
        body: {
            email: Joi.string().email().required(),
            mobile: Joi.string().min(9).max(10),
            username: Joi.string().min(4).max(255).required(),
            password: Joi.string().min(4).max(10).required()
        }
    },
    signin: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.strict().min(4).max(10).required()
        }
    }
}
