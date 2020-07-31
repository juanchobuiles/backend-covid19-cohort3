const boom = require('@hapi/boom');
const { firebaseConfig } = require('../../config/firebase');
/**
 * Middleware check token created by firebase
 */
function verifyTokenId() {
  return function (req, res, next) {
    if (!req.headers.authorization) {
      next(
        boom.badRequest('Your request does not have an authorization header')
      );
    }
    const token = req.headers.authorization.split(' ')[1];

    firebaseConfig
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        next();
      })
      .catch((error) => {
        next(boom.unauthorized(error));
      });
  };
}

module.exports = verifyTokenId;
