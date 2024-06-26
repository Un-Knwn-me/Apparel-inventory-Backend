const express = require('express');
const router = express.Router();
const stockOutController = require('../controllers/stockOutController');
const { verifyPermission } = require('../middlewares/adminAuth');
const { DEPARTMENTS, PERMISSIONS } = require('../middlewares/constants');

// Stock out route
router.post('/create', verifyPermission(DEPARTMENTS.STOCK_OUT, PERMISSIONS.WRITE), stockOutController.CreateStockOut);

// get all stock out history
router.get('/get/all', verifyPermission(DEPARTMENTS.STOCK_OUT, PERMISSIONS.READ), stockOutController.getAllStockOut);

// get stock out by i'd
router.get('/:id', verifyPermission(DEPARTMENTS.STOCK_OUT, PERMISSIONS.READ), stockOutController.getStockOutById);

// update stock out by id
router.put('/:id', verifyPermission(DEPARTMENTS.STOCK_OUT, PERMISSIONS.UPDATE), stockOutController.updateStockOut);

// delete stock out by id
router.delete('/:id', verifyPermission(DEPARTMENTS.STOCK_OUT, PERMISSIONS.DELETE), stockOutController.deleteStockOutById);

module.exports = router;