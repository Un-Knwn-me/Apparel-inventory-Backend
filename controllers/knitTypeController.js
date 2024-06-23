const { KnitType } = require('../models');

exports.createKnitType = async (req, res) => {
    try {
      const { knitType } = req.body;
  
      // check validate input
      if (!knitType) {
        return res.status(400).json({ error: 'knit Type is required' });
      }
  
    // Create the new fabric
    const knit = await KnitType.create({ knitType });
  
      res.status(201).json(knit);
    } catch (error) {
      console.error('Error creating knit Type:', error);
      res.status(500).json({ error: 'An error occurred while creating the knitType' });
    }
  };

exports.getAllKnitType = async (req, res) => {
    try {
        const knitTypes = await KnitType.findAll();
        res.status(200).json(knitTypes);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Knit Type' });
      }
};

exports.getKnitTypeById = async (req, res) => {
    try {
        const knit = await KnitType.findByPk(req.params.id);
        if (knit) {
          res.status(200).json(knit);
        } else {
          res.status(404).json({ error: 'knit Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the knit Type' });
      }
}

exports.updateKnitType= async (req, res) => {
    try {
        const [updated] = await KnitType.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedKnitType = await KnitType.findByPk(req.params.id);
          res.status(200).json(updatedKnitType);
        } else {
          res.status(404).json({ error: 'knit Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the knit Type' });
      }
}

exports.deleteKnitType = async (req, res) => {
    try {
        const deleted = await KnitType.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Knit type deleted successfully' });
        } else {
          res.status(404).json({ error: 'Knit Type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the knit type' });
      }
}