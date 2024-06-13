const express = require('express');
const router = express.Router();
const fabricController = require('../controllers/fabricController');

// create brand
router.post('/create', fabricController.createFabric);

// update brand
router.get('/getall', fabricController.getAllFabrics);

// get brand by id
router.get('/:id', fabricController.getFabricById);

// update brand
router.put('/:id', fabricController.updateFabric);

// delete brand
router.delete('/:id', fabricController.deleteFabric);

module.exports = router;