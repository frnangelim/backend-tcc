// Services
const RestService = require("../services/rest.service");
const AuthService = require("../services/auth.service");

async function login(req, res, next) {
  try {
    const result = await AuthService.login(req.body);
    return RestService.ok(res, result);
  } catch (error) {
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

module.exports = {
  login,
};
