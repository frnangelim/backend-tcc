// Services
const RestService = require('../services/rest.service');

module.exports = {

    async ping(req, res) {

        try {
            RestService.ok(res, { result: 'Pong' });
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    }
}
