const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')){
        console.log('auth header doesn\'t start with bearer');
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    // console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = requireAuth