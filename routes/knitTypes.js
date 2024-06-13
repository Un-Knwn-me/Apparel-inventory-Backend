const express = require('express');
const router = express.Router();
const knitTypeController = require('../controllers/knitTypeController');

// create Inner pcs
router.post('/create', knitTypeController.createKnitType);

// update Inner pcs
router.get('/getall', knitTypeController.getAllKnitType);

// get Inner pcs by id
router.get('/:id', knitTypeController.getKnitTypeById);

// update Inner pcs
router.put('/:id', knitTypeController.updateKnitType);

// delete Inner pcs
router.delete('/:id', knitTypeController.deleteKnitType);

module.exports = router;