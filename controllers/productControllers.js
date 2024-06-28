const { bucket } = require('../middlewares/storage');
const { format } = require('util');
const path = require('path');
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
      created_at
    } = req.body;

    // Check if a product with the same reference_number already exists
    const existingProduct = await Product.findOne({ where: { reference_number } });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this reference number already exists' });
    }

    // Extract image URLs from the files uploaded
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      // Loop through the uploaded files and upload each to the cloud bucket
      for (const file of req.files) {
        const originalname = file.originalname;
        const blob = bucket.file(`Products/${Date.now()}_${path.basename(originalname)}`);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on('error', (err) => {
          console.error('Blob stream error:', err);
          res.status(500).json({ error: 'Failed to upload image' });
        });

        blobStream.on('finish', async () => {

          // Generate the public URL for the file
          const url = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
          imageUrls.push(url);

          // Proceed with product creation once all files are uploaded
          if (imageUrls.length === req.files.length) {
            // Create the new product with image URLs
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
              images: imageUrls,
              created_at
            });

            res.status(201).json(product);
          }
        });

        blobStream.end(file.buffer);
      }
    } else {
      // Create the product without images if no files are uploaded
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
        images: imageUrls,
        created_at
      });

      res.status(201).json(product);
    }
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

    // If there are images in the request, handle the upload to Google Cloud Storage
    if (req.files && req.files.length > 0) {
      const imageUrls = [];

      for (const file of req.files) {
        const originalname = file.originalname;
        const blob = bucket.file(`products/${Date.now()}_${path.basename(originalname)}`);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on('error', (err) => {
          console.error('Blob stream error:', err);
          return res.status(500).json({ error: 'Failed to upload image' });
        });

        blobStream.on('finish', async () => {

          // Generate the public URL for the file
          const url = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
          imageUrls.push(url);

          // Proceed with product update once all files are uploaded
          if (imageUrls.length === req.files.length) {
            // Merge the new image URLs with the existing images (if any)
            const existingImages = product.images || [];
            updatedFields.images = existingImages.concat(imageUrls);

            // Update the product with the new fields
            await product.update(updatedFields);

            res.status(200).json(product);
          }
        });

        blobStream.end(file.buffer);
      }
    } else {
      // If no new images are uploaded, just update the product with the provided fields
      await product.update(updatedFields);
      res.status(200).json(product);
    }
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

// Delete product image
exports.deleteProductImageLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the specific image link from the images array
    const updatedImages = product.images.filter(image => image !== imageUrl);

    // Update the product's images array
    product.images = updatedImages;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Product image link deleted successfully', product });
  } catch (error) {
    console.error('Error deleting product image link:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product image link' });
  }
};