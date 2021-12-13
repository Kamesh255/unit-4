const express = require('express');
const Show = require("../models/show.model");
const route = express.Router();
route.post('', async (req, res) => {

    try {
        const show = await Show.create(req.body);
        res.json({ show })
    }
    catch (e) {
        res.send(e.message)
    }
})
route.get('/:movie', async (req, res) => {

    try {
        const shows = await Show.find({ movie: req.params.movie });
        res.json({ shows })
    }
    catch (e) {
        res.send(e.message)
    }
})

module.exports = route;