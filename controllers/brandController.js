const { Brand } = require('../models');

exports.createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;

    // check validate input
    if (!brandName) {
      return res.status(400).json({ error: 'Brand Name is required' });
    }

  // Check if the brand already exists
  const existingBrand = await Brand.findOne({ where: { brandName } });
  if (existingBrand) {
    return res.status(409).json({ error: 'Brand already exists' });
  }

  // Create the new Brand
  const brand = await Brand.create({ brandName });

    res.status(201).json(brand);
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ error: 'An error occurred while creating the brand' });
  }
};


exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json(brands);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the brands' });
      }
};

exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (brand) {
          res.status(200).json(brand);
        } else {
          res.status(404).json({ error: 'Brand not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the brand' });
      }
}

exports.updateBrand = async (req, res) => {
    try {
        const [updated] = await Brand.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedBrand = await Brand.findByPk(req.params.id);
          res.status(200).json(updatedBrand);
        } else {
          res.status(404).json({ error: 'Brand not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the brand' });
      }
}

exports.deleteBrand = async (req, res) => {
    try {
        const deleted = await Brand.destroy({ where: { id: req.params.id } });
        if (deleted) {
          res.status(202).json({ message: 'Brand deleted successfully' });
        } else {
          res.status(404).json({ error: 'Brand not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the brand' });
      }
}