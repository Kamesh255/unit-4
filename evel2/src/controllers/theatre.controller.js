const express = require('express');

const Theatre = require("../models/theatre.model");
const route = express.Router();
route.post('', async (req, res) => {

    try {
        const theatre = await Theatre.create(req.body);
        res.json({ theatre })
    }
    catch (e) {
        res.send(e.message)
    }
})
module.exports = route;