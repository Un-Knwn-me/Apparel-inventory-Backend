const { Sleeve } = require('../models');

exports.createSleeve = async (req, res) => {
    try {
      const { sleeveName } = req.body;
  
      // check validate input
      if (!sleeveName) {
        return res.status(400).json({ error: 'Sleeve is required' });
      }
  
    const sleeves = await Sleeve.create({ sleeveName });
  
      res.status(201).json(sleeves);
    } catch (error) {
      console.error('Error creating sleeve:', error);
      res.status(500).json({ error: 'An error occurred while creating the sleeve' });
    }
  };

exports.getAllSleeves = async (req, res) => {
    try {
        const sleeve = await Sleeve.findAll();
        res.status(200).json(sleeve);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Sleeves' });
      }
};

exports.getSleeveById = async (req, res) => {
    try {
        const sleeve = await Sleeve.findByPk(req.params.id);
        if (sleeve) {
          res.status(200).json(sleeve);
        } else {
          res.status(404).json({ error: 'Sleeve not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Sleeve' });
      }
}

exports.updateSleeve = async (req, res) => {
    try {
        const [updated] = await Sleeve.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedSleeve = await Sleeve.findByPk(req.params.id);
          res.status(200).json(updatedSleeve);
        } else {
          res.status(404).json({ error: 'Sleeve not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Sleeve' });
      }
}

exports.deleteSleeve = async (req, res) => {
    try {
        const deleted = await Sleeve.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: 'Sleeve not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the Sleeve' });
      }
}