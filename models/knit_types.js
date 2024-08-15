module.exports = (sequelize, DataTypes) => {
    const KnitType = sequelize.define('KnitType', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      knitType: {
        type: DataTypes.STRING,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'KnitTypes',
        timestamps: false,
    });

    KnitType.associate = function(models) {
      KnitType.hasMany(models.Product, { foreignKey: 'knit_type_id' });
      KnitType.hasMany(models.PurchaseOrder, { foreignKey: 'knit_type_id' });
    };
  
    return KnitType;
  };