const User = require('./models');
const bcrypt = require('bcrypt');
const {HashSettings, jwt} = require('../../config');
const jwtToken = require('jsonwebtoken');


async function registerUser(req, res) {

    const {name, password, email, mobile, username, image } = req.body;

    const hashedPassword = await bcrypt.hashSync(password, HashSettings.SaltRounds);
    const data = {
        name,
        password: hashedPassword,
        email,
        mobile,
        username,
        image
    };

    const user = new User(data);
    await user.save();
    res.status(200).json(req.body);
}

async function loginUser(req, res) {
    const { email, password} = req.body;

    let userFromDb = await User.find({email});
    

    if(!userFromDb) {
        return;
    }
    const passwordFromDb = userFromDb[0].password;

    const isValid = await bcrypt.compare(password, passwordFromDb);

    if(!isValid) {
        return;
    }
       const tokenData = {
           id: userFromDb[0]._id,
           username: userFromDb[0].username,
       };
       const token = jwtToken.sign(tokenData,
        jwt.jwt_sceret, { expiresIn: jwt.jwt_exp },
      );
    
    let user = userFromDb.toObject();
    delete user.password;
    
    res.header('Authorization', `Bearer ${token}`);
    return res.status(200).json({ user: userFromDb });
}

module.exports = {
    registerUser,
    loginUser
}
