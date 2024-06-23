const express = require('express');
const router = express.Router();
const stitchDetailController = require('../controllers/stitchDetailController');

// Create stitch detail
router.post('/create', stitchDetailController.createStitchDetail);

// Get all stitch details
router.get('/getall', stitchDetailController.getAllStitchDetails);

// Get stitch detail by id
router.get('/:id', stitchDetailController.getStitchDetailById);

// Update stitch detail
router.put('/:id', stitchDetailController.updateStitchDetail);

// Delete stitch detail
router.delete('/:id', stitchDetailController.deleteStitchDetail);

module.exports = router;
