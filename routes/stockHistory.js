const express = require('express');
const router = express.Router();
const stockHistoryController = require('../controllers/stockHistoryController');

// Create stock history
router.post('/create', stockHistoryController.createStockHistory);

// Get all stock histories
router.get('/all', stockHistoryController.getAllStockHistories);

// Get stock history by ID
router.get('/:id', stockHistoryController.getStockHistoryById);

// Update stock history
router.put('/:id', stockHistoryController.updateStockHistory);

// Delete stock history
router.delete('/:id', stockHistoryController.deleteStockHistory);

module.exports = router;