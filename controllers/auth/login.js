const {User} = require("../../model");
const {Unauthorized} = require("http-errors");
const bcrypt = require('bcryptjs');
const {SECRET_KEY} = process.env;
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        throw new Unauthorized("Email or password is wrong");
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
        throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })


};


module.exports = login;