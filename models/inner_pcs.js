module.exports = (sequelize, DataTypes) => {
    const InnerPcs = sequelize.define('InnerPcs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number_of_pcs: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'InnerPcs',
        timestamps: false,
    });
  
    return InnerPcs;
  };  