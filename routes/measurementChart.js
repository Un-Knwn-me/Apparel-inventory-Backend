const express = require('express');
const router = express.Router();
const measurementChartController = require('../controllers/measurementChartController');

// Create measurement chart
router.post('/create', measurementChartController.createMeasurementChart);

// Get all measurement charts
router.get('/getall', measurementChartController.getAllMeasurementCharts);

// Get measurement chart by id
router.get('/:id', measurementChartController.getMeasurementChartById);

// Update measurement chart
router.put('/:id', measurementChartController.updateMeasurementChart);

// Delete measurement chart
router.delete('/:id', measurementChartController.deleteMeasurementChart);

module.exports = router;
