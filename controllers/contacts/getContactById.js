const {Contact} = require('../../model');

const getContactById = async (req, res) => {
    const {contactId} = req.params;

      const contact = await Contact.findById(contactId);

      res.json({
        "status": "success",
        "code": 200,
        "data": {
          contact
        }
      })
  }


  module.exports = getContactById;