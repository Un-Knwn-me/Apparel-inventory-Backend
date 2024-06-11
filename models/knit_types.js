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
    }, {
        tableName: 'KnitTypes',
        timestamps: false,
    });
  
    return KnitType;
  };