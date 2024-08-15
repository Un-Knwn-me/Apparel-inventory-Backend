module.exports = (sequelize, DataTypes) => {
    const PackingMethod = sequelize.define('PackingMethod', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      packingType: {
        type: DataTypes.STRING,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'PackingMethods',
        timestamps: false,
    });

    PackingMethod.associate = function(models) {
      PackingMethod.hasMany(models.Product, { foreignKey: 'packing_method_id' });
      PackingMethod.hasMany(models.PurchaseOrder, { foreignKey: 'packing_method_id' });
    };
  
    return PackingMethod;
  };  