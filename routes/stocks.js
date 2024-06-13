const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Create stock
router.post('/create', stockController.createStock);

// Get all stocks
router.get('/all', stockController.getAllStocks);

// Get stock by ID
router.get('/:id', stockController.getStockById);

// Update stock by ID
router.put('/:id', stockController.updateStockById);

// Delete stock by ID
router.delete('/:id', stockController.deleteStockById);

module.exports = router;