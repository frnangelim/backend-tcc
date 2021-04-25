const Slugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const EventSlot = sequelize.define(
    "EventSlot",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      slug: DataTypes.STRING,
      name: DataTypes.STRING,
      slots: DataTypes.STRING,
    },
    {
      tableName: "event_slots",
    }
  );

  Slugify.slugifyModel(EventSlot, {
    source: ["name"],
    overwrite: false,
  });

  EventSlot.associate = function (models) {
    EventSlot.belongsTo(models.Event, {
      foreignKey: "eventId",
      as: "event",
    });
  };

  return EventSlot;
};
