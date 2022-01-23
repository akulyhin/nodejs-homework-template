const express = require('express');
const {controllerWrapper, validation} = require('../../middleware');
const {users:ctrl} = require('../../controllers');

const router = express.Router();


router.get('/current', controllerWrapper(ctrl.current));


module.exports = router;