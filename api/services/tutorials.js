const MongoLib = require('../lib/mongo');

class TutorialService {
  constructor() {
    this.collection = 'tutorial';
    this.mongoDb = new MongoLib();
  }

  async getTutorials() {
    const movies = await this.mongoDb.getAll(this.collection);
    return movies || [];
  }

  async getTutorial({ tutorialId }) {
    const movie = await this.mongoDb.get(this.collection, tutorialId);
    return movie || [];
  }

  async createTutorial({ tutorial }) {
    const createdTutorialId = await this.mongoDb.create(
      this.collection,
      tutorial
    );
    return createdTutorialId;
  }

  async updateTutorial({ tutorialId, tutorial } = {}) {
    const updatedTutorialId = await this.mongoDb.update(
      this.collection,
      tutorialId,
      tutorial
    );
    return updatedTutorialId || [];
  }

  async deleteTutorial({ tutorialId }) {
    const deletedTutorialId = await this.mongoDb.delete(
      this.collection,
      tutorialId
    );
    return deletedTutorialId;
  }
}

module.exports = TutorialService;
