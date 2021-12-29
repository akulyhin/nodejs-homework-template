const express = require('express')
const router = express.Router()
const contactOperation = require('./../../model/index.js');
const Joi = require('joi');
const { reset } = require('nodemon');

router.get('/', async (req, res, next) => {
  const contacts = await contactOperation.listContacts(); 
  res.json({
      "status": "success",
      "code": 200,
      "data": {
        contacts
      }
    })
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const [contact] = await contactOperation.getContactById(contactId);

  if (contact) {
    res.json({
      "status": "success",
      "code": 200,
      "data": {
        contact
      }
    })
  }
  else {
    next();
  }
})

router.post('/', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.required(),
    phone: Joi.required()
  })

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({"message": `missing required name field`})
  }

else {
  const {name, email, phone} = req.body;
  const contacts = await contactOperation.listContacts();
  const lastId = contacts[contacts.length - 1];
  
  const newContact = {
    id: String(+lastId.id + 1),
    name,
    email,
    phone
  }

contacts.push(newContact);
contactOperation.addContact(contacts);

  res.status(201).json({
    "status": "success",
    "code": 201,
    "data": {
      newContact
    }
  })
}
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const [deleteContact] = await contactOperation.removeContact(contactId);

  if (deleteContact) {
    res.status(200).json({message: "contact deleted"})
  }
  else {
    next();
  }

})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
