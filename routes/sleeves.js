const express = require('express');
const router = express.Router();
const sleeveController = require('../controllers/sleeveController');

// Create sleeve
router.post('/create', sleeveController.createSleeve);

// Get all sleeves
router.get('/getall', sleeveController.getAllSleeves);

// Get sleeve by id
router.get('/:id', sleeveController.getSleeveById);

// Update sleeve
router.put('/:id', sleeveController.updateSleeve);

// Delete sleeve
router.delete('/:id', sleeveController.deleteSleeve);

module.exports = router;
