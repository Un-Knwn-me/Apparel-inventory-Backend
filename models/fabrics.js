module.exports = (sequelize, DataTypes) => {
    const Fabric = sequelize.define('Fabric', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fabricName: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
      tableName: 'Fabrics',
      timestamps: false,
    });
  
    return Fabric;
  };