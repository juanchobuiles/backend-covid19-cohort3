const express = require('express');
const UserService = require('../services/users');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const userService = new UserService();

  router.get('/:userId', async function (req, res, next) {
    console.log({ userId });
    const { userId } = req.params;
    try {
      const users = userService.mongoDb.getOne({ userId });
      res.status(200).json({
        data: users,
        message: 'movie retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  // router.get('/', async function (req, res, next) {
  //   try {
  //     console.log(req.params);
  //     const users = await userService.getUsers();

  //     res.status(200).json({
  //       data: users,
  //       message: 'users listed',
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // });
}

module.exports = usersApi;
