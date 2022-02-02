const {User} = require('../../model');
const {NotFound} = require('http-errors');
const {sendEmailNodemailer} = require('../../helpers');
const {MY_HOST} = process.env;

const resendToken = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        res.status(400).json({
            status: "error",
            code: 400,
            message: 'missing required field email'
        })
        return;
    }


    const user = await User.findOne({email});

    if (!user) {
        throw new NotFound('User not found');
    }

    if (!user.verificationToken) {
        res.status(400).json({
            status: "error",
            code: 400,
            message: 'Verification has already been passed'
        })
        return;
    }

    sendEmailNodemailer({
        to: email,
        subject: "Verify your email",
        html: `<a href="${MY_HOST}/users/verify/${user.verificationToken}">Confirm Email</a>`
    });
    
    res.json({
        status:"success",
        code: 200, 
        message: 'Token is resended in your email'
    })

}

module.exports = resendToken