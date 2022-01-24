const express = require('express')
const router = express.Router()
const contactOperation = require('./../../model/index.js');

const {controllerWrapper, validation} = require('../../middleware');
const {joiSchema} = require('../../model/contacts');
const {contacts:ctrl} = require('../../controllers');


router.get('/', controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact));

router.delete('/:contactId', controllerWrapper(ctrl.removeContact));

router.put('/:contactId', controllerWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateStatusContact));



module.exports = router;
