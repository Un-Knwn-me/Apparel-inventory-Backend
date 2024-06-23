const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/sizeController');

// Create size
router.post('/create', sizeController.createSize);

// Get all sizes
router.get('/getall', sizeController.getAllSizes);

// Get size by id
router.get('/:id', sizeController.getSizeById);

// Update size
router.put('/:id', sizeController.updateSize);

// Delete size
router.delete('/:id', sizeController.deleteSize);

module.exports = router;
