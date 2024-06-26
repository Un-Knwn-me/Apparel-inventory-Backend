const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { DEPARTMENTS, PERMISSIONS } = require('../middlewares/constants');
const { verifyPermission } = require('../middlewares/adminAuth');

// Get overall stocks report
router.get('/overallStock', verifyPermission(DEPARTMENTS.REPORTS, PERMISSIONS.READ), reportController.getOverallStocksReport);

module.exports = router;