const User = require('./models');
const bcrypt = require('bcrypt');
const {HashSettings, jwt} = require('../../config');
const jwtToken = require('jsonwebtoken');

async function addUser(args) {

    return registerUser(args)
}

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

async function loginUser(args) {
    const { email, password} = args;
    let userFromDb = await User.findOne({email});

    if(!userFromDb) {
        return;
    }
    const passwordFromDb = userFromDb.password;

    const isValid = await bcrypt.compare(password, passwordFromDb);

    if(!isValid) {
        return;
    }
       const tokenData = {
           id: userFromDb._id,
           username: userFromDb.username,
           email: userFromDb.email
       };
       const token = jwtToken.sign(tokenData,
        jwt.jwt_sceret, { expiresIn: jwt.jwt_exp },
      );
    return  {
        user: userFromDb.toJSON(),
        token
    }
}
module.exports = {
    addUser,
    registerUser,
    loginUser
}