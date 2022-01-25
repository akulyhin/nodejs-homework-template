const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');
const {User} = require('../../model');


const current = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        throw new Unauthorized('Invalid token');
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== 'Bearer') {
        throw new Unauthorized();
    }

    try {
      const {id} = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(id);
      
      res.status(201).json({
          status: "success",
          code: 201,
          body: {
              user
          }
      })
    }

    catch(error) {
        error.status(401);
        throw error;
    }
}

module.exports = current;