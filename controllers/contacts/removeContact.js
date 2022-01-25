const {Contact} = require('../../model');

const removeContact = async (req, res) => {
    const {contactId} = req.params;

    const {_id:id} = req.user;

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