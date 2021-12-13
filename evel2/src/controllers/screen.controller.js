const express = require('express');

const Screen = require("../models/screen.model");
const route = express.Router();
route.post('', async (req, res) => {

    try {
        const screen = await Screen.create(req.body);
        res.json({ screen })
    }
    catch (e) {
        res.send(e.message)
    }
})
module.exports = route;