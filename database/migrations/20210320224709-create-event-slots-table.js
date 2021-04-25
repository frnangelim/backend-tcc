"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("event_slots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slots: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable("event_slots");
  },
};
