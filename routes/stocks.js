const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Create stock In entry
router.post('/create', stockController.createStockEntry);

// Get all stock In
router.get('/stockIn/all', stockController.getAllStockIn);

// Get stock In by ID
router.get('/stockIn/:id', stockController.getStockInById);

// Update stock In by ID
router.put('/stockIn/:id', stockController.updateStockInById);

// Delete stock by ID
router.delete('/stockIn/:id', stockController.deleteStockInById);

module.exports = router;