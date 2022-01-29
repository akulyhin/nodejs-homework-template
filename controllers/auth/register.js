const {User} = require('../../model');
const {Conflict} = require("http-errors");
const bcrypt = require('bcryptjs');

const fs = require('fs/promises');
const path = require('path');
const gravatar = require('gravatar');

const register = async (req, res) => {
    const {email, password, subscription = 'starter'} = req.body;
    // const {path:tempDir, originalname} = req.file;
    // const uploadDir = path.join(__dirname, '../../public/avatars', originalname);


    const user = await User.findOne({email});

    if (user) {
        throw new Conflict("Already register");
    }
    const hashPassword  = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // await fs.rename(tempDir, uploadDir);

    const avatarURL = gravatar.url(email, {protocol: 'https', s: '200'});

    await User.create({email, password: hashPassword, avatarURL});

    res.status(201).json({
        status: "access",
        code: 201,
        message: "Register success",
        user: {
            email,
            subscription
        }
    })
};

module.exports = register;