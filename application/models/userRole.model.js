module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      userId: DataTypes.STRING,
      roleId: DataTypes.STRING,
    },
    {
      tableName: "user_roles",
      timestamps: false,
    }
  );

  UserRole.associate = function (models) {
    UserRole.belongsTo(models.User, { foreignKey: "userId" });
    UserRole.belongsTo(models.Role, { foreignKey: "roleId" });
  };

  return UserRole;
};
