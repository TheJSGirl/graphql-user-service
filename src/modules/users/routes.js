const route = require('express').Router();
const controller = require('./controllers');

route.post('/signUp', controller.registerUser);
route.post('/signIn', controller.post);
module.exports = route;
