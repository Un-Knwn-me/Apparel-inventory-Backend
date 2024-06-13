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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'StitchDetails',
        timestamps: false,
    });

    StitchDetail.associate = function(models) {
      StitchDetail.hasMany(models.Product, { foreignKey: 'stitch_detail_id' });
    };
  
    return StitchDetail;
  };