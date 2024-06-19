const { Stock, Product, StockHistory, PurchaseOrder, Brand, Style, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, InnerPcs, OuterCartonPcs, MeasurementChart } = require('../models');

exports.createStockEntry = async (req, res) => {
    try {
      const {
        product_reference_number,
        stock_by_size,
        no_bundles,
        total_inner_pcs,
        total_pcs_in_bundle,
        stock_type
      } = req.body;
  
      // Fetch the product ID using the product reference number
      const product = await Product.findOne({ where: { reference_number: product_reference_number } });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Create or update the stock entry
      let stock = await Stock.findOne({ where: { product_reference_number } });
      if (stock) {
        // Update stock details
        stock.stock_by_size = stock_by_size || stock.stock_by_size;
        stock.no_bundles = no_bundles || stock.no_bundles;
        stock.total_inner_pcs = total_inner_pcs || stock.total_inner_pcs;
        stock.total_pcs_in_bundle = total_pcs_in_bundle || stock.total_pcs_in_bundle;
        await stock.save();
      } else {
        // Create new stock entry
        stock = await Stock.create({
          product_reference_number,
          stock_by_size,
          no_bundles,
          total_inner_pcs,
          total_pcs_in_bundle,
          product_id: product.id,
        });
      }

      // Update the product with the stock ID and set is_stocked to true
      product.stock_id = stock.id;
      product.is_Stocked = true;
      await product.save();
  
      // Create stock history entry
      const stockHistory = await StockHistory.create({
        stock_id: stock.id,
        product_id: product.id,
        stock_type
      });
  
      res.status(201).json({ stock, stockHistory });
    } catch (error) {
      console.error('Error creating stock entry:', error);
      res.status(500).json({ error: 'An error occurred while creating the stock entry' });
    }
  };

  exports.getAllStockIn = async (req, res) => {
    try {
      const stocks = await Stock.findAll({
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
          stock_by_size,
          no_bundles,
          total_inner_pcs,
          total_pcs_in_bundle,
          stock_type,
        } = req.body;
    
        // Find the stock by ID
        const stock = await Stock.findByPk(req.params.id);
        if (!stock) {
          return res.status(404).json({ error: 'Stock not found' });
        }
    
        // Update the stock fields
        stock.stock_by_size = stock_by_size || stock.stock_by_size;
        stock.no_bundles = no_bundles || stock.no_bundles;
        stock.total_inner_pcs = total_inner_pcs || stock.total_inner_pcs;
        stock.total_pcs_in_bundle = total_pcs_in_bundle || stock.total_pcs_in_bundle;
    
        // Save the updated stock
        await stock.save();
    
        // Create a new stock history entry
        const stockHistory = await StockHistory.create({
          stock_id: stock.id,
          total_stockOut_bundle: no_bundles,
          product_id: stock.product_id,
          stock_type: stock_type,
        });
    
        res.status(200).json({ stock, stockHistory });
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
        
        // Update related products to set stock_id to null and is_Stocked to false
        await Product.update(
          { stock_id: null, is_Stocked: false },
          { where: { stock_id: stock.id } }
        );

        // Delete all related stock history entries
        await StockHistory.destroy({ where: { stock_id: stock.id } });
    
        // Delete the stock
        await stock.destroy();
    
        res.status(200).json({ message: 'Stock deleted successfully' });
      } catch (error) {
        console.error('Error deleting stock:', error);
        res.status(500).json({ error: 'An error occurred while deleting the stock' });
      }
    };
