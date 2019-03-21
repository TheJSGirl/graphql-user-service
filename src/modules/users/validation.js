const Joi = require('joi')

module.exports = {
    signup: {
        body: {
            email: Joi.string().email().required(),
            mobile: Joi.string().min(9).max(9),
            username: Joi.string().min(4).max(255).required(),
            password: Joi.string().min(4).max(255).required()
        }
    },
}
