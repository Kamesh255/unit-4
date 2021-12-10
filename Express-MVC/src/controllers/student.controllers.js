const express = require('express');
const Student = require('../models/student.model');
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const students = await Student.find().populate("user_id").lean().exec();
    return res.send(students);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.send(student);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
module.exports = router; 