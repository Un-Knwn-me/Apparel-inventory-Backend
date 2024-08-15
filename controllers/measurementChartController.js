const { MeasurementChart } = require('../models');
const { storage, bucketName, bucket } = require('../middlewares/storage');
const path = require('path');
const { format } = require('util');

exports.createMeasurementChart = async (req, res) => {
  try {
    const { name, sizes, category } = req.body;

    // Validate input
    if (!name || !sizes || !category) {
      return res.status(400).json({ error: 'Name, sizes, category are required' });
    }
    let sampleSizeFileUrl = '';

    // Handle file upload if file is provided
    if (req.file) {
      const originalname = req.file.originalname;
      const blob = bucket.file(`MeasurementCharts/${Date.now()}_${path.basename(originalname)}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        console.error('Blob stream error:', err);
        return res.status(500).json({ error: 'Failed to upload file' });
      });

      blobStream.on('finish', async () => {
        try {
          // Generate the public URL for the file
          sampleSizeFileUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

          // Create the new MeasurementChart with the file URL
          const measurementChart = await MeasurementChart.create({ name, sizes, category, sample_size_file: sampleSizeFileUrl });
          res.status(201).json(measurementChart);
        } catch (error) {
          console.error('Error making file public:', error);
          res.status(500).json({ error: 'Failed to make the file public' });
        }
      });

      blobStream.end(req.file.buffer);
    } else {
      // Create the new MeasurementChart without file URL
      const measurementChart = await MeasurementChart.create({ name, sizes, category });
      res.status(201).json(measurementChart);
    }
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
      const { name, sizes, isActive } = req.body;
  
      // Validate input
      if (!name || !sizes || !sample_size_file) {
        return res.status(400).json({ error: 'Name, sizes, and sample size file are required' });
      }
  
      const [updated] = await MeasurementChart.update({ name, sizes, isActive }, {
        where: { id }
      });

      // Handle file upload if file is provided
    if (req.file) {
      const originalname = req.file.originalname;
      const blob = bucket.file(`MeasurementCharts/${Date.now()}_${path.basename(originalname)}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        console.error('Blob stream error:', err);
        return res.status(500).json({ error: 'Failed to upload image' });
      });

      blobStream.on('finish', async () => {
        // Generate the public URL for the file
        const sampleSizeFileUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

        // Add the file URL to the update fields
        updateFields.sample_size_file = sampleSizeFileUrl;

        // Update the measurement chart with file URL
        const [updated] = await MeasurementChart.update(updateFields, {
          where: { id }
        });
        if (updated) {
          const updatedMeasurementChart = await MeasurementChart.findByPk(id);
          res.status(200).json(updatedMeasurementChart);
        } else {
          res.status(404).json({ error: 'Measurement chart not found' });
        }
      });

      blobStream.end(req.file.buffer);
    } else {
      // Update the measurement chart without file URL
      const [updated] = await MeasurementChart.update(updateFields, {
        where: { id }
      });

      if (updated) {
        const updatedMeasurementChart = await MeasurementChart.findByPk(id);
        res.status(200).json(updatedMeasurementChart);
      } else {
        res.status(404).json({ error: 'Measurement chart not found' });
      }
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

  exports.deleteMeasurementChartFile = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the measurement chart by ID
      const measurementChart = await MeasurementChart.findByPk(id);
  
      if (!measurementChart) {
        return res.status(404).json({ error: 'Measurement chart not found' });
      }
  
      // Remove the sample_size_file link
      measurementChart.sample_size_file = null;
  
      // Save the updated measurement chart
      await measurementChart.save();  
  
      res.status(200).json({ message: 'File deleted successfully and measurement chart updated', measurementChart });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ error: 'An error occurred while deleting the file' });
    }
  };