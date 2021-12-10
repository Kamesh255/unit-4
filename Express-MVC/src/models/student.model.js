const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    roll_number: { type: String, required: true },
    current_batch: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
    {
      versionKey: false
    })
  module.exports = mongoose.model('student', studentSchema);