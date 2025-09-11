const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} = require('../controllers/productController');
const {
  getTestProducts,
  getTestCategories,
  getTestProduct
} = require('../controllers/testController');

const router = express.Router();

// Validation middleware
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['shoes', 'clothes', 'accessories', 'electronics', 'home', 'beauty'])
    .withMessage('Invalid category'),
  body('colors')
    .isArray({ min: 1 })
    .withMessage('At least one color must be specified'),
  body('sizes')
    .isArray({ min: 1 })
    .withMessage('At least one size must be specified'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image must be provided')
];

// Public routes (always use MongoDB now)
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);

// Admin routes (TODO: Add authentication middleware)
router.post('/', productValidation, createProduct);
router.put('/:id', productValidation, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

