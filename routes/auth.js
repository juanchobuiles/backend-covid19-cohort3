const express = require('express');
const userService = require('../services/users');

function usersApi(app) {
  const router = express.Router();
  app('/api/auth', router);

  const usersService =  new UsersService();

  // Login
  router.post('/sign-in', (req, res, next) => {

  });

  // Register
  router.post('/sign-up', async (req,res, next) => {
    const {body: user} = req;
    try {
      const createdUserId = await userService.createdUser( { user })
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
