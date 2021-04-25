// Services
const RestService = require("../services/rest.service");
const EventService = require("../services/event.service");

async function getOne(req, res, next) {
  try {
    const result = await EventService.getOne(req.user, req.params.slug);
    return RestService.ok(res, result);
  } catch (error) {
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function getUserEvents(req, res, next) {
  try {
    const result = await EventService.getUserEvents(req.user);
    return RestService.ok(res, result);
  } catch (error) {
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function getSlot(req, res, next) {
  try {
    const result = await EventService.getSlot(
      req.params.eventSlug,
      req.params.slotSlug
    );
    return RestService.ok(res, result);
  } catch (error) {
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function getList(req, res, next) {
  try {
    const result = await EventService.getList(req.body);

    return RestService.ok(res, result);
  } catch (error) {
    console.log("ERR", error);
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function create(req, res, next) {
  try {
    const data = JSON.parse(req.body.event);
    const result = await EventService.createEvent(data, req.user, req.file);
    return RestService.ok(res, result);
  } catch (error) {
    console.log("error", error);
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function update(req, res, next) {
  try {
    const data = JSON.parse(req.body.event);
    const result = await EventService.update(data, req.user.id, req.file);
    return RestService.ok(res, result);
  } catch (error) {
    console.log("error", error);
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function removeById(req, res, next) {
  try {
    const result = await EventService.removeById(req.params.id, req.user);
    return RestService.ok(res, result);
  } catch (error) {
    console.log("error", error);
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

async function createEnrollment(req, res, next) {
  try {
    const result = await EventService.createEnrollment(req.body);
    return RestService.ok(res, result);
  } catch (error) {
    console.log("error", error);
    return RestService.internalError(res, {
      error,
      path: req.path,
      message: error.toString().replace("Error: ", ""),
    });
  }
}

module.exports = {
  getOne,
  getUserEvents,
  getSlot,
  getList,
  create,
  update,
  removeById,
  createEnrollment,
};
