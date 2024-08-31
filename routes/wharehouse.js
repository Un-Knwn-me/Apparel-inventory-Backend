const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

// create warehouse
router.post('/create', warehouseController.createWarehouse);

// get all warehouse
router.get('/getall', warehouseController.getAllWarehouses);

// get warehouse by id
router.get('/:id', warehouseController.getWarehouseById);

// update warehouse
router.put('/:id', warehouseController.updateWarehouse);

// delete warehouse
router.delete('/:id', warehouseController.deleteWarehouse);

module.exports = router;