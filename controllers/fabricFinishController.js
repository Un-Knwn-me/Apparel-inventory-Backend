const { FabricFinish } = require('../models');

exports.createFabricFinish = async (req, res) => {
    try {
      const { fabricFinishName } = req.body;
  
      // check validate input
      if (!fabricFinishName) {
        return res.status(400).json({ error: 'Fabric Finish is required' });
      }
  
    // Create the new Brand
    const fabricFinish = await FabricFinish.create({ fabricFinishName });
  
      res.status(201).json(fabricFinish);
    } catch (error) {
      console.error('Error creating Fabric Finish:', error);
      res.status(500).json({ error: 'An error occurred while creating the Fabric Finish' });
    }
  };

exports.getAllFabricFinishes = async (req, res) => {
    try {
        const fabricFinishes = await FabricFinish.findAll();
        res.status(200).json(fabricFinishes);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the fabric finishes' });
      }
};

exports.getFabricFinishById = async (req, res) => {
    try {
        const fabricFinish = await FabricFinish.findByPk(req.params.id);
        if (color) {
          res.status(200).json(fabricFinish);
        } else {
          res.status(404).json({ error: 'Fabric Finish not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Fabric Finish' });
      }
}

exports.updateFabricFinish = async (req, res) => {
    try {
        const [updated] = await FabricFinish.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedFabricFinish = await FabricFinish.findByPk(req.params.id);
          res.status(200).json(updatedFabricFinish);
        } else {
          res.status(404).json({ error: 'Fabric Finish not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the fabric finish' });
      }
}

exports.deleteFabricFinish = async (req, res) => {
    try {
        const deleted = await FabricFinish.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: 'Fabric Finish not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the fabric finish' });
      }
}