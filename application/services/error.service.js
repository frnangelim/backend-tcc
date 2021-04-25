// Serviços
const RestService = require("./rest.service");

/**
 * Emite um erro de requisição inválida.
 *
 * @param {Object} response Objeto de resposta
 * @param {String} path Caminho da requisição
 * @param {String} message Mensagem personalizada de erro
 * @param {Object} error Objeto de erro
 */
function invalidRequest(response, path, message, error) {
  // Emite o erro de requisição inválida
  RestService.badRequest(response, path, message, error);
}

/**
 * Emite um erro interno do servidor.
 *
 * @param {Object} response Objeto de resposta
 * @param {String} path Caminho da requisição
 * @param {String} message Mensagem personalizada de erro
 * @param {Object} error Objeto de erro
 */
function internalError(response, path, message, error) {
  // Emite o erro de requisição inválida
  RestService.internalError(response, path, message, error);
}

/**
 * Emite um erro interno do servidor.
 *
 * @param {Object} response Objeto de resposta
 * @param {String} path Caminho da requisição
 * @param {String} message Mensagem personalizada de erro
 */
function notFound(response, path, message) {
  // Emite o erro de requisição inválida
  RestService.notFound(response, path, message);
}

/**
 * Emite um erro de autenticação.
 *
 * @param {Object} response Objeto de resposta
 * @param {String} path Caminho da requisição
 * @param {String} message Mensagem personalizada de erro
 * @param {Object} error Objeto de erro
 */
function unauthorized(response, path, message, error) {
  // Emite o erro de requisição inválida
  RestService.unauthorized(response, path, message, error);
}

module.exports = {
  invalidRequest,
  internalError,
  notFound,
  unauthorized,
};
