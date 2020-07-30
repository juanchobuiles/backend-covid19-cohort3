const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//Services
const UserService = require('../services/users');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema, _uidSchema } = require('../utils/schemas/user');

const { config } = require('../config');

//Basic Strategy
require('../utils/auth/strategies/basic');

function usersApi(app) {
  const router = express.Router();

  app.use('/api/auth', router);
  const userService = new UserService();

  // Login
  router.post('/sign-in', (req, res, next) => {
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const { user_id: id, email } = user;
          const payload = {
            sub: id,
            email,
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });
          return res.status(200).json({ token, user: { id, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  // Third party Login
  router.post('/sign-provider', async function (req, res, next) {
    const body = req;
    const { body: user } = body;

    try {
      const queriedUser = await userService.getOrCreateuser({ user });
      const { _id: id, email } = queriedUser;

      const payload = {
        sub: id,
        email,
      };
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: '15m',
      });

      return res.status(200).json({ token, user: { id, email } });
    } catch (error) {
      next(error);
    }
  });

  // Register
  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const createdUserId = await userService.createUser({ user });
        res.status(201).json({
          data: createdUserId,
          message: 'user created',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = usersApi;
