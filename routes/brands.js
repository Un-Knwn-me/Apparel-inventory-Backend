const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// create brand
router.post('/create', brandController.createBrand);

// update brand
router.get('/getall', brandController.getAllBrands);

// get brand by id
router.get('/:id', brandController.getBrandById);

// update brand
router.put('/:id', brandController.updateBrand);

// delete brand
router.delete('/:id', brandController.deleteBrand);

module.exports = router;