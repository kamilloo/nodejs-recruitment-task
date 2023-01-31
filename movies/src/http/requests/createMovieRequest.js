const validator = require('../../middlewares/validate');
const createMovieRequest = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
    };

    await validator(req.body, validationRule, {}, res, next)
        .catch( err => console.log(err))
}
module.exports = {
    createMovieRequest
};