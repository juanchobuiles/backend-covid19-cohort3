const express = require('express');
const UserService = require('../services/users');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users/', router);

  const userService = new UserService();

  router.get('/:_uid', async function (req, res, next) {
    const { _uid } = req.params;
    try {
      const user = await userService.getUserUid({ _uid });
      res.status(200).json({
        data: user,
        message: 'user listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async function (req, res, next) {
    try {
      const users = await userService.getUsers();

      res.status(200).json({
        data: users,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersApi;
