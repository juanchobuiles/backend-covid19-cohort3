const express = require('express');
const TutorialService = require('../services/tutorials')

const tutorialService = new TutorialService();

function tutorialsApi(app){
  const router = express.Router();
  app.use('/api/tutorial', router);

  router.get('/', function list(req, res){
    tutorialService.getTutorials()
      .then(data => {
        res.status(200).send({
          error: false,
          body: data,
        });
      })
      .catch(e =>{
        res.status(500).send({
          error: e,
          body: false,
        });
      })
  })

}

module.exports = tutorialsApi;