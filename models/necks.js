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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Necks',
        timestamps: false,
    });

    Neck.associate = function(models) {
      Neck.hasMany(models.Product, { foreignKey: 'neck_id' });
    };
  
    return Neck;
  };