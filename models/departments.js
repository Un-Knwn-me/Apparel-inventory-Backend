module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departmentName: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    tableName: 'Departments',
    timestamps: false,
  });

  Department.associate = function(models) {
    Department.belongsToMany(models.User, { through: models.UserPermission, foreignKey: 'department_id' });
  };

  return Department;
};