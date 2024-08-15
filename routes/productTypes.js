const express = require('express');
const router = express.Router();
const productTypesController = require('../controllers/productTypesController');

// Create Product Type
router.post('/create', productTypesController.createProductType);

// Get all Product Types
router.get('/getall', productTypesController.getAllProductTypes);

// Get Product Type by ID
router.get('/:id', productTypesController.getProductTypeById);

// Update Product Type
router.put('/:id', productTypesController.updateProductType);

// Delete Product Type
router.delete('/:id', productTypesController.deleteProductType);

module.exports = router;
