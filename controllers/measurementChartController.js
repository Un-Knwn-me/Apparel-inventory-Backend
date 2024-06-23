const { MeasurementChart } = require('../models');

exports.createMeasurementChart = async (req, res) => {
  try {
    const { name, sizes, sample_size_file } = req.body;

    // Validate input
    if (!name || !sizes || !sample_size_file) {
      return res.status(400).json({ error: 'Name, sizes, and sample size file are required' });
    }

    // Create the new MeasurementChart
    const measurementChart = await MeasurementChart.create({ name, sizes, sample_size_file });

    res.status(201).json(measurementChart);
  } catch (error) {
    console.error('Error creating measurement chart:', error);
    res.status(500).json({ error: 'An error occurred while creating the measurement chart' });
  }
};

exports.getAllMeasurementCharts = async (req, res) => {
    try {
      const measurementCharts = await MeasurementChart.findAll();
      res.status(200).json(measurementCharts);
    } catch (error) {
      console.error('Error fetching measurement charts:', error);
      res.status(500).json({ error: 'An error occurred while fetching the measurement charts' });
    }
  };
  
  exports.getMeasurementChartById = async (req, res) => {
    try {
      const measurementChart = await MeasurementChart.findByPk(req.params.id);
      if (measurementChart) {
        res.status(200).json(measurementChart);
      } else {
        res.status(404).json({ error: 'Measurement chart not found' });
      }
    } catch (error) {
      console.error('Error fetching measurement chart:', error);
      res.status(500).json({ error: 'An error occurred while fetching the measurement chart' });
    }
  };
  
  exports.updateMeasurementChart = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, sizes, sample_size_file, isActive } = req.body;
  
      // Validate input
      if (!name || !sizes || !sample_size_file) {
        return res.status(400).json({ error: 'Name, sizes, and sample size file are required' });
      }
  
      const [updated] = await MeasurementChart.update({ name, sizes, sample_size_file, isActive }, {
        where: { id }
      });
  
      if (updated) {
        const updatedMeasurementChart = await MeasurementChart.findByPk(id);
        res.status(200).json(updatedMeasurementChart);
      } else {
        res.status(404).json({ error: 'Measurement chart not found' });
      }
    } catch (error) {
      console.error('Error updating measurement chart:', error);
      res.status(500).json({ error: 'An error occurred while updating the measurement chart' });
    }
  };
  
  exports.deleteMeasurementChart = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await MeasurementChart.destroy({
        where: { id }
      });
  
      if (deleted) {
        res.status(202).json({ message: 'Measurement chart deleted successfully' });
      } else {
        res.status(404).json({ error: 'Measurement chart not found' });
      }
    } catch (error) {
      console.error('Error deleting measurement chart:', error);
      res.status(500).json({ error: 'An error occurred while deleting the measurement chart' });
    }
  };