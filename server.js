const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { config } = require('./config');
const tutorialsApi = require('./routes/tutorials');
const categoriesApi = require('./routes/category');
const usersApi = require('./routes/auth');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers.js');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
if (config.dev === 'production') {
  const corsOptions = { origin: config.urlFrontend };
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

// routes
usersApi(app);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Servidor activo en http://localhost:${config.port}`);
});
