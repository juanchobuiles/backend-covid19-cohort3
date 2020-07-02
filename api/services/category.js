const MongoLib = require('../lib/mongo');

class CategoryService {
  constructor() {
    this.collection = 'categories';
    this.mongoDb = new MongoLib();
  }

  async getCategories() {
    const movies = await this.mongoDb.getAll(this.collection);
    return movies || [];
  }

  async getCategory({ categoryId }) {
    const movie = await this.mongoDb.get(this.collection, categoryId);
    return movie || [];
  }

  async createCategory({ category }) {
    const createdCategoryId = await this.mongoDb.create(
      this.collection,
      category
    );
    return createdCategoryId;
  }

  async updateCategory({ categoryId, category } = {}) {
    const updatedCategoryId = await this.mongoDb.update(
      this.collection,
      categoryId,
      category
    );
    return updatedCategoryId || [];
  }

  async deleteCategory({ categoryId }) {
    const deletedCategoryId = await this.mongoDb.delete(
      this.collection,
      categoryId
    );
    return deletedCategoryId;
  }
}

module.exports = CategoryService;
