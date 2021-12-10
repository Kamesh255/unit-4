const express = require('express');
const MarkEval = require("../models/marks.model");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const evaluation = await MarkEval.find().populate({
      path: 'student_id',
      populate: {
        path: 'user_id'
      }
    });
    return res.send(evaluation);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.post("", async (req, res) => {
  try {
    const evaluation = await MarkEval.create(req.body)
    return res.send(evaluation);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.get("/highest", async (req, res) => {
  try {
    const evaluation = await MarkEval.find().populate({
      path: 'student_id',
      populate: {
        path: 'user_id'
      }
    }).sort({ marks: -1 });
    return res.send(evaluation[0]);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router; 