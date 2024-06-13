const { Size } = require('../models');

exports.createSize = async (req, res) => {
  try {
    const { type_name, sizes } = req.body;

    // Validate input
    if (!type_name || !sizes) {
      return res.status(400).json({ error: 'Type name and sizes are required' });
    }

    // Create the new Size
    const size = await Size.create({ type_name, sizes });

    res.status(201).json(size);
  } catch (error) {
    console.error('Error creating size:', error);
    res.status(500).json({ error: 'An error occurred while creating the size' });
  }
};

exports.getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.findAll();
    res.status(200).json(sizes);
  } catch (error) {
    console.error('Error fetching sizes:', error);
    res.status(500).json({ error: 'An error occurred while fetching the sizes' });
  }
};

exports.getSizeById = async (req, res) => {
  try {
    const size = await Size.findByPk(req.params.id);
    if (size) {
      res.status(200).json(size);
    } else {
      res.status(404).json({ error: 'Size not found' });
    }
  } catch (error) {
    console.error('Error fetching size:', error);
    res.status(500).json({ error: 'An error occurred while fetching the size' });
  }
};

exports.updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { type_name, sizes, isActive } = req.body;

    // Validate input
    if (!type_name || !sizes) {
      return res.status(400).json({ error: 'Type name and sizes are required' });
    }

    const [updated] = await Size.update({ type_name, sizes, isActive }, {
      where: { id }
    });

    if (updated) {
      const updatedSize = await Size.findByPk(id);
      res.status(200).json(updatedSize);
    } else {
      res.status(404).json({ error: 'Size not found' });
    }
  } catch (error) {
    console.error('Error updating size:', error);
    res.status(500).json({ error: 'An error occurred while updating the size' });
  }
};

exports.deleteSize = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Size.destroy({
      where: { id }
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Size not found' });
    }
  } catch (error) {
    console.error('Error deleting size:', error);
    res.status(500).json({ error: 'An error occurred while deleting the size' });
  }
};
