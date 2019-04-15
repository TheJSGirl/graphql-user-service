const User = require('./models');
const bcrypt = require('bcrypt');
const config = require('../../config');
const jwt = require('jsonwebtoken');

async function addUser(args) {

    return registerUser(args)
}

async function checkAuth(token) {
    const req = {};
    if (!token && !authToken) {
        req.authenticated = false;
        throw new errors.UnauthorizedAccess();
    }
    const decoded = await jwt.verify(token, config.jwt.jwt_sceret, config.jwt.jwt_exp);
    if (!decoded) {
        req.authenticated = false;
        throw new errors.UnauthorizedAccess();
    }
    const dbUser = await User.findOne({ _id: decoded.id });
    const permission = {
        admin: false,
    };

    if (dbUser && dbUser.role === 'admin') {
        permission.admin = true;
    }

    req.authenticated = true;
    req.user = decoded;
    req.permission = permission;
    return req;
}
async function fetchUser(args) {
   try{
    const user = await User.findOne({_id: args.id});
    if(!user) {
        return null;
    }
    return user;
   } catch(e) {
       return null;
   }
}

async function registerUser(args) {
    const result = await checkAuth(args.token);
    const {name, password, email, mobile, username, image } = args;

    const hashedPassword = await bcrypt.hashSync(password, config.HashSettings.SaltRounds);
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
       const token = jwt.sign(tokenData,
        config.jwt.jwt_sceret, { expiresIn: config.jwt.jwt_exp },
      );
    return  {
        user: userFromDb.toJSON(),
        token
    }
}
module.exports = {
    addUser,
    registerUser,
    loginUser,
    fetchUser,
    checkAuth
}