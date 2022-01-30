const express = require('express');
const router = express.Router();

const {upload, controllerWrapper, authToken} = require('../../middleware');
const {avatars:ctrl} = require('../../controllers');

router.get("/", authToken(), controllerWrapper(ctrl.getAvatars));

router.patch("/", authToken(), upload.single('avatar'), controllerWrapper(ctrl.updateAvatars));


module.exports = router;