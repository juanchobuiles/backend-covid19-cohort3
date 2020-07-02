const express = require('express');
const CategoryService = require('../services/category');

const categoryService = new CategoryService();
const validationHandler = require('../utils/middleware/validationHandler');
const {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
} = require('../utils/schemas/category');

function categoriesApi(app) {
  const router = express.Router();
  app.use('/api/categories', router);

  router.get('/', async function (req, res) {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json({
        error: false,
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  });

  router.get(
    '/:categoryId',
    validationHandler({ categoryId: categoryIdSchema }, 'params'),
    async function (req, res, next) {
      try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategory({ categoryId });
        res.status(200).json({
          error: false,
          data: category,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/', validationHandler(createCategorySchema), async function (
    req,
    res,
    next
  ) {
    const { body: category } = req;
    try {
      const createdCategory = await categoryService.createCategory({
        category,
      });
      res.status(201).json({
        error: false,
        data: createdCategory,
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:categoryId',
    validationHandler({ categoryId: categoryIdSchema }, 'params'),
    validationHandler(updateCategorySchema),
    async function (req, res, next) {
      try {
        const { categoryId } = req.params;
        const { body: tutorial } = req;
        const updatedCategoryId = await categoryService.updateTutorial({
          categoryId,
          tutorial,
        });
        res.status(200).json({
          error: false,
          data: updatedCategoryId,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:categoryId',
    validationHandler({ categoryId: categoryIdSchema }, 'params'),
    async function (req, res, next) {
      try {
        const { categoryId } = req.params;
        const deletedCategoryId = await categoryService.deleteTutorial({
          categoryId,
        });
        res.status(200).json({
          error: false,
          data: deletedCategoryId,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = categoriesApi;
