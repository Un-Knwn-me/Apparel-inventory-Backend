const { Style } = require('../models');

exports.createStyle = async (req, res) => {
  try {
    const { style_no, short_description, full_description } = req.body;

    // Validate input
    if (!style_no) {
      return res.status(400).json({ error: 'Style number is required' });
    }

    // Create the new Style
    const style = await Style.create({ style_no, short_description, full_description });

    res.status(201).json(style);
  } catch (error) {
    console.error('Error creating style:', error);
    res.status(500).json({ error: 'An error occurred while creating the style' });
  }
};

exports.getAllStyles = async (req, res) => {
  try {
    const styles = await Style.findAll();
    res.status(200).json(styles);
  } catch (error) {
    console.error('Error fetching styles:', error);
    res.status(500).json({ error: 'An error occurred while fetching the styles' });
  }
};

exports.getStyleById = async (req, res) => {
  try {
    const style = await Style.findByPk(req.params.id);
    if (style) {
      res.status(200).json(style);
    } else {
      res.status(404).json({ error: 'Style not found' });
    }
  } catch (error) {
    console.error('Error fetching style:', error);
    res.status(500).json({ error: 'An error occurred while fetching the style' });
  }
};

exports.updateStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const { style_no, short_description, full_description, isActive } = req.body;

    // Validate input
    if (!style_no) {
      return res.status(400).json({ error: 'Style number is required' });
    }

    const [updated] = await Style.update({ style_no, short_description, full_description, isActive }, {
      where: { id }
    });

    if (updated) {
      const updatedStyle = await Style.findByPk(id);
      res.status(200).json(updatedStyle);
    } else {
      res.status(404).json({ error: 'Style not found' });
    }
  } catch (error) {
    console.error('Error updating style:', error);
    res.status(500).json({ error: 'An error occurred while updating the style' });
  }
};

exports.deleteStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Style.destroy({
      where: { id }
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Style not found' });
    }
  } catch (error) {
    console.error('Error deleting style:', error);
    res.status(500).json({ error: 'An error occurred while deleting the style' });
  }
};
