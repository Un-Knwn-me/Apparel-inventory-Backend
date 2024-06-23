const { PrintEmbName } = require('../models');

exports.createPrintEmb = async (req, res) => {
    try {
      const { printType } = req.body;
  
      // check validate input
      if (!printType) {
        return res.status(400).json({ error: 'Print EMB type is required' });
      }
  
    // Create the new fabric
    const print = await PrintEmbName.create({ printType });
  
      res.status(201).json(print);
    } catch (error) {
      console.error('Error creating Print EMB type:', error);
      res.status(500).json({ error: 'An error occurred while creating the Print EMB type' });
    }
  };

exports.getAllPrintEmb = async (req, res) => {
    try {
        const print = await PrintEmbName.findAll();
        res.status(200).json(print);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Print EMB type' });
      }
};

exports.getPrintEmbById = async (req, res) => {
    try {
        const print = await PrintEmbName.findByPk(req.params.id);
        if (print) {
          res.status(200).json(print);
        } else {
          res.status(404).json({ error: 'Print EMB type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Print EMB type' });
      }
}

exports.updatePrintEmb= async (req, res) => {
    try {
        const [updated] = await PrintEmbName.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedPrintEmb = await PrintEmbName.findByPk(req.params.id);
          res.status(200).json(updatedPrintEmb);
        } else {
          res.status(404).json({ error: 'Print EMB type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Print EMB type' });
      }
}

exports.deletePrintEmb = async (req, res) => {
    try {
        const deleted = await PrintEmbName.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Print EMB type deleted successfully' });
        } else {
          res.status(404).json({ error: 'Print EMB type not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the Print EMB type' });
      }
}