const Multer = require("multer");

const configuration = {
  development: {
    storage: Multer.MemoryStorage,
    limits: {
      // Limite máximo de 10MB
      fileSize: 5 * 1024 * 1024,
    },
  },

  production: {
    storage: Multer.MemoryStorage,
    limits: {
      // Limite máximo de 5MB
      fileSize: Number(process.env.MULTER_SIZE_LIMIT) * 1024 * 1024,
    },
  },
};

module.exports = configuration[process.env.NODE_ENV || "development"];
