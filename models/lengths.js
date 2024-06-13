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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Lengths',
        timestamps: false,
    });

    Length.associate = function(models) {
      Length.hasMany(models.Product, { foreignKey: 'length_id' });
    };
  
    return Length;
  };