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
      },
    }, {
      tableName: 'Brands',
      timestamps: false,
    });

    Brand.associate = function(models) {
      Brand.hasMany(models.Product, {
        foreignKey: 'brand_id',
      });
    };
  
    return Brand;
  };