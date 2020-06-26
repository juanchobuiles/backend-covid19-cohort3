const express = require("express");
const { config } = require("./config/index");

const app = express();
dotenv.config();

app.use("/user", require("./routes/user"));

app.listen(config.port, () => {
  console.log(`Servidor activo en http://localhost:${config.port}`);
});
