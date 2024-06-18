const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');

// Create purchase order
router.post('/create', purchaseOrderController.createPurchaseOrder);

// Get all purchase orders
router.get('/all', purchaseOrderController.getAllPurchaseOrders);

// Get purchase order by ID
router.get('/:id', purchaseOrderController.getPurchaseOrderById);

// Update purchase order by ID
router.put('/:id', purchaseOrderController.updatePurchaseOrderById);

// Delete purchase order by ID
router.delete('/:id', purchaseOrderController.deletePurchaseOrderById);

// Get the purchase order by order type
router.get('/type/:order_type', purchaseOrderController.getPurchaseOrdersByType);

module.exports = router;