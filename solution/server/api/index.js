const express = require("express");
const app = express();
const cors = require("cors");

// enabling all cors requests
app.use(cors());

const object = require("./db.json");

app.get("*", (req, res) => {
  res.json(object);
});

app.listen();
