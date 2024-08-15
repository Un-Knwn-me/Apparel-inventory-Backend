const { Stock, Product, StockHistory, PurchaseOrder, Category, Brand, Reference, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, ProductTypes, MeasurementChart } = require('../models');

// Create a new Stock Entry
exports.createStockEntry = async (req, res) => {
    try {
      const {
        product_style_number,
        stock_by_size,
        no_bundles,
        packing_type,
        total_pcs,
      } = req.body;

      // Fetch the product ID using the product style number
      const product = await Product.findOne({ where: { style_no: product_style_number } });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

   // Check the stock entry
    const existingStock = await Stock.findOne({ where: { product_style_number } });

    if (existingStock) {
      return res.status(409).json({ error: 'Stock entry with this product style number already exists' });
    }

    // Create new stock entry
    const stock = await Stock.create({
      product_reference_number,
      stock_by_size,
      no_bundles,
      packing_type,
      total_pcs,
      product_id: product.id,
    });

      // Create stock history entry
      const stockHistory = await StockHistory.create({
        stock_id: stock.id,
        product_id: product.id,
        stock_type: 'Stock In'
      });

      res.status(201).json({ stock, stockHistory });
    } catch (error) {
      console.error('Error creating stock entry:', error);
      res.status(500).json({ error: 'An error occurred while creating the stock entry' });
    }
  };

 // Get all Stock In
 exports.getAllStockIn = async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      include: [
        {
          model: Product,
          attributes: [
            'id', 'reference_id', 'style_no', 'short_description', 'full_description', 'brand_id', 'fabric_id', 'fabric_finish_id',
            'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id',
            'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id',
            'inner_pcs', 'category_id', 'productType_id', 'measurement_chart_id', 'is_Stocked',
            'images', 'created_at'
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
        },
        {
          model: StockHistory,
          attributes: ['id', 'stock_id', 'total_stockOut_bundle', 'product_id', 'stock_type', 'purchase_order_number', 'purchase_order_id', 'created_at'],
          include: [
            { model: Product, attributes: ['id', 'reference_number'] }
          ]
        }
      ]
    });
    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'An error occurred while fetching the stocks' });
  }
};  
 

  exports.getStockInById = async (req, res) => {
    try {
      const stock = await Stock.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            attributes: ['id', 'reference_id', 'style_no', 'short_description', 'full_description', 'brand_id', 'fabric_id', 'fabric_finish_id', 'gsm_id', 'knit_type_id', 'color_id', 'size_id', 'decoration_id', 'print_emb_id', 'stitch_detail_id', 'neck_id', 'sleeve_id', 'length_id', 'packing_method_id', 'inner_pcs_id', 'outer_carton_pcs_id', 'measurement_chart_id', 'is_Stocked', 'images', 'created_at'],
            include: [
                { model: Brand, attributes: ['id', 'brandName', 'isActive'] },
                { model: Reference, attributes: ['id', 'reference_no', 'isActive'] },
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
      });
  
      if (stock) {
        res.status(200).json(stock);
      } else {
        res.status(404).json({ error: 'Stock not found' });
      }
    } catch (error) {
      console.error('Error fetching stock:', error);
      res.status(500).json({ error: 'An error occurred while fetching the stock' });
    }
  };

exports.updateStockInById = async (req, res) => {
    try {
        const {
        product_style_number,
        stock_by_size,
        no_bundles,
        packing_type,
        total_pcs,
        product_id,
        } = req.body;
    
        // Find the stock by ID
        const stock = await Stock.findByPk(req.params.id);
        if (!stock) {
          return res.status(404).json({ error: 'Stock not found' });
        }
    
        // Update the stock fields
        stock.product_style_number = product_style_number || stock.product_style_number;
        stock.stock_by_size = stock_by_size || stock.stock_by_size;
        stock.no_bundles = no_bundles || stock.no_bundles;
        stock.packing_type = packing_type || stock.packing_type;
        stock.no_bundles = no_bundles || stock.no_bundles;
        stock.total_pcs = total_pcs || stock.total_pcs;
        stock.product_id = product_id || stock.product_id;

        // Save the updated stock
        await stock.save();
    
        res.status(200).json({ stock });
      } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ error: 'An error occurred while updating the stock' });
      }
    };

exports.deleteStockInById = async (req, res) => {
    try {
        // Find the stock by ID
        const stock = await Stock.findByPk(req.params.id);

        if (!stock) {
          return res.status(404).json({ error: 'Stock not found' });
        }

        // Delete all related stock history entries
        await StockHistory.destroy({ where: { stock_id: stock.id } });
    
        // Delete the stock
        await stock.destroy();
    
        res.status(202).json({ message: 'Stock deleted successfully' });
      } catch (error) {
        console.error('Error deleting stock:', error);
        res.status(500).json({ error: 'An error occurred while deleting the stock' });
      }
    };
