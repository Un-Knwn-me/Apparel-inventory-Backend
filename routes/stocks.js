const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { DEPARTMENTS, PERMISSIONS } = require('../middlewares/constants');
const { verifyPermission } = require('../middlewares/adminAuth');

// Create stock In entry
router.post('/create', verifyPermission(DEPARTMENTS.STOCK_IN, PERMISSIONS.WRITE), stockController.createStockEntry);

// Get all stock In
router.get('/stockIn/all', verifyPermission(DEPARTMENTS.STOCK_IN, PERMISSIONS.READ), stockController.getAllStockIn);

// Get stock In by ID
router.get('/stockIn/:id', verifyPermission(DEPARTMENTS.STOCK_IN, PERMISSIONS.READ), stockController.getStockInById);

// Update stock In by ID
router.put('/stockIn/:id', verifyPermission(DEPARTMENTS.STOCK_IN, PERMISSIONS.UPDATE), stockController.updateStockInById);

// Delete stock by ID
router.delete('/stockIn/:id', verifyPermission(DEPARTMENTS.STOCK_IN, PERMISSIONS.DELETE), stockController.deleteStockInById);

module.exports = router;