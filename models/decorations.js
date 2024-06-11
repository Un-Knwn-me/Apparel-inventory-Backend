module.exports = (sequelize, DataTypes) => {
    const Decoration = sequelize.define('Decoration', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      decorationName: {
        type: DataTypes.STRING,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Decorations',
        timestamps: false,
    });
  
    return Decoration;
  };  