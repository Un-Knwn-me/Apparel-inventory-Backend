const express = require('express');
const router = express.Router();
const lengthController = require('../controllers/lengthController');

// create length
router.post('/create', lengthController.createLengthType);

// update length
router.get('/getall', lengthController.getAllLengthType);

// get length by id
router.get('/:id', lengthController.getLengthTypeById);

// update length
router.put('/:id', lengthController.updateLengthType);

// delete length
router.delete('/:id', lengthController.deleteLengthType);

module.exports = router;