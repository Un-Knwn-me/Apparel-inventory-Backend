const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');

// create color
router.post('/create', colorController.createColor);

// update color
router.get('/getall', colorController.getAllColors);

// get color by id
router.get('/:id', colorController.getColorById);

// update color
router.put('/:id', colorController.updateColor);

// delete color
router.delete('/:id', colorController.deleteColor);

module.exports = router;