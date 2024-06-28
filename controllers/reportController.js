const { Stock, StockHistory, Category, PurchaseOrder, Product, Brand, Style, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, InnerPcs, OuterCartonPcs, MeasurementChart } = require('../models');

exports.getOverallStocksReport = async (req, res) => {
  try {
    const reportData = await StockHistory.findAll({
      include: [
        {
          model: Stock,
          include: [
            {
              model: Product,
              attributes: [
                'id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs_id', 'outer_carton_pcs_id', 'measurement_chart_id', 'is_Stocked', 'images', 'created_at'
              ],
              include: [
                { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
                { model: Style, attributes: ['id', 'style_no', 'short_description', 'full_description', 'isActive'] },
                { model: MeasurementChart, attributes: ['id', 'name', 'sizes', 'sample_size_file', 'isActive'] },
                { model: Fabric, attributes: ['id', 'fabricName', 'isActive'] },
                { model: Category, attributes: ['id', 'categoryName', 'isActive'] },
                { model: FabricFinish, attributes: ['id', 'fabricFinishName', 'isActive'] },
                { model: Gsm, attributes: ['id', 'gsmValue', 'isActive'] },
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
        }
      ]
    });

    res.status(200).json(reportData);
  } catch (error) {
    console.error('Error fetching overall stocks report:', error);
    res.status(500).json({ error: 'An error occurred while fetching the overall stocks report' });
  }
};


// get 
exports.getStockByDate = async (req, res) => {
  try {
    const stockData = await StockHistory.findAll({
      order: [['created_at', 'DESC']],
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
                { model: Category, attributes: ['id', 'categoryName', 'isActive'] },
                { model: FabricFinish, attributes: ['id', 'fabricFinishName', 'isActive'] },
                { model: Gsm, attributes: ['id', 'gsmValue', 'isActive'] },
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
        },
        { model: PurchaseOrder, attributes: ['id', 'order_type', 'purchase_order_number', 'buyer', 'unique_name', 'purchase_quantity', 'delivery_date', 'stock_out_no_bundles', 'total_purchase_qty', 'created_at'] }
      ]
    });
    res.status(200).json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'An error occurred while fetching the stock data' });
  }
};

// get stock by print emb name
exports.getAllStockByPrintEmbName = async (req, res) => {
  try {
    const stockData = await StockHistory.findAll({
      include: [
        {
          model: Stock,
          attributes: ['id', 'product_reference_number', 'stock_by_size', 'no_bundles', 'total_inner_pcs', 'total_pcs_in_bundle', 'created_at'],
          include: [
            {
              model: Product,
              attributes: ['id', 'reference_number', 'style_id', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'category_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs_id', 'outer_carton_pcs_id', 'measurement_chart_id', 'is_Stocked', 'images', 'created_at'],
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
      ],
      order: [[{ model: Product }, { model: PrintEmbName }, 'printType', 'ASC']]
    });
    res.status(200).json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'An error occurred while fetching the stock data' });
  }
};