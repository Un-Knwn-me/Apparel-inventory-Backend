const { Decoration } = require('../models');

exports.createDecoration = async (req, res) => {
    try {
      const { decorationName } = req.body;
  
      // check validate input
      if (!decorationName) {
        return res.status(400).json({ error: 'Decoration is required' });
      }
  
    // Create the new Brand
    const decoration = await Decoration.create({ decorationName });
  
      res.status(201).json(decoration);
    } catch (error) {
      console.error('Error creating color:', error);
      res.status(500).json({ error: 'An error occurred while creating the decoration' });
    }
  };

exports.getAllDecorations = async (req, res) => {
    try {
        const decorations = await Decoration.findAll();
        res.status(200).json(decorations);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the decorations' });
      }
};

exports.getDecorationById = async (req, res) => {
    try {
        const decoration = await Decoration.findByPk(req.params.id);
        if (decoration) {
          res.status(200).json(decoration);
        } else {
          res.status(404).json({ error: 'Decoration not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Decoration' });
      }
}

exports.updateDecoration = async (req, res) => {
    try {
        const [updated] = await Decoration.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedDecoration = await Decoration.findByPk(req.params.id);
          res.status(200).json(updatedDecoration);
        } else {
          res.status(404).json({ error: 'Decoration not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the decoration' });
      }
}

exports.deleteDecoration = async (req, res) => {
    try {
      const deleted = await Decoration.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.status(202).json({ message: "Decoration deleted successfully" });
      } else {
        res.status(404).json({ error: "Decoration not found" });
      }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the decoration' });
      }
}