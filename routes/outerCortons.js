const express = require('express');
const router = express.Router();
const outerCortonController = require('../controllers/outerCortonController');

// create Outer Corton pcs
router.post('/create', outerCortonController.createOuterCortonPcs);

// update Outer Corton pcs
router.get('/getall', outerCortonController.getAllOuterCortonPcs);

// get Outer Corton pcs by id
router.get('/:id', outerCortonController.getOuterCortonPcsById);

// update Outer Corton pcs
router.put('/:id', outerCortonController.updateOuterCortonPcs);

// delete Outer Corton pcs
router.delete('/:id', outerCortonController.deleteOuterCortonPcs);

module.exports = router;