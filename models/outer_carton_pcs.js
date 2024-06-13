module.exports = (sequelize, DataTypes) => {
    const OuterCartonPcs = sequelize.define('OuterCartonPcs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number_of_pcs: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
      tableName: 'OuterCartonPcs',
      timestamps: false,
    });

    OuterCartonPcs.associate = function(models) {
      OuterCartonPcs.hasMany(models.Product, { foreignKey: 'outer_carton_pcs_id' });
    };
  
    return OuterCartonPcs;
  };