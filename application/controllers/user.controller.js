// Services
const RestService = require("../services/rest.service");
const UserService = require("../services/user.service");

async function getUser(req, res, next) {
  try {
    const result = await UserService.getUser(req.params.slug);
    return RestService.ok(res, result);
  } catch (error) {
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function getAuthenticatedUser(req, res, next) {
  try {
    const result = await UserService.getAuthenticatedUser(req.user.id);
    return RestService.ok(res, result);
  } catch (error) {
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function create(req, res, next) {
  try {
    const result = await UserService.create(req.body);
    return RestService.ok(res, result);
  } catch (error) {
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function update(req, res, next) {
  try {
    const data = JSON.parse(req.body.user);
    const result = await UserService.update(data, req.user.id, req.files);
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
  getUser,
  getAuthenticatedUser,
  create,
  update,
};
