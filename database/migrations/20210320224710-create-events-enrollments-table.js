"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("event_enrollments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      eventId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          key: "id",
          model: "events",
        },
      },
      slotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          key: "id",
          model: "event_slots",
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("events");
  },
};
