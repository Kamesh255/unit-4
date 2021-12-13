const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_photo_url: { type: String, required: true },
    roles: { type: String, required: true },
})
module.exports = mongoose.model("user", userSchema);