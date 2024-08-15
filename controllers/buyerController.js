const { Buyer } = require('../models');

exports.createBuyer = async (req, res) => {
    try {
      const { name, location } = req.body;

      // check validate input
      if (!name || !location ) {
        return res.status(400).json({ error: 'Buyer Name or location is required' });
      }

    // Create the new Buyer
    const buyer = await Buyer.create({ name, location });

      res.status(201).json(buyer);
    } catch (error) {
      console.error('Error creating buyer:', error);
      res.status(500).json({ error: 'An error occurred while creating the buyer' });
    }
  };

exports.getAllBuyers = async (req, res) => {
    try {
        const buyers = await Buyer.findAll();
        res.status(200).json(buyers);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the buyers' });
      }
};

exports.getBuyerById = async (req, res) => {
    try {
        const buyer = await Buyer.findByPk(req.params.id);
        if (buyer) {
          res.status(200).json(buyer);
        } else {
          res.status(404).json({ error: 'Buyer not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the buyer' });
      }
}

exports.updateBuyer = async (req, res) => {
    try {
        const [updated] = await Buyer.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedBuyer = await Buyer.findByPk(req.params.id);
          res.status(200).json(updatedBuyer);
        } else {
          res.status(404).json({ error: 'Buyer not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the buyer' });
      }
}

exports.deleteBuyer = async (req, res) => {
    try {
        const deleted = await Buyer.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Buyer deleted successfully' });
        } else {
          res.status(404).json({ error: 'Buyer not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the buyer' });
      }
}
 