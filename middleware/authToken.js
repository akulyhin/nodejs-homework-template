const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');
const {User} = require('../model');


const authToken = () => {
    return async(req, res, next) => {
        const {authorization} = req.headers;
        if (!authorization) {
            res.code(409).json({
                message: 'Invalud token',
                code: 409
            })
            return;
        }
        const [bearer, token] = authorization.split(" ");

        if (bearer !== 'Bearer') {
            res.code(409).json({
                message: 'Invalud token',
                code: 409
            })
            return;
        }
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);

        req.user = user;
        next();
    }
}

module.exports = authToken;