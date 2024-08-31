const { Warehouse } = require('../models');

exports.createWarehouse = async (req, res) => {
    try {
      const { warehouse } = req.body;

      // check validate input
      if (!warehouse ) {
        return res.status(400).json({ error: 'Warehouse is required' });
      }

    // Create the new warehouse
    const warehouseName = await Warehouse.create({ warehouse });

      res.status(201).json(warehouseName);
    } catch (error) {
      console.error('Error creating Warehouse:', error);
      res.status(500).json({ error: 'An error occurred while creating the Warehouse' });
    }
  };

exports.getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll();
        res.status(200).json(warehouses);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Warehouses' });
      }
};

exports.getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByPk(req.params.id);
        if (warehouse) {
          res.status(200).json(warehouse);
        } else {
          res.status(404).json({ error: 'Warehouse not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Warehouse' });
      }
}

exports.updateWarehouse = async (req, res) => {
    try {
        const [updated] = await Warehouse.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedWarehouse = await Warehouse.findByPk(req.params.id);
          res.status(200).json(updatedWarehouse);
        } else {
          res.status(404).json({ error: 'Warehouse not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Warehouse' });
      }
}

// delete warehouse
exports.deleteWarehouse = async (req, res) => {
    try {
        const deleted = await Warehouse.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Warehouse deleted successfully' });
        } else {
          res.status(404).json({ error: 'Warehouse not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the Warehouse' });
      }
}
 