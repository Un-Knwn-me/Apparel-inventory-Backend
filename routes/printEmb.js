const express = require('express');
const router = express.Router();
const printEmbController = require('../controllers/printEmbController');

// create print EMB
router.post('/create', printEmbController.createPrintEmb);

// get all print EMB
router.get('/getall', printEmbController.getAllPrintEmb);

// get print EMB by id
router.get('/:id', printEmbController.getPrintEmbById);

// update print EMB
router.put('/:id', printEmbController.updatePrintEmb);

// delete print EMB
router.delete('/:id', printEmbController.deletePrintEmb);

module.exports = router;