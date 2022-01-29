const controllerWrapper = require("./controllerWrapper");
const validation = require("./validation");
const authToken = require('./authToken');
const upload = require('./uploadFile');

module.exports = {
    controllerWrapper,
    validation,
    authToken,
    upload
}