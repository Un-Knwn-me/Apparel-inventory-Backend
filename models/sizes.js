module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define('Size', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Sizes',
        timestamps: false,
    });

    Size.associate = function(models) {
      Size.hasMany(models.Product, { foreignKey: 'size_id' });
    };
  
    return Size;
  };