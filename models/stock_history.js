module.exports = (sequelize, DataTypes) => {
    const StockHistory = sequelize.define('StockHistory', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stock_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Stocks',
          key: 'id',
        },
      },
      total_stockOut_bundle: {
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      stock_type: {
        type: DataTypes.ENUM('Stock In', 'Stock Out'),
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