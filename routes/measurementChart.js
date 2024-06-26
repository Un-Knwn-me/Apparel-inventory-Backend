const express = require('express');
const router = express.Router();
const measurementChartController = require('../controllers/measurementChartController');
const { upload } = require('../middlewares/storage');

// Create measurement chart
router.post('/create', upload.single('sample_size_file'), measurementChartController.createMeasurementChart);

// Get all measurement charts
router.get('/getall', measurementChartController.getAllMeasurementCharts);

// Get measurement chart by id
router.get('/:id', measurementChartController.getMeasurementChartById);

// Update measurement chart
router.put('/:id', upload.single('sample_size_file'), measurementChartController.updateMeasurementChart);

// Delete measurement chart
router.delete('/:id', measurementChartController.deleteMeasurementChart);

// Delete file from storage
router.delete('/delete/:id', measurementChartController.deleteMeasurementChartFile);

module.exports = router;
