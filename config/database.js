require("dotenv").config();

const database = {
  development: {
    username: "root",
    password: "rootroot",
    database: "gaja",
    dialect: "mysql",
    options: {
      host: "localhost",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  },

  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: "mysql",
    options: {
      host: process.env.DB_HOST,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  },
};

module.exports = database[process.env.NODE_ENV || "development"];
