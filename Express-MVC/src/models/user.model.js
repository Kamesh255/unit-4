const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    gender: { type: String, required: false, default: "Male" },
    date_of_birth: { type: Date, required: true },
  },
    {
      versionKey: false,
    }
  )
  module.exports = mongoose.model("user", userSchema) 