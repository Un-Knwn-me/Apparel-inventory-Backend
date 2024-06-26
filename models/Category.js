module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      categoryName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      }
    }, {
        tableName: 'Category',
        timestamps: false,
    });

    Category.associate = function(models) {
      Category.hasMany(models.Product, { foreignKey: 'category_id' });
    };
  
    return Category;
  };