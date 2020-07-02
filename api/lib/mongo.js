const mongoose = require('mongoose');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    mongoose;
    this.dbName = DB_NAME;
    this.handleCon();
    this.schemas = {
      // banner: require('./models/banner'),
      tutorial: require('../utils/models/tutorial'),
      categories: require('../utils/models/category'),
    };
  }

  handleCon() {
    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('[DB] Success contected');
      })
      .catch((reject) => {
        console.log(`[DB] fail contected ${reject}`);
      });
    mongoose.set('useFindAndModify', false);
  }

  createModel(collection) {
    const schema = this.schemas[collection];
    const Model = mongoose.model(collection, schema);
    return Model;
  }

  async getAll(model) {
    const Model = this.createModel(model);
    try {
      const listData = await Model.find();
      return listData;
    } catch (error) {
      return error;
    }
  }

  async get(model, movieid) {
    const Model = this.createModel(model);
    try {
      const listData = await Model.findById(movieid);
      return listData;
    } catch (error) {
      return error;
    }
  }

  async create(model, data) {
    const Model = this.createModel(model);
    try {
      const createdData = await Model(data).save();
      return createdData;
    } catch (error) {
      return error;
    }
  }

  async update(model, id, data) {
    const Model = this.createModel(model);
    try {
      const updatedData = await Model.findByIdAndUpdate(id, data);
      return updatedData;
    } catch (error) {
      return error;
    }
  }

  async delete(model, tutorialId) {
    const Model = this.createModel(model);
    try {
      const deletedData = await Model.findByIdAndDelete(tutorialId);
      return deletedData;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MongoLib;
