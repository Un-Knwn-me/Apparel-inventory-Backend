const { Gsm } = require('../models');

exports.createGsm = async (req, res) => {
    try {
      const { gsmValue } = req.body;
  
      // check validate input
      if (!gsmValue) {
        return res.status(400).json({ error: 'GSM value is required' });
      }
  
    // Create the new fabric
    const gsm = await Gsm.create({ gsmValue });
  
      res.status(201).json(gsm);
    } catch (error) {
      console.error('Error creating GSM:', error);
      res.status(500).json({ error: 'An error occurred while creating the GSM' });
    }
  };

exports.getAllGsms = async (req, res) => {
    try {
        const gsm = await Gsm.findAll();
        res.status(200).json(gsm);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the gsm' });
      }
};

exports.getGsmById = async (req, res) => {
    try {
        const gsm = await Gsm.findByPk(req.params.id);
        if (color) {
          res.status(200).json(gsm);
        } else {
          res.status(404).json({ error: 'Gsm not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Gsm' });
      }
}

exports.updateGsm = async (req, res) => {
    try {
        const [updated] = await Gsm.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedGsm = await Gsm.findByPk(req.params.id);
          res.status(200).json(updatedGsm);
        } else {
          res.status(404).json({ error: 'Gsm not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the gsm' });
      }
}

exports.deleteGsm = async (req, res) => {
    try {
        const deleted = await Gsm.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: 'Gsm not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the gsm' });
      }
}