const { InnerPcs } = require('../models');

exports.createInnerPcs = async (req, res) => {
    try {
      const { number_of_pcs } = req.body;
  
      // check validate input
      if (!number_of_pcs) {
        return res.status(400).json({ error: 'Inner Pieces value is required' });
      }
  
    // Create the new fabric
    const innerPcs = await InnerPcs.create({ number_of_pcs });
  
      res.status(201).json(innerPcs);
    } catch (error) {
      console.error('Error creating Inner Pieces:', error);
      res.status(500).json({ error: 'An error occurred while creating the Inner Pieces' });
    }
  };

exports.getAllInnerPcs = async (req, res) => {
    try {
        const innerPcs = await InnerPcs.findAll();
        res.status(200).json(innerPcs);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Inner Pieces' });
      }
};

exports.getInnerPcsById = async (req, res) => {
    try {
        const innerPcs = await InnerPcs.findByPk(req.params.id);
        if (color) {
          res.status(200).json(innerPcs);
        } else {
          res.status(404).json({ error: 'Inner Pieces not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Inner Pieces' });
      }
}

exports.updateInnerPcs = async (req, res) => {
    try {
        const [updated] = await InnerPcs.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedInnerPcs = await InnerPcs.findByPk(req.params.id);
          res.status(200).json(updatedInnerPcs);
        } else {
          res.status(404).json({ error: 'Inner Pieces not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Inner Pieces' });
      }
}

exports.deleteInnerPcs = async (req, res) => {
    try {
        const deleted = await InnerPcs.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: 'Inner Pieces not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the Inner Pieces' });
      }
}