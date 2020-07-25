const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService{
  constructor(){
    this.UserModel = 'User';
    this.AuthModel = 'Auth';
    this.mongoDb = new MongoLib();
  }

  async getUser({ email }){
    const [ user ] = await this.mongoDb.getAll(this.AuthModel, { email })
    return user;
  }

  /**
   * Create a user, this operate over two models
   * to implement a security layer at querys login
   */
  async createUser({ user }){
    const { email,
            password,
            first_name,
            last_name,
            years_old,
            country,
            city } = user;
    const hashedPassword = await bcrypt.hash(password, 8);

    const createUserId = await this.mongoDb.create(this.UserModel, {
      first_name,
      last_name,
      years_old,
      country,
      city
    });
    const createAuthId = await this.mongoDb.create(this.AuthModel, {
      email,
      password: hashedPassword,
      user_id: createUserId,
    })
    return createUserId;
  }

  async getOrCreateuser({ user }){
    const queriedUser = await this.getUser({ email: user.email })
    if(queriedUser){
      return queriedUser;
    }

    await this.createUser({user});
    return await this.getUser({ email: user.email});
  }
}

module.exports = UsersService;