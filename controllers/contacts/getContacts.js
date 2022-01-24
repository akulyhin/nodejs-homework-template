const {Contact} = require('../../model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');


const listContacts = async (req, res) => {
  console.log("TEST", id);

  // const {authorization} = req.headers;

  // if (!authorization) {
  //     throw new Unauthorized('Invalid token');
  // }
  // const [bearer, token] = authorization.split(" ");
  // if (bearer !== 'Bearer') {
  //     throw new Unauthorized();
  // }

  //   const {id} = jwt.verify(token, SECRET_KEY);

    const contacts = await Contact.find({owner: id});

    res.status(201).json({
        status: "success",
        code: 201,
        body: {
          contacts
        }
    })
  
}

  module.exports = listContacts;