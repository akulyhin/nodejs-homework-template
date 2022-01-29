const express = require('express');
const router = express.Router();

const {upload, controllerWrapper} = require('../../middleware');
const {avatars:ctrl} = require('../../controllers');

router.post("/", upload.single('avatar'), controllerWrapper(ctrl));


module.exports = router;