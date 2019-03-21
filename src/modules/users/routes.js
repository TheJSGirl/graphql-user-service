const controller = require('./controllers');
const UserValidation = require('./validation'); 
const validate = require('express-validation'); 
const route = require('express').Router();

route.post('/signUp', [validate(UserValidation.signup)], controller.registerUser);
route.post('/signIn', [validate(UserValidation.signin)], controller.loginUser);
module.exports = route; 
