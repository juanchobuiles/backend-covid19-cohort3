const express = require('express');
const UserService = require('../services/users');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const userService = new UserService();

  router.get('/', async function (req, res, next) {
    try {
      const { _uid } = req.params;
      const users = await userService.getUsers();

      res.status(200).json({
        data: _uid,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:_uid', async function (req, res, next) {
    const { _uid } = req.params;

    try {
      // const movies = await userService.getMovie({ movieId });

      res.status(200).json({
        data: _uid,
        message: 'movie retrieved',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersApi;
