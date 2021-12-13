const express = require('express');
const authenticate = require('../middlewares/authenticate');
const Movie = require("../models/movies.model");
const route = express.Router();
route.post('', authenticate, async (req, res) => {

    try {
        const movie = await Movie.create(req.body);
        res.json({ movie, message: "Movie Created", Admin: req.user.user.name })
    }
    catch (e) {
        res.send(e.message)
    }
})
route.get('/:actor', authenticate, async (req, res) => {

    try {
        const movies = await Movie.find({ actors: { $in: `${req.params.actor}` } });
        res.json(movies)
    }
    catch (e) {
        res.send(e.message)
    }
})
module.exports = route;