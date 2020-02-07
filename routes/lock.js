const express = require("express");
const router = express.Router();
const lockSystem = require('lock-system');

router.post("/", (req, res) => {
  const { body } = req;
  if (!body.lockDevice) {
    return res
      .status(400)
      .json({ error: true, message: "invalid command", data: null });
  }
  lockSystem();
  res.status(201).json({ error: false, message: "pc locked", data: null });
});

module.exports = router;
