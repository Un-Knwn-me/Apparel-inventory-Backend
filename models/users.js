module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(100),
      },
      profile: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      phone_number: {
        type: DataTypes.INTEGER(10),
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: 'Users',
      timestamps: false,
    });

    User.associate = function(models) {
      User.belongsToMany(models.Permission, {
        through: 'UserPermissions',
        foreignKey: 'user_id',
        otherKey: 'permission_id',
      });
      User.belongsToMany(models.Department, {
        through: 'UserPermissions',
        foreignKey: 'user_id',
        otherKey: 'department_id',
      });
    };
  
    return User;
  };