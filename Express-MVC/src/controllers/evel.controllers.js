const express = require('express');
const Evaluation = require('../models/evel.model')
const Student = require('../models/student.model');
const router = express.Router();

router.get("/evals", async (req, res) => {
  try {
    const evaluation = await Evaluation.find()
      .populate("instructor_id").lean().exec();

    return res.send(evaluation);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//Find students who have given particular evaluation
router.get("/:eval_id/students", async (req, res) => {
  try {
    const evaluation = await Evaluation.findOne({ _id: req.params.eval_id }).lean().exec();
    const records = await Student.find().where("_id").in(evaluation.student_id).exec();
    return res.send(records);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


router.post("/evals", async (req, res) => {
  try {
    const evaluation = await Evaluation.create(req.body);

    return res.send(evaluation);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
module.exports = router; 