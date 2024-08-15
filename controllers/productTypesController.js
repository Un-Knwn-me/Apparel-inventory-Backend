const { ProductTypes } = require('../models');

exports.createProductType = async (req, res) => {
    try {
        const { product, isActive } = req.body;
  
        // Validate input
        if (!product) {
            return res.status(400).json({ error: 'Product name is required' });
        }
  
        // Create the new Product Type
        const productType = await ProductTypes.create({ product, isActive });
  
        res.status(201).json(productType);
    } catch (error) {
        console.error('Error creating Product Type:', error);
        res.status(500).json({ error: 'An error occurred while creating the Product Type' });
    }
};

exports.getAllProductTypes = async (req, res) => {
    try {
        const productType = await ProductTypes.findAll();
        res.status(200).json(productType);
    } catch (error) {
        console.error('Error fetching Product Types:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Product Types' });
    }
};

exports.getProductTypeById = async (req, res) => {
    try {
        const productType = await ProductTypes.findByPk(req.params.id);
        if (productType) {
            res.status(200).json(productType);
        } else {
            res.status(404).json({ error: 'Product Type not found' });
        }
    } catch (error) {
        console.error('Error fetching Product Type:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Product Type' });
    }
};

exports.updateProductType = async (req, res) => {
    try {
        const { product, isActive } = req.body;
        const [updated] = await ProductTypes.update({ product, isActive }, { where: { id: req.params.id } });
        
        if (updated) {
            const updatedProductType = await ProductTypes.findByPk(req.params.id);
            res.status(200).json(updatedProductType);
        } else {
            res.status(404).json({ error: 'Product Type not found' });
        }
    } catch (error) {
        console.error('Error updating Product Type:', error);
        res.status(500).json({ error: 'An error occurred while updating the Product Type' });
    }
};

exports.deleteProductType = async (req, res) => {
    try {
        const deleted = await ProductTypes.destroy({ where: { id: req.params.id } });
        
        if (deleted) {
            res.status(202).json({ message: 'Product Type deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product Type not found' });
        }
    } catch (error) {
        console.error('Error deleting Product Type:', error);
        res.status(500).json({ error: 'An error occurred while deleting the Product Type' });
    }
};
