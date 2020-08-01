const mongoose = require('mongoose');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.dbName = DB_NAME;
    this.handleCon();
    this.schemas = {
      Auth: require('../utils/models/auth'),
      User: require('../utils/models/user'),
    };
  }

  // Singleton implementation to connect database
  handleCon() {
    if (!MongoLib.connection) {
      MongoLib.connection = mongoose
        .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          console.log('[DB] Success contected');
        })
        .catch((reject) => {
          console.log(`[DB] fail contected ${reject}`);
        });
      mongoose.set('useFindAndModify', false);
    }
    return MongoLib.connection;
  }

  // A helper to build a Model in excution time
  createModel(collection) {
    const schema = this.schemas[collection];
    const Model = mongoose.model(collection, schema);
    return Model;
  }

  /**
   * Here are all operations CRUD to operate over MongoDB
   */
  async getAll(model, query) {
    const Model = this.createModel(model);
    try {
      const listData = await Model.find(query);
      return listData;
    } catch (error) {
      return error;
    }
  }

  async getOne(model, data) {
    const Model = this.createModel(model);
    try {
      const listData = await Model.findOne(data);
      return listData;
    } catch (error) {
      return error;
    }
  }

  async get(model, id) {
    const Model = this.createModel(model);
    try {
      const listData = await Model.findById(id);
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
