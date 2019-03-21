const User = require('./models');
const bcrypt = require('bcrypt');
const {HashSettings} = require('../../config');


async function get(req, res){
    console.log('hello')
}

async function registerUser(req, res) {

    const {name, password, email, mobile, username, image } = req.body

<<<<<<< Updated upstream
    const hashedPassword = await bcrypt.hashSync(password, HashSettings.SaltRounds);
=======
    const hashedPassword = await bcrypt.hashSync(password, 10);
>>>>>>> Stashed changes
    const data = {
        name,
        password: hashedPassword,
        email,
        mobile,
        username,
        image
    }

    const user = new User(data);
    await user.save();
    res.status(200).json(req.body);
}

module.exports = {
    get,
    registerUser
}