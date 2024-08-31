module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define('Warehouse', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      warehouse: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
      tableName: 'Warehouse',
      timestamps: true,
    });
  
    Warehouse.associate = function(models) {
        Warehouse.hasMany(models.Stock, { foreignKey: 'warehouse_id' });
        Warehouse.hasMany(models.StockHistory, { foreignKey: 'warehouse_id' });
    };
  
    return Warehouse;
  };
  