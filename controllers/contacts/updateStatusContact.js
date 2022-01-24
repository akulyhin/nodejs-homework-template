const {Contact} = require('../../model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized, NotFound} = require('http-errors');

const updateStatusContact = async (req, res) => {

    const {contactId} = req.params;
    const {authorization} = req.headers;

    if (!authorization) {
        throw new Unauthorized('Invalid token');
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== 'Bearer') {
        throw new Unauthorized();
    }

    const {id} = jwt.verify(token, SECRET_KEY);

    const result = await Contact.findOneAndUpdate({_id: contactId, owner: id}, req.body, {new: true});

    if (!result) {
        throw new NotFound('Contact not found');
    }

    res.status(201).json({
        status: "success",
        code: 201,
        body: {
            result
        }
    })
  }


  module.exports = updateStatusContact;