const { Stock, PurchaseOrder, Product, Category, Reference, Brand, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, ProductTypes, MeasurementChart, StockHistory } = require('../models');
const { Op } = require('sequelize');
const logo = require('../public/images/');

// Get report by category
exports.getCategoryWiseStockReport = async (req, res) => {
  try {
    const categoryWiseStocks = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: [
            'id', 'reference_id', 'style_no', 'brand_id', 'fabric_id', 
            'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 
            'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 
            'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 
            'inner_pcs', 'category_id', 'productType_id', 'short_description', 
            'full_description', 'measurement_chart_id', 'images', 'created_at'
          ],
          include: [
            { 
              model: Stock, 
              where: { 
                total_pcs: { [Op.gt]: 0 } 
              }, 
              attributes: ['id', 'product_style_number', 'stock_by_size', 'no_bundles', 'total_pcs', 'created_at'] 
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

    // Create a PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = doc.pipe(blobStream());

    // Add a logo to the top right corner of each page
    const logoPath = '../public/images/logo.png';

    // Add a title to the document
    doc.image(logoPath, doc.page.width - 150, 30, { fit: [100, 100] })
       .fontSize(25)
       .fillColor('#333333')
       .text('Category-wise Stock Report', { align: 'center' })
       .moveDown();

    // Iterate through each category
    filteredCategories.forEach(category => {
      doc.addPage()
         .image(logoPath, doc.page.width - 150, 30, { fit: [100, 100] })
         .fontSize(20)
         .fillColor('#007BFF')
         .text(`Category: ${category.categoryName}`, { align: 'left' }).moveDown();

      // Iterate through each product within the category
      category.Products.forEach(product => {
        doc.fontSize(16).fillColor('#000000').text(`Product: ${product.style_no} - ${product.short_description}`, { align: 'left' }).moveDown(0.5);

        // Add only the first product image if it exists
        if (product.images && product.images.length > 0) {
          try {
            doc.image(product.images[0], {
              fit: [150, 150],
              align: 'center',
              valign: 'center'
            }).moveDown();
          } catch (err) {
            console.error('Error loading image:', err);
          }
        }

        // Add stock information
        doc.fontSize(12)
           .fillColor('#555555')
           .text(`Stock: ${product.Stock.total_pcs} pcs`, { align: 'left' }).moveDown();
      });
    });

    // Finalize the PDF and end the stream
    doc.end();
    stream.on('finish', () => {
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=category-wise-stock-report.pdf'
      });
      stream.pipe(res);
    });

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
    // Fetch the report data
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

    // Transform the data into a format suitable for an Excel sheet
    const data = reportData.map(stockHistory => {
      const product = stockHistory.Stock.Product;
      return {
        'Style No': product.style_no,
        'Brand Name': product.Brand.brandName,
        'Fabric': product.Fabric.fabricName,
        'GSM': product.Gsm.gsmValue,
        'Color': product.Color.colorName,
        'Size': product.Size.type_name,
        'Print Type': product.PrintEmbName.printType,
        'Stitch Detail': product.StitchDetail.stictchDetail,
        'Neck Type': product.Neck.neckType,
        'Sleeve': product.Sleeve.sleeveName,
        'Category': product.Category.categoryName,
        'Total Pcs': stockHistory.total_pcs,
        'Stock-In Date': stockHistory.created_at,
      };
    });

    // Create a new workbook and add a worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Overall Stocks');

    // Generate a buffer
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Set the response headers and send the file
    res.setHeader('Content-Disposition', 'attachment; filename=overall-stocks-report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
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
    const stockData = await Stock.findAll({
      where: {
        total_pcs: {
          [Op.gt]: 0,
        }
      },
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
    });
    // Organize stocks by brand
    const brandWiseStocks = {};

    stockData.forEach(stock => {
      const brandName = stock.Product.Brand.brandName;

      if (!brandWiseStocks[brandName]) {
        brandWiseStocks[brandName] = {
          brand: stock.Product.Brand,
          stocks: []
        };
      }

      brandWiseStocks[brandName].stocks.push({
        id: stock.id,
        product_style_number: stock.product_style_number,
        stock_by_size: stock.stock_by_size,
        no_bundles: stock.no_bundles,
        total_pcs: stock.total_pcs,
        created_at: stock.created_at,
        product: stock.Product
      });
    });

    // Convert the object into an array for the response
    const response = Object.values(brandWiseStocks);

    res.status(200).json(response);
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