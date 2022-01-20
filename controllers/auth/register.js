const {User} = require('../../model');
const {Conflict} = require("http-errors");
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw new Conflict("Already register");
    }

    const hashPassword  = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({email, password: hashPassword});
    res.status(201).json({
        status: "access",
        code: 201,
        message: "Register success"
    })
};

module.exports = register;