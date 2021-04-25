module.exports = {
  ok(res, content = {}) {
    res.status(200);
    res.json(content);
  },

  badRequest(res, message, next) {
    res.status(400);
    res.json({ err: message });
    if (next) return next(new Error([message]));
  },

  internalError(res, error, next) {
    res.status(500);
    res.json({ err: error.stack || error });
    if (next) return next(new Error([error]));
  },

  notFound(res, error, next) {
    res.status(404);
    res.json({ err: error.stack || error.error || error });
    if (next) return next(new Error([error]));
  },

  unauthorized(res, error, next) {
    res.status(401);
    res.json({ err: error.stack || error });
    if (next) return next(new Error([error]));
  },
};
