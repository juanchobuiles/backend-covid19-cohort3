const MongoLib = require('../lib/mongo')

class TutorialService{
  constructor(){
    this.collection = 'tutorial'
    this.mongoDb = new MongoLib();
  }

  async getTutorials() {
    console.log(this.collection)
    const movies = await this.mongoDb.getAll(this.collection);
    return movies || [];
  }

}

module.exports= TutorialService;
