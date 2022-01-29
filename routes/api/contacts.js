const express = require('express')
const router = express.Router()
const contactOperation = require('./../../model/index.js');

const {controllerWrapper, validation, authToken} = require('../../middleware');
const {joiSchema} = require('../../model/contacts');
const {contacts:ctrl} = require('../../controllers');


router.get('/', authToken(), controllerWrapper(ctrl.listContacts));

router.get('/:contactId', authToken(), controllerWrapper(ctrl.getContactById));

router.post('/', validation(joiSchema), authToken(), controllerWrapper(ctrl.addContact));

router.delete('/:contactId', authToken(), controllerWrapper(ctrl.removeContact));

router.put('/:contactId', authToken(), controllerWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', authToken(), controllerWrapper(ctrl.updateStatusContact));



module.exports = router;
