const express = require('express');
const router = express.Router();
const neckController = require('../controllers/neckController');

// create neck
router.post('/create', neckController.createNeckType);

// update neck
router.get('/getall', neckController.getAllNeckType);

// get neck by id
router.get('/:id', neckController.getNeckTypeById);

// update neck
router.put('/:id', neckController.updateNeckType);

// delete neck
router.delete('/:id', neckController.deleteNeckType);

module.exports = router;