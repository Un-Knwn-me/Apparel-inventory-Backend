const express = require('express');
const router = express.Router();
const innerPcsController = require('../controllers/innerPcsController');

// create Inner pcs
router.post('/create', innerPcsController.createInnerPcs);

// update Inner pcs
router.get('/getall', innerPcsController.getAllInnerPcs);

// get Inner pcs by id
router.get('/:id', innerPcsController.getInnerPcsById);

// update Inner pcs
router.put('/:id', innerPcsController.updateInnerPcs);

// delete Inner pcs
router.delete('/:id', innerPcsController.deleteInnerPcs);

module.exports = router;