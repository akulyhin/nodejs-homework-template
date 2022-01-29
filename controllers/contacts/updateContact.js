const {Contact} = require('../../model');
const {NotFound} = require('http-errors');

const updateContact = async (req, res) => {
    const {contactId} = req.params;
    const {_id:id} = req.user;

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