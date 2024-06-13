const express = require('express');
const router = express.Router();
const decorationController = require('../controllers/decorationController');

// create color
router.post('/create', decorationController.createDecoration);

// update color
router.get('/getall', decorationController.getAllDecorations);

// get color by id
router.get('/:id', decorationController.getDecorationById);

// update color
router.put('/:id', decorationController.updateDecoration);

// delete color
router.delete('/:id', decorationController.deleteDecoration);

module.exports = router;