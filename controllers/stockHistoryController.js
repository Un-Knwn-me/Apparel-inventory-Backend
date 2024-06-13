const { StockHistory } = require('../models');

exports.createStockHistory = async (req, res) => {
    try {
        const stockHistory = await StockHistory.create(req.body);
        res.status(201).json(stockHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllStockHistories = async (req, res) => {
    try {
        const stockHistories = await StockHistory.findAll();
        res.status(200).json(stockHistories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getStockHistoryById = async (req, res) => {
    try {
        const stockHistory = await StockHistory.findByPk(req.params.id);
        if (!stockHistory) {
            return res.status(404).json({ error: 'Stock History not found' });
        }
        res.status(200).json(stockHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateStockHistory = async (req, res) => {
    try {
        const stockHistory = await StockHistory.findByPk(req.params.id);
        if (!stockHistory) {
            return res.status(404).json({ error: 'Stock History not found' });
        }
        await stockHistory.update(req.body);
        res.status(200).json(stockHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStockHistory = async (req, res) => {
    try {
        const stockHistory = await StockHistory.findByPk(req.params.id);
        if (!stockHistory) {
            return res.status(404).json({ error: 'Stock History not found' });
        }
        await stockHistory.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
