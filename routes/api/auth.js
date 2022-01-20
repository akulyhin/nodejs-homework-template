const express = require('express');
const {BadRequest, Conflict, Unauthorized} = require('http-errors');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;

const {controllerWrapper, validation} = require('../../middleware');
const {joiSchema, loginSchema} = require('../../model/users.js');
const {auth:ctrl} = require('../../controllers');

const router = express.Router();

router.post("/register", validation(joiSchema), controllerWrapper(ctrl.register));

router.post("/login", validation(loginSchema), controllerWrapper(ctrl.login))

router.get("/logout", controllerWrapper(ctrl.logout))

module.exports = router;