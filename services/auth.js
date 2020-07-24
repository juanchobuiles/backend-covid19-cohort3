const MongoLib = require('../lib/mongo');

class AuthService{
  constructor(){
    this.AuthModel = 'auth';
    this.mongoDb = new MongoLib();
  }

  async getUser({ email }){
    console.log(email)
    const [user] = await this.mongoDb.getAll(this.AuthModel,
      { email }
      // { path: 'user_id', select: 'first_name'}
    )
    return user;
  }
}



module.exports = AuthService;