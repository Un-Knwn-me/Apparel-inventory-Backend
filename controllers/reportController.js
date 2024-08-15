const { Stock, PurchaseOrder, Product, Category, Reference, Brand, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, ProductTypes, MeasurementChart, StockHistory } = require('../models');
const { Op } = require('sequelize');

// Get report by category
exports.getCategoryWiseStockReport = async (req, res) => {
  try {
    const categoryWiseStocks = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'reference_id', 'style_no', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'short_description', 'full_description', 'measurement_chart_id',  'images', 'created_at'],
          include: [
            {
              model: Stock,
              where: {
                total_pcs: {
                  [Op.gt]: 0,
                }
              },
              attributes: ['id', 'product_style_number', 'stock_by_size', 'no_bundles', 'total_pcs', 'created_at'],
            },
            { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
            { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
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
            { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
          ]
        }
      ]
    });

     // Filter out categories that don't have any products with stock
     const filteredCategories = categoryWiseStocks.filter(category => category.Products.length > 0);

     res.status(200).json(filteredCategories);
   } catch (error) {
     console.error('Error fetching category-wise stock report:', error);
     res.status(500).json({ error: 'An error occurred while fetching the category-wise stock report' });
   }
 };
 
// Get report by style no
exports.getStyleNumberWiseStockReport = async (req, res) => {
  try {
    const styleNumberWiseStock = await Stock.findAll({
      where: {
        product_style_number: {
          [Op.not]: null,
        }
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'reference_id', 'style_no', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'short_description', 'full_description', 'measurement_chart_id',  'images', 'created_at'],
          include: [
            { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
            { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
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
            { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
          ]
        }
      ]
    });

 // Filter out records with an empty product_style_number
 const filteredStyle = styleNumberWiseStock.filter(style => style.product_style_number && style.product_style_number.length > 0);

 res.status(200).json(filteredStyle);
} catch (error) {
 console.error('Error fetching style-wise stock report:', error);
 res.status(500).json({ error: 'An error occurred while fetching the style-wise stock report' });
}
};


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
                'id', 'reference_id', 'style_no', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'short_description', 'full_description', 'images', 'created_at'
              ],
              include: [
                { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
                { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
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
                { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
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


// Get report by Print wise
exports.getPrintWiseStockReport = async (req, res) => {
  try {
    const printWiseStocks = await PrintEmbName.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'reference_id', 'style_no', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'short_description', 'full_description', 'images', 'created_at'],
          include: [
            {
              model: Stock,
              where: {
                total_pcs: {
                  [Op.gt]: 0,
                }
              },
              attributes: ['id', 'product_style_number', 'stock_by_size', 'no_bundles', 'total_pcs', 'created_at'],
            },
            { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
            { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
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
            { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
          ]
        }
      ]
    });
  // Filter out categories that don't have any products with stock
  const filteredCategories = printWiseStocks.filter(category => category.Products.length > 0);

  res.status(200).json(filteredCategories);
} catch (error) {
  console.error('Error fetching print-wise stock report:', error);
  res.status(500).json({ error: 'An error occurred while fetching the print-wise stock report' });
}
};


// Get report by brand wise
exports.getBrandWiseStockReport = async (req, res) => {
  try {
    const brandWiseStocks = await Brand.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'reference_id', 'style_no', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'short_description', 'full_description', 'images', 'created_at'],
          include: [
            {
              model: Stock,
              where: {
                total_pcs: {
                  [Op.gt]: 0,
                }
              },
              attributes: ['id', 'product_style_number', 'stock_by_size', 'no_bundles', 'total_pcs', 'created_at'],
            },
            { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
            { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
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
            { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
          ]
        }
      ]
    });

    // Filter out brands that don't have any products with stock
    const filteredCategories = brandWiseStocks.filter(category => category.Products.length > 0);

    res.status(200).json(filteredCategories);
  } catch (error) {
    console.error('Error fetching brand-wise stock report:', error);
    res.status(500).json({ error: 'An error occurred while fetching the brand-wise stock report' });
  }
};

// Get report by size wise
exports.getSizeWiseStockReport = async (req, res) => {
  try {
    const sizeWiseStocks = await Size.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'reference_id', 'style_no', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'short_description', 'full_description', 'images', 'created_at'],
          include: [
            {
              model: Stock,
              where: {
                total_pcs: {
                  [Op.gt]: 0,
                }
              },
              attributes: ['id', 'product_style_number', 'stock_by_size', 'no_bundles', 'total_pcs', 'created_at'],
            },
            { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
            { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
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
            { model: ProductTypes, attributes: ['id', 'product', 'isActive'] },
          ]
        }
      ]
    });

  // Filter out size that don't have any products with stock
  const filteredCategories = sizeWiseStocks.filter(category => category.Products.length > 0);

  res.status(200).json(filteredCategories);
} catch (error) {
  console.error('Error fetching size-wise stock report:', error);
  res.status(500).json({ error: 'An error occurred while fetching the size-wise stock report' });
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