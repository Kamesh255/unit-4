const mongoose = require('mongoose');

const evaluationSchema = mongoose.Schema({
    date_of_evaluation: { type: String, required: true },
    instructor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    topic_name: { type: String, required: true },
    student_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true
      },
    ]
  },{
    versionKey:false
  })
 module.exports = mongoose.model('eval', evaluationSchema); 