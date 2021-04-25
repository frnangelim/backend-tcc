module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      title: DataTypes.STRING,
    },
    {
      tableName: "roles",
    }
  );

  Role.associate = function (models) {
    Role.belongsToMany(models.User, {
      through: "UserRoles",
      foreignKey: "roleId",
    });
  };

  return Role;
};
