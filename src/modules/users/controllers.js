const User = require('./models');
const bcrypt = require('bcrypt');
//const validateUser = require('./validation');


async function get(req, res){
    console.log('hello')
}

async function registerUser(req, res) {

    const {name, password, email, mobile, username, image } = req.body

    // const hashedPassword = await bcrypt.hashSync(password);
    const data = {
        name,
        password,
        email,
        mobile,
        username,
        image
    }

    const userCredentials = new User(data);
    // userCredentials.save();
    res.status(200).json(req.body);
}

module.exports = {
    get,
    registerUser
}