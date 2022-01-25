const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');
const {User} = require('../model');


const authToken = () => {
    return async(req, res, next) => {
        const {authorization} = req.headers;
        if (!authorization) {
            res.status(409).json({
                message: "Invalid token"
            });
            return;
        }
        const [bearer, token] = authorization.split(" ");

        if (bearer !== 'Bearer') {
            res.status(409).json({
                message: "Invalid token"
            });
            return;
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);

            if (!user) {
                throw new Unauthorized('Invalid token');
            }
            req.user = user;
            next();
        }
        catch(error) {
            error.status = 401;
            next(error)
        }
    }
}

module.exports = authToken;