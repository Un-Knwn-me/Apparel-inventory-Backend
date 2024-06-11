module.exports = (sequelize, DataTypes) => {
    const Length = sequelize.define('Length', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lengthType: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
        tableName: 'Lengths',
        timestamps: false,
    });
  
    return Length;
  };