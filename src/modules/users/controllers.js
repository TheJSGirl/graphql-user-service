const User = require('./models');
const bcrypt = require('bcrypt');
//const validateUser = require('./validation');


async function registerUser(args) {

    const {name, password, email, mobile, username, image } = args;

    const hashedPassword = await bcrypt.hashSync(password, HashSettings.SaltRounds);
    const data = {
        name,
        password: hashedPassword,
        email,
        mobile,
        username,
        image
    };
    const res = await User.create(data);
    return res.toJSON();    
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
    registerUser,
}
