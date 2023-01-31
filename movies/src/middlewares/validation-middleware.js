const validator = require('../http/requests/validate');
const createMovieRequest = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "description": "required|string",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(422)
                .send({
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    createMovieRequest
};