const express = require("express");
const app = express();

const object = require("./db.json");

app.get("*", (req, res) => {
  res.json(object);
});

app.listen();
