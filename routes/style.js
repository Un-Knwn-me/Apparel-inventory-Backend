const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

// Create style
router.post('/create', styleController.createStyle);

// Get all styles
router.get('/', styleController.getAllStyles);

// Get style by id
router.get('/:id', styleController.getStyleById);

// Update style
router.put('/:id', styleController.updateStyle);

// Delete style
router.delete('/:id', styleController.deleteStyle);

module.exports = router;