const express = require('express');
const router = express.Router();
const fabricFinishController = require('../controllers/fabricFinishController');

// create brand
router.post('/create', fabricFinishController.createFabricFinish);

// update brand
router.get('/getall', fabricFinishController.getAllFabricFinishes);

// get brand by id
router.get('/:id', fabricFinishController.getFabricFinishById);

// update brand
router.put('/:id', fabricFinishController.updateFabricFinish);

// delete brand
router.delete('/:id', fabricFinishController.deleteFabricFinish);

module.exports = router;