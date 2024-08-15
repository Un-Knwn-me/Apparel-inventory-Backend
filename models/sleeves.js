module.exports = (sequelize, DataTypes) => {
    const Sleeve = sequelize.define('Sleeve', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sleeveName: {
        type: DataTypes.STRING,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Sleeves',
        timestamps: false,
    });

    Sleeve.associate = function(models) {
      Sleeve.hasMany(models.Product, { foreignKey: 'sleeve_id' });
      Sleeve.hasMany(models.PurchaseOrder, { foreignKey: 'sleeve_id' });
    };
  
    return Sleeve;
  };  