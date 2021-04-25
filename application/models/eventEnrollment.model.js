module.exports = (sequelize, DataTypes) => {
  const EventEnrollment = sequelize.define(
    "EventEnrollment",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      tableName: "event_enrollments",
    }
  );

  EventEnrollment.associate = function (models) {
    EventEnrollment.belongsTo(models.Event, {
      foreignKey: "eventId",
      as: "event",
    });
    EventEnrollment.belongsTo(models.EventSlot, {
      foreignKey: "slotId",
      as: "slot",
    });
  };

  return EventEnrollment;
};
