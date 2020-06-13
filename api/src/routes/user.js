const express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.json({
    data: "Hola mundo",
  });
});
