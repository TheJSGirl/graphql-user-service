const User = require('./models');
const {registerUser} = require('./controllers');

async function addUser(args) {
    
    return registerUser(args)
}

module.exports = {
    addUser
}