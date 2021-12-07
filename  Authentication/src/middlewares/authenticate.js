const jwt = require("jsonwebtoken");
require("dotenv").config()
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
            if (err) return reject(err);
            return resolve(token);
        });
    })

};

module.exports = async (req, res, next) => {
 
    const bearerToken = req?.headers?.authorization;
    
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) return res.status(400).json({
        status: "failed",
        message: "please provide a valid token",


    }); 

    const token = bearerToken.split(" ")[1];
    let user;
    try {
        const user = await verifyToken(token);
      
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: "please provide a valid token",
        });
    }
    if (!user)
        return res.status(400).json({
            status: "failed",
            message: "please provide a valid token",


        }); 
    req.user = user;
  
    return next()


};