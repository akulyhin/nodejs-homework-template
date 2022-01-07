const express = require('express')
const router = express.Router()
const contactOperation = require('./../../model/index.js');
const Joi = require('joi');

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

const result = await contactOperation.addContact(req.body);

if (result.error) {
  res.status(400).json({"message": `missing required name field`})
}
else {
  res.status(201).json({
    "status": "success",
    "code": 201,
    "data": {
      result
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

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  if (Object.entries(req.body).length) {
  const result = await contactOperation.updateContact(contactId, req.body);

    if (result.error) {
      res.status(400).json({message: result.error.message});
    }
    else {
      res.json({
        status: "success",
        code: 200,
        data: result
      })
    }

  }

  else {
    res.status(400).json({message: "missing fields"});
  }
})



module.exports = router
