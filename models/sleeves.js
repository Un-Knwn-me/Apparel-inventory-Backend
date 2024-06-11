module.exports = (sequelize, DataTypes) => {
    const Sleeve = sequelize.define('Sleeve', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sleeveName: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
        tableName: 'Sleeves',
        timestamps: false,
    });
  
    return Sleeve;
  };  