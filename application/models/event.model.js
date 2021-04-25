const Slugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      category: {
        type: DataTypes.ENUM,
        values: ["CHILDREN", "ANIMALS", "OTHERS"],
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["REMOTE", "IN_PERSON"],
        allowNull: false,
      },
      address: DataTypes.STRING,
      image: {
        type: DataTypes.BLOB("long"),
        get() {
          const data = this.getDataValue("image");
          return data
            ? "data:image/png;charset=utf-8;base64," + data.toString("base64")
            : "";
        },
      },
      date: DataTypes.DATE,
    },
    {
      tableName: "events",
    }
  );

  Slugify.slugifyModel(Event, {
    source: ["title"],
    overwrite: false,
  });

  Event.associate = function (models) {
    Event.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
    Event.hasMany(models.EventSlot, { foreignKey: "eventId", as: "slots" });
    Event.hasMany(models.EventEnrollment, { foreignKey: "eventId" });
  };

  return Event;
};
