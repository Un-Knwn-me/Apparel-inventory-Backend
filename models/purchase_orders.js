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
      product_reference_no: {
        type: DataTypes.STRING,
        references: {
          model: 'Products',
          key: 'reference_number',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      buyer: {
        type: DataTypes.STRING,
      },
      unique_name: {
        type: DataTypes.STRING,
      },
      purchase_quantity: {
        type: DataTypes.INTEGER,
      },
      delivery_date: {
        type: DataTypes.DATE,
      },
      diameter: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'measurement_chart_id',
        },
      },
      stock_out_no_bundles: {
        type: DataTypes.INTEGER,
      },
      total_purchase_qty: {
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
  };
  
    return PurchaseOrder;
  };  