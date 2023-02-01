const pino = require('pino')
const logger = pino({level: process.env.LOGGER_LEVEL || 'fatal'})
const validator = require('../../middlewares/validate');
const createMovieRequest = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
    };

    await validator(req.body, validationRule, {}, res, next)
        .catch( err => logger.error(err))
}
module.exports = {
    createMovieRequest
};