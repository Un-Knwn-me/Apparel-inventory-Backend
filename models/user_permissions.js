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
      primaryKey: true,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },
    permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Permissions',
        key: 'id',
      },
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'department_id', 'permission_id']
      }
    ],
    tableName: 'UserPermissions',
    timestamps: false,
  });

  return UserPermission;
};