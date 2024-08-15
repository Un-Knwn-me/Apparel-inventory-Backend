const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/referenceController');

// create reference
router.post('/create', referenceController.createReferenceNo);

// update reference
router.get('/getall', referenceController.getAllReference);

// get reference by id
router.get('/:id', referenceController.getReferenceById);

// update reference
router.put('/:id', referenceController.updateReference);

// delete reference
router.delete('/:id', referenceController.deleteReference);

module.exports = router;