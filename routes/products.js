const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const { upload } = require('../middlewares/storage');
const { verifyPermission } = require('../middlewares/adminAuth');
const { DEPARTMENTS, PERMISSIONS } = require('../middlewares/constants');

// create products
router.post('/create', verifyPermission(DEPARTMENTS.PRODUCTS, PERMISSIONS.WRITE), upload.array('images', 13), productController.createProduct);

// Route to get all products
router.get('/getall', verifyPermission(DEPARTMENTS.PRODUCTS, PERMISSIONS.READ), productController.getAllProducts);

// Get product by id
router.get('/:id', verifyPermission(DEPARTMENTS.PRODUCTS, PERMISSIONS.READ), productController.getProductById);

// Get a product by its style number
router.get('/get/:style_no', verifyPermission(DEPARTMENTS.PRODUCTS, PERMISSIONS.READ), productController.getProductByStyleNumber);

// Update product by ID
router.put('/:id', verifyPermission(DEPARTMENTS.PRODUCTS, PERMISSIONS.UPDATE), upload.array('images', 13), productController.updateProductById);

// Delete product
router.delete('/:id', verifyPermission(DEPARTMENTS.PRODUCTS, PERMISSIONS.DELETE), productController.deleteProduct);

// Delete image from product
router.delete('/deleteImage/:id', verifyPermission(DEPARTMENTS.PRODUCTS, PERMISSIONS.DELETE), productController.deleteProductImageLink);

module.exports = router;