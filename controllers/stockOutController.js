const { Stock, StockHistory, Product, PurchaseOrder, Brand, Style, MeasurementChart, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, InnerPcs, OuterCartonPcs, Category } = require('../models');

exports.CreateStockOut = async (req, res) => {
  try {
    const { stock_id, product_reference_number, total_stockOut_bundle, purchase_order_id } = req.body;

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

    // Fetch the purchase order number using the purchase order ID
    const purchaseOrder = await PurchaseOrder.findByPk(purchase_order_id);

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
      purchase_order_number: purchaseOrder.purchase_order_number,
      purchase_order_id: purchase_order_id
    });

    res.status(200).json({ message: 'Stock out recorded successfully', stock, stockHistory });
  } catch (error) {
    console.error('Error processing stock out:', error);
    res.status(500).json({ error: 'An error occurred while processing the stock out' });
  }
};


exports.getAllStockOut = async (req, res) => {
  try {
    const stockOutData = await StockHistory.findAll({
      where: { stock_type: 'Stock Out' },
      include: [
        {
          model: Stock,
          attributes: ['id', 'product_reference_number', 'stock_by_size', 'no_bundles', 'total_inner_pcs', 'total_pcs_in_bundle', 'created_at'],
          include: [
            {
              model: Product,
              attributes: ['id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs_id', 'outer_carton_pcs_id', 'measurement_chart_id', 'is_Stocked', 'images', 'created_at'],
              include: [
                { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
                { model: Style, attributes: ['id', 'style_no', 'short_description', 'full_description', 'isActive'] },
                { model: MeasurementChart, attributes: ['id', 'name', 'sizes', 'sample_size_file', 'isActive'] },
                { model: Fabric, attributes: ['id', 'fabricName', 'isActive'] },
                { model: FabricFinish, attributes: ['id', 'fabricFinishName', 'isActive'] },
                { model: Gsm, attributes: ['id', 'gsmValue', 'isActive'] },
                { model: KnitType, attributes: ['id', 'knitType', 'isActive'] },
                { model: Category, attributes: ['id', 'categoryName', 'isActive'] },
                { model: Color, attributes: ['id', 'colorName', 'isActive'] },
                { model: Size, attributes: ['id', 'type_name', 'sizes', 'isActive'] },
                { model: Decoration, attributes: ['id', 'decorationName', 'isActive'] },
                { model: PrintEmbName, attributes: ['id', 'printType', 'isActive'] },
                { model: StitchDetail, attributes: ['id', 'stictchDetail', 'isActive'] },
                { model: Neck, attributes: ['id', 'neckType', 'isActive'] },
                { model: Sleeve, attributes: ['id', 'sleeveName', 'isActive'] },
                { model: Length, attributes: ['id', 'lengthType', 'isActive'] },
                { model: PackingMethod, attributes: ['id', 'packingType', 'isActive'] },
                { model: InnerPcs, attributes: ['id', 'number_of_pcs', 'isActive'] },
                { model: OuterCartonPcs, attributes: ['id', 'number_of_pcs', 'isActive'] },
              ]
            }
          ]
        },
        { model: PurchaseOrder, attributes: ['id', 'order_type', 'purchase_order_number', 'buyer', 'unique_name', 'purchase_quantity', 'delivery_date', 'stock_out_no_bundles', 'total_purchase_qty', 'created_at'] }
      ]
    });
    res.status(200).json(stockOutData);
  } catch (error) {
    console.error('Error fetching stock out data:', error);
    res.status(500).json({ error: 'An error occurred while fetching the stock out data' });
  }
};



exports.getStockOutById = async (req, res) => {
  try {
    const stockOutEntry = await StockHistory.findOne({
      where: { id: req.params.id, stock_type: 'Stock Out' },
      include: [
        {
          model: Stock,
          attributes: ['id', 'product_reference_number', 'stock_by_size', 'no_bundles', 'total_inner_pcs', 'total_pcs_in_bundle', 'created_at'],
          include: [
            {
              model: Product,
              attributes: ['id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs_id', 'outer_carton_pcs_id', 'measurement_chart_id', 'is_Stocked', 'images', 'created_at'],
              include: [
                { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
                { model: Style, attributes: ['id', 'style_no', 'short_description', 'full_description', 'isActive'] },
                { model: MeasurementChart, attributes: ['id', 'name', 'sizes', 'sample_size_file', 'isActive'] },
                { model: Fabric, attributes: ['id', 'fabricName', 'isActive'] },
                { model: FabricFinish, attributes: ['id', 'fabricFinishName', 'isActive'] },
                { model: Gsm, attributes: ['id', 'gsmValue', 'isActive'] },
                { model: KnitType, attributes: ['id', 'knitType', 'isActive'] },
                { model: Color, attributes: ['id', 'colorName', 'isActive'] },
                { model: Category, attributes: ['id', 'categoryName', 'isActive'] },
                { model: Size, attributes: ['id', 'type_name', 'sizes', 'isActive'] },
                { model: Decoration, attributes: ['id', 'decorationName', 'isActive'] },
                { model: PrintEmbName, attributes: ['id', 'printType', 'isActive'] },
                { model: StitchDetail, attributes: ['id', 'stictchDetail', 'isActive'] },
                { model: Neck, attributes: ['id', 'neckType', 'isActive'] },
                { model: Sleeve, attributes: ['id', 'sleeveName', 'isActive'] },
                { model: Length, attributes: ['id', 'lengthType', 'isActive'] },
                { model: PackingMethod, attributes: ['id', 'packingType', 'isActive'] },
                { model: InnerPcs, attributes: ['id', 'number_of_pcs', 'isActive'] },
                { model: OuterCartonPcs, attributes: ['id', 'number_of_pcs', 'isActive'] },
              ]
            }
          ]
        },
        { model: PurchaseOrder, attributes: ['id', 'order_type', 'purchase_order_number', 'buyer', 'unique_name', 'purchase_quantity', 'delivery_date', 'stock_out_no_bundles', 'total_purchase_qty', 'created_at'] }
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

exports.updateStockOut = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock_id, product_reference_number, total_stockOut_bundle, purchase_order_id } = req.body;

    // Fetch the existing stock history entry
    const existingStockHistory = await StockHistory.findByPk(id);

    if (!existingStockHistory) {
      return res.status(404).json({ error: 'Stock history entry not found' });
    }

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

    // Calculate the difference in stock out bundles
    const bundleDifference = total_stockOut_bundle - existingStockHistory.total_stockOut_bundle;

    // Check if the stock out quantity is available
    if (stock.no_bundles < bundleDifference) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    // Fetch the purchase order number using the purchase order ID
    const purchaseOrder = await PurchaseOrder.findByPk(purchase_order_id);

    // Update the stock quantities
    stock.no_bundles -= bundleDifference;
    stock.total_pcs_in_bundle = stock.total_inner_pcs * stock.no_bundles;
    await stock.save();

    // Update the stock history entry
    existingStockHistory.stock_id = stock.id;
    existingStockHistory.product_id = product.id;
    existingStockHistory.total_stockOut_bundle = total_stockOut_bundle;
    existingStockHistory.stock_type = 'Stock Out';
    existingStockHistory.purchase_order_number = purchaseOrder.purchase_order_number;
    existingStockHistory.purchase_order_id = purchase_order_id;

    await existingStockHistory.save();

    res.status(200).json({ message: 'Stock out updated successfully', stock, stockHistory: existingStockHistory });
  } catch (error) {
    console.error('Error updating stock out:', error);
    res.status(500).json({ error: 'An error occurred while updating the stock out' });
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

    res.status(202).json({ message: 'Stock out entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock out entry:', error);
    res.status(500).json({ error: 'An error occurred while deleting the stock out entry' });
  }
};

