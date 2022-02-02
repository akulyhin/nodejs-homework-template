const {User} = require('../../model');
const {Conflict} = require("http-errors");
const bcrypt = require('bcryptjs');
const {sendEmailNodemailer} = require('../../helpers');
const {nanoid} = require('nanoid');

const gravatar = require('gravatar');

const {MY_HOST} = process.env;


const register = async (req, res) => {
    const {email, password, subscription = 'starter'} = req.body;

    const user = await User.findOne({email});

    if (user) {
        throw new Conflict("Already register");
    }
    const hashPassword  = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email, {protocol: 'https', s: '200'});

    const verificationToken = nanoid();

    await User.create({email, password: hashPassword, avatarURL, verificationToken});

    sendEmailNodemailer({
        to: email,
        subject: "Verify your email",
        html: `<a href="${MY_HOST}/users/verify/${verificationToken}">Confirm Email</a>`
    });

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