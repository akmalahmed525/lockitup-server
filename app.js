const express = require("express");

const lockRouter = require("./routes/lock");
const sessionRouter = require("./routes/session");

const { collection } = require("./db");
const { getVerifiedTokenData } = require("./utils/core");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database collection
app.set("collection", collection);

app.use("/session", sessionRouter);
app.use(async (req, res, next) => {
  const auth = req.get("Authorization");
  const [_, token] = auth.split(" ");

  const { error } = await getVerifiedTokenData(token);
  // const { data } = payload;
  if (error) {
    const response = {
      error: true,
      message: "",
      data: null
    };
    return res.status(401).json(response);
  }

  const collection = req.app.get("collection");
  const deviceObj = collection.findOne({ token });

  if (!deviceObj) {
    const response = {
      error: true,
      message: "device not registered",
      data: null
    };
    return res.status(401).json(response);
  }
  next();
});
app.use("/lock", lockRouter);

module.exports = app;
