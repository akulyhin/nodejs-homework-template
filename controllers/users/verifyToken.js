const {User} = require('../../model');
const {NotFound} = require('http-errors');

const verifyToken = async (req, res) => {
    const {verificationToken} = req.params;

    const user = await User.findOneAndUpdate({verificationToken}, {verify: true, verificationToken: null});

    if (!user) {
        throw new NotFound('User not found');
    }

    res.json({
        status:"success",
        code: 200, 
        message: 'Verification successful'
    })

}


module.exports = verifyToken;