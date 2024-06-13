const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

// create products
router.post('/create', productController.createProduct);

// Route to get all products
router.get('/all', productController.getAllProducts);

// Get product by id
router.get('/:id', productController.getProductById);

// Update product by ID
router.put('/:id', productController.updateProductById);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;