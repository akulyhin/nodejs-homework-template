const {Contact} = require('../../model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');


const addContact = async (req, res) => {
    const {name, email, phone, favorite} = req.body;
    const {_id:id} = req.user;
    
    const newContact = {
        name,
        email,
        phone,
        favorite,
        owner: id
    };

    const result = await Contact.create(newContact);

    res.status(201).json({
        "status": "success",
        "code": 201,
        "data": {
            result
        }
      })
}


  module.exports = addContact;