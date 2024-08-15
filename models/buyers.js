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
                'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'images', 'created_at'
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
        },
         {
          model: Buyer,
          attributes: ['id', 'name', 'location'],
        },
      ]
    });
    res.status(200).json(stockOutData);
  } catch (error) {
    console.error('Error fetching stock out data:', error);
    res.status(500).json({ error: 'An error occurred while fetching the stock out data' });
  }
};