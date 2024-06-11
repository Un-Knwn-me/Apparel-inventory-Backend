module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_reference_number: {
        type: DataTypes.STRING,
      },
      stock_by_size: {
        type: DataTypes.JSON,
      },
      no_bundles: {
        type: DataTypes.INTEGER,
      },
      total_pcs_in_bundle: {
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
  
    return Stock;
  };  