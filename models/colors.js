module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      colorName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      }
    }, {
        tableName: 'Colors',
        timestamps: false,
    });

    Color.associate = function(models) {
      Color.hasMany(models.Product, { foreignKey: 'color_id' });
    };
  
    return Color;
  };