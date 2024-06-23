const { PackingMethod } = require('../models');

exports.createPackingMethod = async (req, res) => {
    try {
      const { packingType } = req.body;
  
      // check validate input
      if (!packingType) {
        return res.status(400).json({ error: 'Packing Method is required' });
      }
  
    // Create the new fabric
    const packing = await PackingMethod.create({ packingType });
  
      res.status(201).json(packing);
    } catch (error) {
      console.error('Error creating packing method:', error);
      res.status(500).json({ error: 'An error occurred while creating the packing method' });
    }
  };

exports.getAllPackingMethod = async (req, res) => {
    try {
        const packing = await PackingMethod.findAll();
        res.status(200).json(packing);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Packing method' });
      }
};

exports.getPackingMethodById = async (req, res) => {
    try {
        const packing = await PackingMethod.findByPk(req.params.id);
        if (packing) {
          res.status(200).json(packing);
        } else {
          res.status(404).json({ error: 'Packing method not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Packing method' });
      }
}

exports.updatePackingMethod= async (req, res) => {
    try {
        const [updated] = await PackingMethod.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedPackingMethod = await PackingMethod.findByPk(req.params.id);
          res.status(200).json(updatedPackingMethod);
        } else {
          res.status(404).json({ error: 'Packing method not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Packing method' });
      }
}

exports.deletePackingMethod = async (req, res) => {
    try {
        const deleted = await PackingMethod.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Packing method deleted successfully' });
        } else {
          res.status(404).json({ error: 'Packing Method not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the packing method' });
      }
}