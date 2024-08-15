module.exports = (sequelize, DataTypes) => {


  const Brand = sequelize.define('Brand', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brandName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    tableName: 'Brands',
    timestamps: true,
  });

  Brand.associate = function(models) {
    Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
    Brand.hasMany(models.PurchaseOrder, { foreignKey: 'brand_id' });
  };

  return Brand;
};
