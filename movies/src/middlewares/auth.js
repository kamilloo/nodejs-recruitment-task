const jwt = require('jsonwebtoken');

const env = process.env;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.userId = userId;
            req.userRole = decodedToken.role;
            next();
        }
    } catch {
        res.status(401).json({
            error: 'Unauthenticated.'
        });
    }
};