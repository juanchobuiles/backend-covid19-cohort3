const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const AuthService = require('../services/users');
const { config } = require('../config')

//Basic Strategy
require('../utils/auth/strategies/basic');

function usersApi(app) {
  const router = express.Router();

  app.use('/api/auth', router);
  const authService =  new AuthService();

  // Login
  router.post('/sign-in', (req, res, next) => {
    passport.authenticate('basic', function(error, user){
      try {
        if(error || !user){

          next(boom.unauthorized());
        }
        req.login( user, { session: false }, async function(error){
          if(error){
            next(error);
          }

          const { user_id:id, email } = user;
          const payload = {
            sub: id,
              email,
          }
          const token = jwt.sign(payload, config.authJwtSecret, {expiresIn: '15m'});
          return res.status(200).json({ token, user: {id, email}});
        })
      } catch (error) {
        next(error)
      }
    })(req, res, next);
  });

  router.post(
    '/sign-provider',
    async function(req ,res ,next ){
      const body = req;
      const { body: user } = body;

      try {
        const queriedUser = await authService.getOrCreateuser({ user });
        console.log(queriedUser);
        const {_id: id, email } = queriedUser;

        const payload = {
          sub: id,
          email,
        }
        const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' });

        return res.status(200).json({ token, user:{id, email}})
      } catch (error) {
        next(error)
      }
  });

  // Register
  router.post('/sign-up', async (req,res, next) => {
    const {body: user} = req;
    try {
      const createdUserId = await authService.createUser( { user })
      res.status(201).json({
        data: createdUserId,
        message: 'user created',
      })
    } catch (error) {
      next(error)
    }
  });
}

module.exports = usersApi;
