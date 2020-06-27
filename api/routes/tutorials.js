const express = require('express');
const TutorialService = require('../services/tutorials')

const tutorialService = new TutorialService();

function tutorialsApi(app){
  const router = express.Router();
  app.use('/api/tutorial', router);

  router.get('/', async function(req, res){
    try {
      const tutorials = await tutorialService.getTutorials()
      res.status(200).send({
        error: false,
        data: tutorials,
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  })

  router.get('/:tutorialId', async function(req, res){
    const { tutorialId } = req.params;
      try {
        const tutorial = await tutorialService.getTutorial({ tutorialId });
        res.status(200).send({
          error: false,
          data: tutorial,
        });
      } catch (error) {
        res.status(500).send({
          error: error,
        });
      }
  })

  router.post('/',async function(req,res){
    const {body: tutorial} = req;
    try {
      const createdTutorial = await tutorialService.createTutorial( {tutorial} );
      res.status(201).send({
        error:false,
        data: createdTutorial
      })
    } catch (error) {
      res.status(500).send({
        error: error,
      })
    }
  })

  router.put('/:tutorialId', async function(req,res){
    const { tutorialId }= req.params;
    const { body: tutorial } = req;
    try {
      const updatedTutorialId = await tutorialService.updateTutorial({
        tutorialId,
        tutorial
      })
      res.status(200).send({
        error: false,
        data: updatedTutorialId,
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  })

  router.delete('/:tutorialId', async function(req,res){
    const { tutorialId }= req.params;
    try {
      const deletedTutorialId = await tutorialService.deleteTutorial({ tutorialId })
      res.status(200).send({
        error: false,
        data: deletedTutorialId,
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      })
    }
  })
}

module.exports = tutorialsApi;