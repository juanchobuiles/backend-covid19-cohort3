const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const { PORT } = process.env;

app.get("/", (request, response) => {
  response.send("!Hola mundo!");
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
