const {Contact} = require('../../model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized, NotFound} = require('http-errors');

const updateContact = async (req, res) => {
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
        throw new NotFound('Not found contact');
    }

    res.status(201).json({
        message:"Contact is updated",
        code: 201,
        body: {
            result
        }
    })
    }

  module.exports = updateContact;