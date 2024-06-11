module.exports = (sequelize, DataTypes) => {
    const StitchDetail = sequelize.define('StitchDetail', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stictchDetail: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
        tableName: 'StitchDetails',
        timestamps: false,
    });
  
    return StitchDetail;
  };