const { PurchaseOrder, Product, Category, Brand, Style, MeasurementChart, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, InnerPcs, OuterCartonPcs } = require('../models');

exports.createPurchaseOrder = async (req, res) => {
  try {
    const {
      order_type,
      purchase_order_number,
      product_reference_no,
      buyer,
      notes,
      diameter,
      packing_type,
      purchase_by_size,
      delivery_date,
      stock_out_no_bundles,
      total_purchase_qty,
    } = req.body;

    // Fetch the product ID using the product reference number
    const product = await Product.findOne({ where: { reference_number: product_reference_no } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let finalPurchaseOrderNumber = purchase_order_number;

    if (!purchase_order_number && order_type === 'Without Purchase Order') {
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
      product_reference_no,
      product_id: product.id,
      buyer,
      notes,
      diameter,
      packing_type,
      purchase_by_size,
      delivery_date,
      stock_out_no_bundles,
      total_purchase_qty,
    });

    res.status(201).json(purchaseOrder);
  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ error: 'An error occurred while creating the purchase order' });
  }
};


// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.findAll({
      include: [
        {
          model: Product,
          include: [
            { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
            { model: Style, attributes: ['id', 'style_no', 'short_description', 'full_description', 'isActive'] },
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
            { model: InnerPcs, attributes: ['id', 'number_of_pcs', 'isActive'] },
            { model: OuterCartonPcs, attributes: ['id', 'number_of_pcs', 'isActive'] },
          ]
        }
      ]
    });
    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ error: 'An error occurred while fetching the purchase orders' });
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: [
              'id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id',
              'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id',
              'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id',
              'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'is_Stocked',
              'images', 'created_at'
            ],
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
              { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
            ]
        }
      ]
    });

    if (purchaseOrder) {
      res.status(200).json(purchaseOrder);
    } else {
      res.status(404).json({ error: 'Purchase order not found' });
    }
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    res.status(500).json({ error: 'An error occurred while fetching the purchase order' });
  }
};

exports.updatePurchaseOrderById = async (req, res) => {
  try {
    const {
      order_type,
      purchase_order_number,
      product_reference_no,
      buyer,
      unique_name,
      purchase_quantity,
      delivery_date,
      stock_out_no_bundles,
      total_purchase_qty,
    } = req.body;

    // Fetch the product ID using the product reference number if provided
    let product;
    if (product_reference_no) {
      product = await Product.findOne({ where: { reference_number: product_reference_no } });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
    }

    // Find the purchase order by ID
    const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }

    // Update the purchase order fields
    purchaseOrder.order_type = order_type || purchaseOrder.order_type;
    purchaseOrder.purchase_order_number = purchase_order_number || purchaseOrder.purchase_order_number;
    purchaseOrder.product_id = product ? product.id : purchaseOrder.product_id;
    purchaseOrder.buyer = buyer || purchaseOrder.buyer;
    purchaseOrder.unique_name = unique_name || purchaseOrder.unique_name;
    purchaseOrder.purchase_quantity = purchase_quantity || purchaseOrder.purchase_quantity;
    purchaseOrder.delivery_date = delivery_date || purchaseOrder.delivery_date;
    purchaseOrder.stock_out_no_bundles = stock_out_no_bundles || purchaseOrder.stock_out_no_bundles;
    purchaseOrder.total_purchase_qty = total_purchase_qty || purchaseOrder.total_purchase_qty;

    // Save the updated purchase order
    await purchaseOrder.save();

    res.status(200).json(purchaseOrder);
  } catch (error) {
    console.error('Error updating purchase order:', error);
    res.status(500).json({ error: 'An error occurred while updating the purchase order' });
  }
};

exports.deletePurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);

    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }

    await purchaseOrder.destroy();

    res.status(202).json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase order:', error);
    res.status(500).json({ error: 'An error occurred while deleting the purchase order' });
  }
};


// get the purchase order by order type

exports.getPurchaseOrdersByType = async (req, res) => {
  try {
    const { poType } = req.params;
    let order_type = "";

        if(poType === "po"){
          order_type = "With Purchase Order"
        } else {
          order_type = "Without Purchase Order"
        };

    const purchaseOrders = await PurchaseOrder.findAll({
      where: { order_type },
      include: [
        {
          model: Product,
          attributes: [
              'id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id',
              'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id',
              'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id',
              'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'is_Stocked',
              'images', 'created_at'
            ],
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
              { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
            ]
        }
      ]
    });

    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase orders by type:', error);
    res.status(500).json({ error: 'An error occurred while fetching the purchase orders' });
  }
};
