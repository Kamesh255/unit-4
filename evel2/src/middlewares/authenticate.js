require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
            if (err) return reject(err);
            return resolve(token)
        })
    })
}
module.exports = async (req, res, next) => {
    const bearToken = req?.headers?.authorization;

    if (!bearToken) {
        return res.json({
            status: "failed",
            message: "Incorrect Token"
        })
    }
    const token = bearToken.split(' ')[1];

    let user;
    try {
        user = await verifyToken(token)
    } catch (e) {
        res.send(e)
    }
    if (!user) {
        res.json({
            message: 'invalid token'
        })
    }
    req.user = user;
    next();
}