module.exports = (sequelize, DataTypes) => {
  const UserPermission = sequelize.define('UserPermission', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    edit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    create: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'department_id',]
      }
    ],
    tableName: 'UserPermissions',
    timestamps: true,
  });

  UserPermission.associate = function(models) {
    UserPermission.belongsTo(models.User, { foreignKey: 'user_id' });
    UserPermission.belongsTo(models.Department, { foreignKey: 'department_id' });
  };

  return UserPermission;
};