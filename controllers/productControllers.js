const { Product, PurchaseOrder, Stock, StockHistory, Brand, Style, MeasurementChart, Category, Fabric, FabricFinish, Gsm, KnitType, Color, Size, Decoration, PrintEmbName, StitchDetail, Neck, Sleeve, Length, PackingMethod, InnerPcs, OuterCartonPcs } = require('../models');

exports.createProduct = async (req, res) => {
    try {
      const {
        reference_number,
        style_id,
        brand_id,
        category_id,
        fabric_id,
        fabric_finish_id,
        gsm_id,
        knit_type_id,
        color_id,
        size_id,
        decoration_id,
        print_emb_id,
        stitch_detail_id,
        neck_id,
        sleeve_id,
        length_id,
        packing_method_id,
        inner_pcs_id,
        outer_carton_pcs_id,
        measurement_chart_id,
        is_Stocked,
        images,
        created_at
      } = req.body;

    // Check if a product with the same reference_number already exists
    const existingProduct = await Product.findOne({ where: { reference_number } });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this reference number already exists' });
    }
  
    // Create the new Brand
    const product = await Product.create({
      reference_number,
      style_id,
      brand_id,
      category_id,
      fabric_id,
      fabric_finish_id,
      gsm_id,
      knit_type_id,
      color_id,
      size_id,
      decoration_id,
      print_emb_id,
      stitch_detail_id,
      neck_id,
      sleeve_id,
      length_id,
      packing_method_id,
      inner_pcs_id,
      outer_carton_pcs_id,
      measurement_chart_id,
      is_Stocked,
      images,
      created_at
    });
  
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating brand:', error);
      res.status(500).json({ error: 'An error occurred while creating the brand' });
    }
  };

  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll({
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
      });
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
  };


  // Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
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
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'An error occurred while fetching the product' });
  }
};

// update the product by id
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedFields = req.body;
    
    // Find the product by ID first
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product with only the fields provided in the request body
    await product.update(updatedFields);

    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
};


// Delete product 
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID first
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Nullify the stock_id in products referencing the stock to be deleted
    await Product.update({ stock_id: null }, { where: { id: productId } });

    // Delete all related stock histories
    await StockHistory.destroy({ where: { product_id: productId } });

    // Delete all related stocks
    await Stock.destroy({ where: { product_id: productId } });

    // Delete all related purchase orders
    await PurchaseOrder.destroy({ where: { product_id: productId } });

    // Delete the product
    await product.destroy();

    res.status(202).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
};