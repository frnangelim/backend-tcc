// Serviços
const AuthService = require("../services/auth.service");
const RestService = require("../services/rest.service");

function authenticate(required = true) {
  return async (request, response, next) => {
    try {
      let response;
      const header = request.header("Authorization");

      if (!header && required) {
        throw new Error("O cabeçalho de autorização é obrigatório.");
      } else if (header) {
        const token = header.replace("Bearer ", "");
        response = await AuthService.verifyToken(token);

        if (!response) {
          throw new Error("O token informado não é válido.");
        }
      }

      request.user = response;

      next();
    } catch (error) {
      return RestService.unauthorized(response, {
        error,
        path: request.path,
        message: "Not authorized!",
      });
    }
  };
}

module.exports = {
  authenticate,
};
