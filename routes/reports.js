const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { DEPARTMENTS, PERMISSIONS } = require('../middlewares/constants');
const { verifyPermission } = require('../middlewares/adminAuth');

// Get overall stocks report
router.get('/overallStock', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getOverallStocksReport);

// Get stock report by date range
router.get('/stockByDate', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getStockByDate);

// Get stock report by print
router.get('/stockByPrintEmbName', reportController.getAllStockByPrintEmbName);

module.exports = router;