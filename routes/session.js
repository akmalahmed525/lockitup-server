const express = require("express");
const router = express.Router();

const deviceSchema = require("../db/models/device.json");

const { validate } = require("../utils/validator");
const { generateToken } = require("../utils/core");

router.post("/", async (req, res) => {
  const { body } = req;
  const { error, params } = validate(deviceSchema, body);

  if (error) {
    const missingKeys = params.map(items => items.params);
    const response = {
      error,
      message: "model validation failed",
      data: missingKeys
    };
    return res.status(400).json(response);
  }

  const token = await generateToken(body);
  const collection = req.app.get("collection");
  const { deviceId } = body;
  collection.insert({ deviceId, token });

  const data = { deviceId, token };

  return res.status(201).json({
    error: false,
    message: "session created",
    data
  });
});

module.exports = router;
