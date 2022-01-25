const express = require('express');
const {controllerWrapper, authToken} = require('../../middleware');
const {users:ctrl} = require('../../controllers');

const router = express.Router();


router.get('/current', authToken(), controllerWrapper(ctrl.current));


module.exports = router;