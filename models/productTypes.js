module.exports = (sequelize, DataTypes) => {
  const ProductTypes = sequelize.define('ProductTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product: {
      type: DataTypes.STRING,
      unique: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    tableName: 'ProductTypes',
    timestamps: false,
  });

  ProductTypes.associate = function(models) {
    ProductTypes.hasMany(models.Product, { foreignKey: 'productType_id' });
    ProductTypes.hasMany(models.PurchaseOrder, { foreignKey: 'productType_id' });
  };

  return ProductTypes;
};
