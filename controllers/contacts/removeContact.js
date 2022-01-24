const {Contact} = require('../../model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized, NotFound} = require('http-errors');

const removeContact = async (req, res) => {
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

    const result = await Contact.findOneAndRemove({_id: contactId, owner: id});

    if (result) {
        res.status(200).json({
            status: "Contact deleted",
            code: 200,
            body: {
                result
            }
        })
    }

    throw new NotFound('Contact not found');

  }

  
  module.exports = removeContact;