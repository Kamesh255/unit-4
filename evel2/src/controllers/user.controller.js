require('dotenv').config();
const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY)
};

const route = express.Router();

const authenticate = require('../middlewares/authenticate');


route.post('/register', async (req, res) => {

    try {
        const alUser = await User.findOne({ email: req.body.email });
        if (alUser) {
            return res.json({ Message: "User Already Exists" })
        }
        const user = await User.create(req.body);
        const token = newToken(user);
        res.status(201).json({ user, token });
    }
    catch (e) {
        res.send(e.message)
    }
})
route.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            res.json({ message: "user not found! please register first" })
        }
        token = newToken(user)
        res.json({ message: "logged in success", token });

    }
    catch (e) {
        res.send(e.message)
    }
})
module.exports = route;