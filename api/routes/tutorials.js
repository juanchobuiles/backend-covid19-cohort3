const express = require('express');
const TutorialService = require('../services/tutorials');

const tutorialService = new TutorialService();
const validationHandler = require('../utils/middleware/validationHandler');
const {
  tutorialIdSchema,
  createTutorialSchema,
  updateTutorialSchema,
} = require('../utils/schemas/tutorial');

function tutorialsApi(app) {
  const router = express.Router();
  app.use('/api/tutorial', router);

  router.get('/', async function (req, res) {
    try {
      const tutorials = await tutorialService.getTutorials();
      res.status(200).json({
        error: false,
        data: tutorials,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  });

  router.get(
    '/:tutorialId',
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    async function (req, res, next) {
      try {
        const { tutorialId } = req.params;
        const tutorial = await tutorialService.getTutorial({ tutorialId });
        res.status(200).json({
          error: false,
          data: tutorial,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/', validationHandler(createTutorialSchema), async function (
    req,
    res,
    next
  ) {
    const { body: tutorial } = req;
    try {
      const createdTutorial = await tutorialService.createTutorial({
        tutorial,
      });
      res.status(201).json({
        error: false,
        data: createdTutorial,
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:tutorialId',
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    validationHandler(updateTutorialSchema),
    async function (req, res, next) {
      try {
        const { tutorialId } = req.params;
        const { body: tutorial } = req;
        const updatedTutorialId = await tutorialService.updateTutorial({
          tutorialId,
          tutorial,
        });
        res.status(200).json({
          error: false,
          data: updatedTutorialId,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:tutorialId',
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    async function (req, res, next) {
      try {
        const { tutorialId } = req.params;
        const deletedTutorialId = await tutorialService.deleteTutorial({
          tutorialId,
        });
        res.status(200).json({
          error: false,
          data: deletedTutorialId,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = tutorialsApi;
