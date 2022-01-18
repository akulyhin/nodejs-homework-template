const {User} = require('../../model');
const {Conflict} = require("http-errors");


const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        // throw new Conflict("Already register");
        res.status(409).json({
            status: "error",
            code: 409,
            message: "Already register"
        });
        return
    }
    await User.create({email, password});
    res.status(201).json({
        status: "access",
        code: 201,
        message: "Register success"
    })
};


module.exports = register;