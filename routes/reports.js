const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { DEPARTMENTS, PERMISSIONS } = require('../middlewares/constants');
const { verifyPermission } = require('../middlewares/adminAuth');

// Get stock by category
router.get('/category-wise-stocks', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getCategoryWiseStockReport);

// Route to get style number wise stock report
router.get('/style-number-wise-stocks', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getStyleNumberWiseStockReport);

// Get overall stocks report
router.get('/overallStock', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getOverallStocksReport);

// Get stock by print
router.get('/print-wise-stocks', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getPrintWiseStockReport);

// Get stock by brand
router.get('/brand-wise-stocks', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getBrandWiseStockReport);

// Get stock by size
router.get('/size-wise-stocks', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getSizeWiseStockReport);

// Get stock report by date range
router.get('/stockByDate', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getStockByDate);

// Get stock report by print
router.get('/stockByPrintEmbName', reportController.getAllStockByPrintEmbName);

module.exports = router;