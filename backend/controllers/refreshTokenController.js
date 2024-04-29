const User = require('../models/user.model')
const bcrypt = require('bcrypt')
// const validator = require('validator')
const jwt = require('jsonwebtoken');
require('dotenv'). config()


const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) 
        return res.status(401);
    // console.log(cookies.jwt)
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) 
        return res.status(403); //Forbidden 
    
        // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.email !== decoded.email) 
                return res.status(403);
            const roles = Object.values(user.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            );
            res.json({ roles, accessToken })
        }
    );
}

module.exports = { refreshToken }