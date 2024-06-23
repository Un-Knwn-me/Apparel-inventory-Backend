const express = require('express');
const router = express.Router();
const stockOutController = require('../controllers/stockOutController');

// Stock out route
router.post('/create', stockOutController.CreateStockOut);

// get all stock out history
router.get('/get/all', stockOutController.getAllStockOut);

// get stock out by i'd
router.get('/:id', stockOutController.getStockOutById);

// update stock out by id
router.put('/:id', stockOutController.updateStockOut);

// delete stock out by id
router.delete('/:id', stockOutController.deleteStockOutById);

module.exports = router;