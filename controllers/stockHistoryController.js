const { Stock, StockHistory, Product, PurchaseOrder } = require('../models');

exports.CreateStockOut = async (req, res) => {
  try {
    const { stock_id, product_reference_number, total_stockOut_bundle, purchase_order_number, purchase_order_id } = req.body;

     // Fetch the product ID using the product reference number
     const product = await Product.findOne({ where: { reference_number: product_reference_number } });
  
     if (!product) {
       return res.status(404).json({ error: 'Product not found' });
     }

    // Fetch the stock entry
    const stock = await Stock.findByPk(stock_id);

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    // Check if the stock out quantity is available
    if (stock.no_bundles < total_stockOut_bundle) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    // Update the stock quantities
    stock.no_bundles -= total_stockOut_bundle;
    stock.total_pcs_in_bundle = stock.total_inner_pcs * stock.no_bundles;
    await stock.save();

    // Create a stock history entry
    const stockHistory = await StockHistory.create({
      stock_id: stock.id,
      product_id: product.id,
      total_stockOut_bundle: total_stockOut_bundle,
      stock_type: 'Stock Out',
      purchase_order_number: purchase_order_number,
      purchase_order_id: purchase_order_id,
    });

    res.status(200).json({ message: 'Stock out recorded successfully', stock, stockHistory });
  } catch (error) {
    console.error('Error processing stock out:', error);
    res.status(500).json({ error: 'An error occurred while processing the stock out' });
  }
};


exports.getAllStockOut = async (req, res) => {
  try {
    const stockOutHistory = await StockHistory.findAll({
      where: { stock_type: 'Stock Out' },
      include: [
        { model: Stock, attributes: ['id', 'product_reference_number', 'no_bundles', 'total_inner_pcs', 'total_pcs_in_bundle'] },
        { model: Product, attributes: ['id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs_id', 'outer_carton_pcs_id', 'measurement_chart_id', 'is_Stocked', 'images'] },
        { model: PurchaseOrder, attributes: ['id', 'order_type', 'purchase_order_number', 'buyer', 'unique_name', 'purchase_quantity', 'delivery_date', 'stock_out_no_bundles', 'total_purchase_qty'] },
      ]
    });
    res.status(200).json(stockOutHistory);
  } catch (error) {
    console.error('Error fetching stock out history:', error);
    res.status(500).json({ error: 'An error occurred while fetching the stock out history' });
  }
};


exports.getStockOutById = async (req, res) => {
  try {
    const stockOutEntry = await StockHistory.findOne({
      where: { id: req.params.id, stock_type: 'Stock Out' },
      include: [
        { model: Stock, attributes: ['id', 'product_reference_number', 'no_bundles', 'total_inner_pcs', 'total_pcs_in_bundle'] },
        { model: Product, attributes: ['id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs_id', 'outer_carton_pcs_id', 'measurement_chart_id', 'is_Stocked', 'images'] },
        { model: PurchaseOrder, attributes: ['id', 'order_type', 'purchase_order_number', 'buyer', 'unique_name', 'purchase_quantity', 'delivery_date', 'stock_out_no_bundles', 'total_purchase_qty'] },
      ]
    });
    if (stockOutEntry) {
      res.status(200).json(stockOutEntry);
    } else {
      res.status(404).json({ error: 'Stock out entry not found' });
    }
  } catch (error) {
    console.error('Error fetching stock out entry:', error);
    res.status(500).json({ error: 'An error occurred while fetching the stock out entry' });
  }
};


exports.updateStockOutById = async (req, res) => {
  try {
    const {
      stock_id,
      total_stockOut_bundle,
      product_id,
      stock_type,
      purchase_order_number,
      purchase_order_id
    } = req.body;

    // Find the stock out entry by ID
    const stockOutEntry = await StockHistory.findByPk(req.params.id);
    if (!stockOutEntry) {
      return res.status(404).json({ error: 'Stock out entry not found' });
    }

    // Update the stock out entry fields
    stockOutEntry.stock_id = stock_id || stockOutEntry.stock_id;
    stockOutEntry.total_stockOut_bundle = total_stockOut_bundle || stockOutEntry.total_stockOut_bundle;
    stockOutEntry.product_id = product_id || stockOutEntry.product_id;
    stockOutEntry.stock_type = stock_type || stockOutEntry.stock_type;
    stockOutEntry.purchase_order_number = purchase_order_number || stockOutEntry.purchase_order_number;
    stockOutEntry.purchase_order_id = purchase_order_id || stockOutEntry.purchase_order_id;

    // Save the updated stock out entry
    await stockOutEntry.save();

    res.status(200).json(stockOutEntry);
  } catch (error) {
    console.error('Error updating stock out entry:', error);
    res.status(500).json({ error: 'An error occurred while updating the stock out entry' });
  }
};


exports.deleteStockOutById = async (req, res) => {
  try {
    // Find the stock out entry by ID
    const stockOutEntry = await StockHistory.findByPk(req.params.id);
    if (!stockOutEntry) {
      return res.status(404).json({ error: 'Stock out entry not found' });
    }

    // Delete the stock out entry
    await stockOutEntry.destroy();

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting stock out entry:', error);
    res.status(500).json({ error: 'An error occurred while deleting the stock out entry' });
  }
};

