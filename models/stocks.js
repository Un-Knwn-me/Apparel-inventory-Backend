module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_style_number: {
      type: DataTypes.STRING,
    },
    packing_type: {
      type: DataTypes.STRING,
    },
    stock_by_size: {
      type: DataTypes.JSON,
    },
    no_bundles: {
      type: DataTypes.INTEGER,
    },
    total_pcs: {
    type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });

  Stock.associate = function(models) {
    Stock.belongsTo(models.Product, { foreignKey: 'product_id' });
    Stock.hasMany(models.StockHistory, { foreignKey: 'stock_id' });
};

  return Stock;
};