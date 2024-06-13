const { Stock } = require('../models');

exports.createStock = async (req, res) => {
    try {
        const stock = await Stock.create(req.body);
        res.status(201).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.findAll();
        res.status(200).json(stocks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getStockById = async (req, res) => {
    try {
        const stock = await Stock.findByPk(req.params.id);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateStockById = async (req, res) => {
    try {
        const stock = await Stock.findByPk(req.params.id);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        await stock.update(req.body);
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStockById = async (req, res) => {
    try {
        const stock = await Stock.findByPk(req.params.id);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        await stock.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
