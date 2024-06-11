module.exports = (sequelize, DataTypes) => {
    const Neck = sequelize.define('Neck', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      neckType: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
        tableName: 'Necks',
        timestamps: false,
    });
  
    return Neck;
  };