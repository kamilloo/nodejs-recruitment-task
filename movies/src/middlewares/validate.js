const Validator = require('validatorjs');

const validator = async (body, rules, customMessages, res, next) => {
    let callback = (err, status) => {
        if (!status) {
            res.status(422)
                .send({
                    message: 'Validation failed',
                    errors: err.errors
                });
        } else {
            next();
        }
    }
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
module.exports = validator;