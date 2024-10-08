module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    style_no: {
      type: DataTypes.STRING,
      unique: true,
    },
    short_description: {
      type: DataTypes.TEXT,
    },
    full_description: {
      type: DataTypes.TEXT,
    },
    reference_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reference',
        key: 'id',
      },
    },
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Brands',
        key: 'id',
      },
    },
    fabric_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Fabrics',
        key: 'id',
      },
    },
    fabric_finish_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'FabricFinishes',
        key: 'id',
      },
    },
    gsm_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Gsms',
        key: 'id',
      },
    },
    knit_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'KnitTypes',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
    color_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Colors',
        key: 'id',
      },
    },
    size_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sizes',
        key: 'id',
      },
    },
    decoration_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Decorations',
        key: 'id',
      },
    },
    print_emb_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PrintEmbNames',
        key: 'id',
      },
    },
    stitch_detail_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'StitchDetails',
        key: 'id',
      },
    },
    neck_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Necks',
        key: 'id',
      },
    },
    sleeve_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sleeves',
        key: 'id',
      },
    },
    length_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Lengths',
        key: 'id',
      },
    },
    packing_method_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PackingMethods',
        key: 'id',
      },
    },
    inner_pcs: {
      type: DataTypes.INTEGER,
    },
    productType_id: {
      type: DataTypes.INTEGER,
      references: {
        model:'ProductTypes',
        key: 'id'
      },
    },
    measurement_chart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MeasurementCharts',
        key: 'id',
      },
    },
    images: {
      type: DataTypes.JSON,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
    Product.belongsTo(models.Reference, { foreignKey: 'reference_id' });
    Product.belongsTo(models.Fabric, { foreignKey: 'fabric_id' });
    Product.belongsTo(models.FabricFinish, { foreignKey: 'fabric_finish_id' });
    Product.belongsTo(models.Gsm, { foreignKey: 'gsm_id' });
    Product.belongsTo(models.KnitType, { foreignKey: 'knit_type_id' });
    Product.belongsTo(models.Color, { foreignKey: 'color_id' });
    Product.belongsTo(models.Category, { foreignKey: 'category_id' });
    Product.belongsTo(models.Size, { foreignKey: 'size_id' });
    Product.belongsTo(models.Decoration, { foreignKey: 'decoration_id' });
    Product.belongsTo(models.PrintEmbName, { foreignKey: 'print_emb_id' });
    Product.belongsTo(models.StitchDetail, { foreignKey: 'stitch_detail_id' });
    Product.belongsTo(models.Neck, { foreignKey: 'neck_id' });
    Product.belongsTo(models.Sleeve, { foreignKey: 'sleeve_id' });
    Product.belongsTo(models.Length, { foreignKey: 'length_id' });
    Product.belongsTo(models.PackingMethod, { foreignKey: 'packing_method_id' });
    Product.belongsTo(models.ProductTypes, { foreignKey: 'productType_id' });
    Product.belongsTo(models.MeasurementChart, { foreignKey: 'measurement_chart_id' });
    Product.hasMany(models.Stock, { foreignKey: 'product_id' });
    Product.hasMany(models.PurchaseOrder, { foreignKey: 'product_id' });
  };

  return Product;
};
