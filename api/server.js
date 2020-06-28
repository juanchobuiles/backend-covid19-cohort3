const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('./config');
const tutorialsApi = require('./routes/tutorials');

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
tutorialsApi(app);

app.listen(config.port, () => {
  console.log(`Servidor activo en http://localhost:${config.port}`);
});
