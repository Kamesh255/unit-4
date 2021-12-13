const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({

    name: { type: String, required: true },
    actors: [{ type: String, required: true }],
    languages: [{ type: String, required: true }],
    directors: [{ type: String, required: true }],
    poster_url: { type: String, required: true },
})
module.exports = mongoose.model("movie", movieSchema);