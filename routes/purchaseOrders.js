const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');
const { verifyPermission } = require('../middlewares/adminAuth');
const { DEPARTMENTS, PERMISSIONS } = require('../middlewares/constants');

// Create purchase order
router.post('/create', verifyPermission(DEPARTMENTS.PURCHASE_ORDER, PERMISSIONS.WRITE), purchaseOrderController.createPurchaseOrder);

// Get all purchase orders
router.get('/all', verifyPermission(DEPARTMENTS.PURCHASE_ORDER, PERMISSIONS.READ), purchaseOrderController.getAllPurchaseOrders);

// Get purchase order by ID
router.get('/:id', verifyPermission(DEPARTMENTS.PURCHASE_ORDER, PERMISSIONS.READ), purchaseOrderController.getPurchaseOrderById);

// Update purchase order by ID
router.put('/:id', verifyPermission(DEPARTMENTS.PURCHASE_ORDER, PERMISSIONS.UPDATE), purchaseOrderController.updatePurchaseOrderById);

// Delete purchase order by ID
router.delete('/:id', verifyPermission(DEPARTMENTS.PURCHASE_ORDER, PERMISSIONS.DELETE), purchaseOrderController.deletePurchaseOrderById);

// Get the purchase order by order type
router.get('/type/:order_type', verifyPermission(DEPARTMENTS.PURCHASE_ORDER, PERMISSIONS.READ), purchaseOrderController.getPurchaseOrdersByType);

module.exports = router;