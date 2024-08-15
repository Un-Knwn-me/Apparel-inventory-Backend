const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

// create buyer
router.post('/create', buyerController.createBuyer);

// get all buyer
router.get('/getall', buyerController.getAllBuyers);

// get buyer by id
router.get('/:id', buyerController.getBuyerById);

// update buyer
router.put('/:id', buyerController.updateBuyer);

// delete buyer
router.delete('/:id', buyerController.deleteBuyer);

module.exports = router;