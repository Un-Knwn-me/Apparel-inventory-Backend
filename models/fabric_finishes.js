module.exports = (sequelize, DataTypes) => {
    const FabricFinish = sequelize.define('FabricFinish', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fabricFinishName: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
        tableName: 'FabricFinishes',
        timestamps: false,
    });
  
    return FabricFinish;
  };  