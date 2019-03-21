const Joi = require('joi')

module.exports = {
    signup: {
        body: {
            username: Joi.string().min(4).max(255).required(),
            password: Joi.string().min(4).max(255).required()
        }
    }
}
