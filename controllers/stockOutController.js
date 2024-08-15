const { Stock, StockHistory, Product, PurchaseOrder, Brand, Reference, MeasurementChart, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, InnerPcs, OuterCartonPcs, Category } = require('../models');

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


// Create without purchase stock out
exports.createPurchaseOrderAndStockOut = async (req, res) => {
  try {
    const {
      order_type,
      buyer_id,
      delivery_date,
      product_style_number,
      product_id,
      notes,
      packing_type,
      purchase_by_size,
      req_bundle,
      req_purchase_qty,
    } = req.body;

    // Step 1: Create Purchase Order
    // Check if the purchase order number already exists
    let finalPurchaseOrderNumber;

    if (order_type === 'Without Purchase Order') {
      // Generate the next purchase order number for 'Without Purchase Order'
      const lastOrder = await PurchaseOrder.findOne({
        where: { order_type: 'Without Purchase Order' },
        order: [['created_at', 'DESC']],
      });

      if (lastOrder) {
        const lastOrderNumber = lastOrder.purchase_order_number;
        const orderNumber = parseInt(lastOrderNumber.replace('WPO', ''), 10);
        finalPurchaseOrderNumber = `WPO${String(orderNumber + 1).padStart(3, '0')}`;
      } else {
        finalPurchaseOrderNumber = 'WPO001';
      }
    }

  // Create the purchase order with the product ID
  const purchaseOrder = await PurchaseOrder.create({
    order_type,
    purchase_order_number: finalPurchaseOrderNumber,
    buyer_id,
    delivery_date,
    product_style_number,
    product_id,
    notes,
    packing_type,
    purchase_by_size,
    req_bundle,
    req_purchase_qty,
  });

    // Step 2: Process Stock Out
    // Fetch the product using the product style number
    const product = await Product.findOne({ where: { style_no: product_style_number } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Fetch the stock entry
    const stock = await Stock.findOne({ where: { product_style_number } });
    // const stock = await Stock.findByPk(stock_id);

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    // Check if the stock out quantity is available for each size
    for (const item of purchase_by_size) {
      const stockItem = stock.stock_by_size.find(stockSize => stockSize.size === item.size);
      if (!stockItem || stockItem.outerPcs < item.outerPcs) {
        return res.status(400).json({ error: `Insufficient stock available for size ${item.size}` });
      }
    }

    // Check if the stock out bundle quantity is available
    if (stock.no_bundles < req_bundle) {
      return res.status(400).json({ error: 'Insufficient stock bundles available' });
    }

    // Update the stock quantities by size
    for (const item of purchase_by_size) {
      const stockItem = stock.stock_by_size.find(stockSize => stockSize.size === item.size);
      stockItem.outerPcs -= item.outerPcs;
      stockItem.innerPcs -= item.innerPcs;
    }

    // Update the stock bundles and total pieces
    stock.no_bundles -= req_bundle;
    stock.total_pcs -= req_purchase_qty;

    await stock.save();

    // Create a stock history entry
    const stockHistory = await StockHistory.create({
      stock_id: stock.id,
      stockOut_by_size: purchase_by_size,
      stockOut_bundle: req_bundle,
      total_stockOut_pcs: req_purchase_qty,
      product_id: product.id,
      stock_type: 'Stock Out',
      purchase_order_number: purchaseOrder.purchase_order_number,
      purchase_order_id: purchaseOrder.id,
    });

    res.status(201).json({ message: 'Purchase order and stock out recorded successfully', purchaseOrder, stock, stockHistory });
  } catch (error) {
    console.error('Error processing purchase order and stock out:', error);
    res.status(500).json({ error: 'An error occurred while processing the purchase order and stock out' });
  }
};

// Get all stock out data
exports.getAllStockOut = async (req, res) => {
  try {
    const stockOutData = await StockHistory.findAll({
      where: { stock_type: 'Stock Out' },
      include: [
        {
          model: Stock,
          attributes: ['id', 'product_style_number', 'stock_by_size', 'no_bundles', 'total_pcs', 'created_at'],
          include: [
            {
              model: Product,
              attributes: [
                'id', 'reference_id', 'style_no', 'short_description', 'full_description', 'brand_id', 'fabric_id', 'fabric_finish_id',
                'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id',
                'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id',
                'is_Stocked', 'images', 'created_at'
              ],
              include: [
                { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
                { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
                { model: MeasurementChart, attributes: ['id', 'name', 'sizes', 'sample_size_file', 'isActive'] },
                { model: Fabric, attributes: ['id', 'fabricName', 'isActive'] },
                { model: FabricFinish, attributes: ['id', 'fabricFinishName', 'isActive'] },
                { model: Gsm, attributes: ['id', 'gsmValue', 'isActive'] },
                { model: Category, attributes: ['id', 'categoryName', 'isActive'] },
                { model: KnitType, attributes: ['id', 'knitType', 'isActive'] },
                { model: Color, attributes: ['id', 'colorName', 'isActive'] },
                { model: Size, attributes: ['id', 'type_name', 'sizes', 'isActive'] },
                { model: Decoration, attributes: ['id', 'decorationName', 'isActive'] },
                { model: PrintEmbName, attributes: ['id', 'printType', 'isActive'] },
                { model: StitchDetail, attributes: ['id', 'stictchDetail', 'isActive'] },
                { model: Neck, attributes: ['id', 'neckType', 'isActive'] },
                { model: Sleeve, attributes: ['id', 'sleeveName', 'isActive'] },
                { model: Length, attributes: ['id', 'lengthType', 'isActive'] },
                { model: PackingMethod, attributes: ['id', 'packingType', 'isActive'] },
                { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
              ]
            }
          ]
        },
        {
          model: PurchaseOrder,
          attributes: ['id', 'order_type', 'purchase_order_number', 'buyer_id', 'delivery_date', 'created_at']
        }
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

