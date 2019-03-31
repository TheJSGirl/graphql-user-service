const User = require('./models');

async function addUser(args) {
    let user = new User({
        name: args.name
    })
    
    return user.save();
}

module.exports = {
    addUser
}