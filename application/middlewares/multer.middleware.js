// Bibliotecas
const Multer = require("multer");

// Configurações
const configuration = require("../../config/multer.configuration");

module.exports = Multer(configuration);
