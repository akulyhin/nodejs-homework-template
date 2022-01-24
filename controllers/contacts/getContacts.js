const {Contact} = require('../../model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');


const listContacts = async (req, res) => {

  const {_id} = req.user;
  const contacts = await Contact.find({owner: _id});

    res.status(201).json({
        status: "success",
        code: 201,
        body: {
          contacts
        }
    })
  
}

  module.exports = listContacts;