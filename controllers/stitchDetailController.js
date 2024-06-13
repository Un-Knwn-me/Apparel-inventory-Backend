const { StitchDetail } = require('../models');

exports.createStitchDetail = async (req, res) => {
    try {
      const { stictchDetail } = req.body;
  
      // check validate input
      if (!stictchDetail) {
        return res.status(400).json({ error: 'Stitch details is required' });
      }
  
    const stitch = await StitchDetail.create({ stictchDetail });
  
      res.status(201).json(stitch);
    } catch (error) {
      console.error('Error creating stitch detail:', error);
      res.status(500).json({ error: 'An error occurred while creating the stitch detail' });
    }
  };

exports.getAllStitchDetails = async (req, res) => {
    try {
        const stitch = await StitchDetail.findAll();
        res.status(200).json(stitch);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Stitch details' });
      }
};

exports.getStitchDetailById = async (req, res) => {
    try {
        const stitch = await StitchDetail.findByPk(req.params.id);
        if (stitch) {
          res.status(200).json(stitch);
        } else {
          res.status(404).json({ error: 'Stitch Details not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the stitch detail' });
      }
}

exports.updateStitchDetail = async (req, res) => {
    try {
        const [updated] = await StitchDetail.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedStitch = await StitchDetail.findByPk(req.params.id);
          res.status(200).json(updatedStitch);
        } else {
          res.status(404).json({ error: 'Stitch Detail not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the stitch detail' });
      }
}

exports.deleteStitchDetail = async (req, res) => {
    try {
        const deleted = await StitchDetail.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: 'Stitch detail not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the stitch detail' });
      }
}