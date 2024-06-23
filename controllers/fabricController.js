const { Fabric } = require('../models');

exports.createFabric = async (req, res) => {
    try {
      const { fabricName } = req.body;
  
      // check validate input
      if (!fabricName) {
        return res.status(400).json({ error: 'Fabric name is required' });
      }
  
    // Create the new fabric
    const fabric = await Fabric.create({ fabricName });
  
      res.status(201).json(fabric);
    } catch (error) {
      console.error('Error creating Fabric:', error);
      res.status(500).json({ error: 'An error occurred while creating the Fabric' });
    }
  };

exports.getAllFabrics = async (req, res) => {
    try {
        const fabrics = await Fabric.findAll();
        res.status(200).json(fabrics);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the fabrics' });
      }
};

exports.getFabricById = async (req, res) => {
    try {
        const fabric = await Fabric.findByPk(req.params.id);
        if (fabric) {
          res.status(200).json(fabric);
        } else {
          res.status(404).json({ error: 'Fabric not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Fabric' });
      }
}

exports.updateFabric = async (req, res) => {
    try {
        const [updated] = await Fabric.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedFabric = await Fabric.findByPk(req.params.id);
          res.status(200).json(updatedFabric);
        } else {
          res.status(404).json({ error: 'Fabric not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the fabric' });
      }
}

exports.deleteFabric = async (req, res) => {
    try {
        const deleted = await Fabric.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: "Fabric deleted successfully" });
        } else {
          res.status(404).json({ error: 'Fabric not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the fabric' });
      }
}