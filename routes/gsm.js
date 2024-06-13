const express = require('express');
const router = express.Router();
const gsmController = require('../controllers/gsmController');

// create brand
router.post('/create', gsmController.createGsm);

// update brand
router.get('/getall', gsmController.getAllGsms);

// get brand by id
router.get('/:id', gsmController.getGsmById);

// update brand
router.put('/:id', gsmController.updateGsm);

// delete brand
router.delete('/:id', gsmController.deleteGsm);

module.exports = router;