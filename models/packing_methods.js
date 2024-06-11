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
  
    return PackingMethod;
  };  