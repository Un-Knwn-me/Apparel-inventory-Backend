const express = require('express');
const router = express.Router();
const packingMethodController = require('../controllers/packingMethodController');

// create packing method
router.post('/create', packingMethodController.createPackingMethod);

// get all packing method
router.get('/getall', packingMethodController.getAllPackingMethod);

// get packing method by id
router.get('/:id', packingMethodController.getPackingMethodById);

// update packing method
router.put('/:id', packingMethodController.updatePackingMethod);

// delete packing method
router.delete('/:id', packingMethodController.deletePackingMethod);

module.exports = router;