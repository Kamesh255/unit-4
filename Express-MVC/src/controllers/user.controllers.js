const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
module.exports = router; 