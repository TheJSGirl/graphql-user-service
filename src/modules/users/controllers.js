const User = require('./models');


async function get(req, res){
    console.log('hello')
}

async function registerUser(req, res) {
    const {password} = req.bod
    
}

module.exports = {
    get,
    registerUser
}