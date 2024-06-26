const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// create color
router.post('/create', categoryController.createCategory);

// update color
router.get('/getall', categoryController.getAllCategory);

// get color by id
router.get('/:id', categoryController.getCategoryById);

// update color
router.put('/:id', categoryController.updateCategory);

// delete color
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;