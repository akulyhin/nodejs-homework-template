const current = require('./current');
const verifyToken = require('./verifyToken')
const updateAvatars = require('./updateAvatars');
const getAvatars = require('./getAvatars');
const resendToken = require('./resendToken')


module.exports = {
    current,
    verifyToken,
    updateAvatars,
    getAvatars,
    resendToken
}