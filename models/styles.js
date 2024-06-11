module.exports = (sequelize, DataTypes) => {
    const Style = sequelize.define('Style', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      style_no: {
        type: DataTypes.STRING,
        unique: true,
      },
      short_description: {
        type: DataTypes.TEXT,
      },
      full_description: {
        type: DataTypes.TEXT,
      },
    }, {
        tableName: 'Styles',
        timestamps: false,
    });
  
    return Style;
  };