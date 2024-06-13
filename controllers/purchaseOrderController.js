const { PurchaseOrder } = require('../models');

exports.createPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.create(req.body);
        res.status(201).json(purchaseOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll();
        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ error: 'Purchase Order not found' });
        }
        res.status(200).json(purchaseOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ error: 'Purchase Order not found' });
        }
        await purchaseOrder.update(req.body);
        res.status(200).json(purchaseOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ error: 'Purchase Order not found' });
        }
        await purchaseOrder.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
