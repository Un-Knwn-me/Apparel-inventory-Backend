const { Neck } = require('../models');

exports.createNeckType = async (req, res) => {
    try {
      const { neckType } = req.body;
  
      // check validate input
      if (!neckType) {
        return res.status(400).json({ error: 'Neck Type is required' });
      }
  
    // Create the new fabric
    const neck = await Neck.create({ neckType });
  
      res.status(201).json(neck);
    } catch (error) {
      console.error('Error creating Neck Type:', error);
      res.status(500).json({ error: 'An error occurred while creating the Neck Type' });
    }
  };

exports.getAllNeckType = async (req, res) => {
    try {
        const neckType = await Neck.findAll();
        res.status(200).json(neckType);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Neck Type' });
      }
};

exports.getNeckTypeById = async (req, res) => {
    try {
        const neck = await Neck.findByPk(req.params.id);
        if (neck) {
          res.status(200).json(neck);
        } else {
          res.status(404).json({ error: 'Neck Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Neck type' });
      }
}

exports.updateNeckType= async (req, res) => {
    try {
        const [updated] = await Neck.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedNeckType = await Neck.findByPk(req.params.id);
          res.status(200).json(updatedNeckType);
        } else {
          res.status(404).json({ error: 'Neck Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Neck type' });
      }
}

exports.deleteNeckType = async (req, res) => {
    try {
        const deleted = await Neck.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: 'Neck Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the neck type' });
      }
}