const { Length } = require('../models');

exports.createLengthType = async (req, res) => {
    try {
      const { lengthType } = req.body;
  
      // check validate input
      if (!lengthType) {
        return res.status(400).json({ error: 'Length Type is required' });
      }
  
    // Create the new fabric
    const length = await Length.create({ lengthType });
  
      res.status(201).json(length);
    } catch (error) {
      console.error('Error creating Length Type:', error);
      res.status(500).json({ error: 'An error occurred while creating the Length Type' });
    }
  };

exports.getAllLengthType = async (req, res) => {
    try {
        const lengthTypes = await Length.findAll();
        res.status(200).json(lengthTypes);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Length Type' });
      }
};

exports.getLengthTypeById = async (req, res) => {
    try {
        const length = await Length.findByPk(req.params.id);
        if (length) {
          res.status(200).json(length);
        } else {
          res.status(404).json({ error: 'Length Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the length type' });
      }
}

exports.updateLengthType= async (req, res) => {
    try {
        const [updated] = await Length.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedLengthType = await Length.findByPk(req.params.id);
          res.status(200).json(updatedLengthType);
        } else {
          res.status(404).json({ error: 'Length Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the length type' });
      }
}

exports.deleteLengthType = async (req, res) => {
    try {
        const deleted = await Length.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: 'Length Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the length type' });
      }
}