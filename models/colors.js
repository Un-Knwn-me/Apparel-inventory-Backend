module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      colorName: {
        type: DataTypes.STRING,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Colors',
        timestamps: false,
    });
  
    return Color;
  };