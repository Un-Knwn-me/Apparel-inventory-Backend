module.exports = (sequelize, DataTypes) => {
    const OuterCartonPcs = sequelize.define('OuterCartonPcs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number_of_pcs: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    }, {
      tableName: 'OuterCartonPcs',
      timestamps: false,
    });
  
    return OuterCartonPcs;
  };