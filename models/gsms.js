module.exports = (sequelize, DataTypes) => {
    const Gsm = sequelize.define('Gsm', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      gsmValue: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Gsms', 
        timestamps: false,
    });

    Gsm.associate = function(models) {
      Gsm.hasMany(models.Product, { foreignKey: 'gsm_id' });
    };
  
    return Gsm;
  };