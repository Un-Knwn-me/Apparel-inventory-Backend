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
        type: DataTypes.JSON,
      },
    }, {
        tableName: 'Sizes',
        timestamps: false,
    });
  
    return Size;
  };