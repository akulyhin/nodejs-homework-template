const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');


const authToken = () => {
    return async(req, res, next) => {
        const {authorization} = req.headers;
        if (!authorization) {
            throw new Unauthorized('Invalid token');
            next();
        }

        const [bearer, token] = authorization.split(" ");

        if (bearer !== 'Bearer') {
            throw new Unauthorized('Invalid token');
        }

        const {id} = jwt.verify(token, SECRET_KEY);
        next()
    }
}

module.exports = authToken;