const { Reference } = require('../models');

exports.createReferenceNo = async (req, res) => {
    try {
      const { Reference_no } = req.body;

      // check validate input
      if (!Reference_no) {
        return res.status(400).json({ error: 'Reference no is required' });
      }

    // Check if the reference already exists
    const existingReference = await Reference.findOne({ where: { Reference_no } });
    if (existingReference) {
      return res.status(409).json({ error: 'Reference no already exists' });
    }

    // Create the new Reference
    const reference = await Reference.create({ Reference_no });

      res.status(201).json(reference);
    } catch (error) {
      console.error('Error creating reference:', error);
      res.status(500).json({ error: 'An error occurred while creating the reference' });
    }
  };


exports.getAllReference = async (req, res) => {
    try {
        const reference = await Reference.findAll();
        res.status(200).json(reference);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the reference' });
      }
};

exports.getReferenceById = async (req, res) => {
    try {
        const reference = await Reference.findByPk(req.params.id);
        if (reference) {
          res.status(200).json(reference);
        } else {
          res.status(404).json({ error: 'Reference not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the reference' });
      }
}

exports.updateReference = async (req, res) => {
    try {
        const [updated] = await Reference.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedReference= await Reference.findByPk(req.params.id);
          res.status(200).json(updatedReference);
        } else {
          res.status(404).json({ error: 'Reference not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the reference' });
      }
}

exports.deleteReference = async (req, res) => {
    try {
        const deleted = await Reference.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Reference deleted successfully' });
        } else {
          res.status(404).json({ error: 'Reference not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the reference' });
      }
}