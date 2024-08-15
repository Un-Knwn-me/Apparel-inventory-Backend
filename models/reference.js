module.exports = (sequelize, DataTypes) => {
    const Reference = sequelize.define('Reference', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reference_no: {
        type: DataTypes.STRING,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'Reference',
        timestamps: false,
    });

    Reference.associate = function(models) {
      Reference.hasMany(models.Product, { foreignKey: 'reference_id' });
    };
  
    return Reference;
  };