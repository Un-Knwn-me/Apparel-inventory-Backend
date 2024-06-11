module.exports = (sequelize, DataTypes) => {
    const PrintEmbName = sequelize.define('PrintEmbName', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      printType: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
        tableName: 'PrintEmbNames',
        timestamps: false,
    });
  
    return PrintEmbName;
  };  