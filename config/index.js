require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  urlFrontend: process.env.URL_FRONTEND,
  private_key_id: process.env.PRIVATE_KEY_ID,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
};

module.exports = { config };
