const jwt = require('jsonwebtoken');
const User = require('../users/models');
const config = require('../../config');
const errors = require('njs/lib/errors');
const _ = require('lodash');
const sessionKey = config.authentication.tokenKey || '';


const checkAuth = async(req, res, next) =>{
    const headerToken = req.header.authorization;
    const token = headerToken.split(' ')[1];

    if (!token && !authToken) {
        req.authenticated = false;
        throw new errors.UnauthorizedAccess();
    }
    const decoded = await jwt.verify(token, config.jwt.secret, config.jwt.expiresIn);
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
    await next();

}
module.exports = checkAuth;