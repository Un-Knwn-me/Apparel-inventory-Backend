module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      permission: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'Permissions',
      timestamps: false,
    });

    Permission.associate = function(models) {
      Permission.belongsToMany(models.User, {
        through: 'UserPermissions',
        foreignKey: 'permission_id',
        otherKey: 'user_id',
      });
    };
  
    return Permission;
  };  