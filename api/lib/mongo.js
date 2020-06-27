const mongoose = require('mongoose');
const { config } = require('../config');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI= `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib{
  constructor(){mongoose
    this.dbName = DB_NAME;
    this.handleCon();
    this.schemas = {
      // banner: require('./models/banner'),
      tutorial: require('../utils/models/tutorial'),
    };
  }

  handleCon(){
    mongoose.connect(MONGO_URI , { useNewUrlParser : true, useUnifiedTopology: true })
      .then(() => {
        console.log('[DB] Success contected')
      })
      .catch((reject) => {
        console.log(`[DB] fail contected ${reject}`)
      })
    mongoose.set('useFindAndModify', false);
  }

  async getAll(model){
    const schema = this.schemas[model];
    let UserModel = mongoose.model(model, schema);
    try {
      const listData = await UserModel.find()
      return listData;
    } catch (error) {
      return error
    }
  };

}

module.exports = MongoLib;