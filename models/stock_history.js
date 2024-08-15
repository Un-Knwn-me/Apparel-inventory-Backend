module.exports = (sequelize, DataTypes) => {
  const StockHistory = sequelize.define('StockHistory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stock_type: {
      type: DataTypes.ENUM('Stock In', 'Stock Out'),
    },
    stock_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Stocks',
        key: 'id',
      },
    },
    stockOut_by_size: {
      type: DataTypes.JSON,
    },
    stockOut_bundle: {
      type: DataTypes.INTEGER,
    },
    total_stockOut_pcs: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    purchase_order_number: {
      type: DataTypes.STRING,
    },
    purchase_order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PurchaseOrders',
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

StockHistory.associate = function(models) {
  StockHistory.belongsTo(models.Stock, { foreignKey: 'stock_id' });
  StockHistory.belongsTo(models.Product, { foreignKey: 'product_id' });
  StockHistory.belongsTo(models.PurchaseOrder, { foreignKey: 'purchase_order_id' });
};

  return StockHistory;
};