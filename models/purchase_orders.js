module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder = sequelize.define('PurchaseOrder', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_type: {
      type: DataTypes.ENUM('With Purchase Order', 'Without Purchase Order'),
    },
    purchase_order_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Buyers',
        key: 'id',
      },
    },
    delivery_date: {
      type: DataTypes.DATE,
    },
    product_style_number: {
      type: DataTypes.STRING,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    notes: {
      type: DataTypes.STRING,
    },
    packing_type: {
      type: DataTypes.STRING,
    },    
    purchase_by_size: {
      type: DataTypes.JSON,
    },
    req_bundle: {
      type: DataTypes.INTEGER,
    },
    req_purchase_qty: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
      tableName: 'PurchaseOrders',
      timestamps: false,
  });

  PurchaseOrder.associate = function(models) {
    PurchaseOrder.belongsTo(models.Product, { foreignKey: 'product_id' });
    PurchaseOrder.belongsTo(models.Buyer, { foreignKey: 'buyer_id' });
    PurchaseOrder.hasMany(models.StockHistory, { foreignKey: 'purchase_id' });
};

  return PurchaseOrder;
};