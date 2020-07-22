const express = require("express");
const router = express.Router();
var app = express();

router.get("/", (req, res) => {
  res.json({
    data: "Hola mundo",
  });
});

module.exports = router;
