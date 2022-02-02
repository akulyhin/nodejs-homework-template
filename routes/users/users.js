const express = require('express');
const {users:ctrl} = require('../../controllers');
const {upload, controllerWrapper, authToken} = require('../../middleware');


const router = express.Router();

router.get("/avatars", authToken(), controllerWrapper(ctrl.getAvatars));

router.patch("/avatars", authToken(), upload.single('avatar'), controllerWrapper(ctrl.updateAvatars));

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verifyToken));

router.post('/verify', controllerWrapper(ctrl.resendToken));


module.exports = router;