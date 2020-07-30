const MongoLib = require('../lib/mongo');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.UserModel = 'User';
    this.AuthModel = 'Auth';
    this.mongoDb = new MongoLib();
  }

  async getUsers() {
    const users = await this.mongoDb.getAll(this.UserModel);
    return users || [];
  }

  // async getUser({ email }) {
  //   const [user] = await this.mongoDb.getAll(this.AuthModel, { email });
  //   return user;
  // }

  async getUserUid({ _uid }) {
    const [user] = await this.mongoDb.getOne(this.AuthModel, { _uid });
    return user;
  }

  /**
   * Create a user, this operate over two models
   * to implement a security layer at querys login
   */
  async createUser({ user }) {
    const { _uid, first_name, last_name, years_old, country, city } = user;
    const createUserId = await this.mongoDb.create(this.UserModel, {
      _uid,
      first_name,
      last_name,
      years_old,
      country,
      city,
    });
    console.log(createUserId);

    return createUserId;
  }

  async getOrCreateuser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });
    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
  }
}

module.exports = UsersService;
