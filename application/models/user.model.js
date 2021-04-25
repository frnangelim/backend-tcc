const Slugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      fullName: DataTypes.STRING,
      slug: DataTypes.STRING,
      address: DataTypes.STRING,
      profileImage: {
        type: DataTypes.BLOB("long"),
        get() {
          const data = this.getDataValue("profileImage");
          return data
            ? "data:image/png;charset=utf-8;base64," + data.toString("base64")
            : "";
        },
      },
      coverImage: {
        type: DataTypes.BLOB("long"),
        get() {
          const data = this.getDataValue("coverImage");
          return data
            ? "data:image/png;charset=utf-8;base64," + data.toString("base64")
            : "";
        },
      },
      facebookUrl: DataTypes.STRING,
      instagramUrl: DataTypes.STRING,
      websiteUrl: DataTypes.STRING,
      whatsappNumber: DataTypes.STRING,
      bio: DataTypes.TEXT,

      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      tableName: "users",
    }
  );

  Slugify.slugifyModel(User, {
    source: ["fullName"],
    overwrite: false,
  });

  User.associate = function (models) {
    User.belongsToMany(models.Role, {
      through: "UserRole",
      foreignKey: "userId",
      as: "roles",
    });
  };

  return User;
};
