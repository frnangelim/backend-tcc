"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["IN_PERSON", "REMOTE"],
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM,
        values: ["CHILDREN", "ANIMALS", "OTHERS"],
        allowNull: false,
      },
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: "id",
          model: "users",
        },
      },

      address: DataTypes.STRING,
      date: DataTypes.DATE,
      image: DataTypes.BLOB("long"),

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
