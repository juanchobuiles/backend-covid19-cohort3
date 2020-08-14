const express = require('express');

//Services
const TestService = require('../services/test');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');

const { createTestSchema, testIdSchema } = require('../utils/schemas/test');

function TestApi(app) {
  const router = express.Router();
  app.use('/api/test/', router);

  const testService = new TestService();

  router.get('/:id_user', async function (req, res, next) {
    const { id_user } = req.params;
    try {
      const test = await testService.getTestByIdUser(id_user);
      res.status(200).json({
        status: 200,
        data: test,
        message: 'test by user listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/', async function (req, res, next) {
    try {
      const tests = await testService.getTests();
      res.status(200).json({
        status: 200,
        data: tests,
        message: 'test listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createTestSchema), async function (
    req,
    res,
    next
  ) {
    const { body: data } = req;
    try {
      const createTestByUser = await testService.createTest({ data });
      res.status(201).json({
        status: 201,
        data: createTestByUser,
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = TestApi;
