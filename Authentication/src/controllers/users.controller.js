require("dotenv").config();
const jwt = require('jsonwebtoken');
const User =require("../models/user.model");
const newToken = (user)=> {
    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
}

const register = async (req,res)=>{
//check email address provided allready exist
//if it already exist through an error
//else we will create a users will update  # the passwords
//we will create token
//return the user and the token
try{
    let user = await User.findOne({email: req.body.email}).lean().exec();
    // console.log(user);
    if(user)
    return res
    .status(400)
    .json({
        status:"failed",
        message: "please provide a different email address",


    });

    user = await User.create(req.body);

    const token = newToken(user);


    res.status(201).json({user,token});
    
}catch(e){
    return res.status(500).json({status:"failed",message:e.message})
}

    
};
//check if the email address provided already exist
//if it does not exist then throw an error
//else we match the password
//if not match then throw an error
//if it matches then create the tokem


const login = async(req,res) =>{
    try{
        let user = await User.findOne({email: req.body.email});
         
    if(!user)
    return res
    .status(400)
    .json({
        status:"failed",
        message: "please provide correct email address and password",


    });

    
    const match = await user.checkPassword(req.body.password);
    if(!match)
    return res.status(400).json({
        status:"failed",
        message: "please provide correct email address and password",
    });

    const token = newToken(user);
        res.status(201).json({user,token});
    
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
    

    // res.status(201).send("Login");
};
module.exports = { register, login };
