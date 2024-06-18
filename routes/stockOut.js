const express = require('express');
const router = express.Router();
const stockHistoryController = require('../controllers/stockHistoryController');

// Stock out route
router.post('/create', CreateStockOut.stockOut);

// get all stock out history
router.get('/all', stockHistoryController.getAllStockOut);

// get stock out by i'd
router.get('/:id', stockHistoryController.getStockOutById);

// update stock out by id
router.put('/stock-out/:id', stockHistoryController.updateStockOutById);

// delete stock out by id
router.delete('/stock-out/:id', stockHistoryController.deleteStockOutById);

module.exports = router;
