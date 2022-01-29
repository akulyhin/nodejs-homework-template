const {Contact} = require('../../model');

const getContactById = async (req, res) => {
    const {contactId} = req.params;
    const {_id:owner} = req.user;

      // const contact = await Contact.findById(contactId);
      const contact = await Contact.findOne({_id: contactId, owner}); 

      res.json({
        "status": "success",
        "code": 200,
        "data": {
          contact
        }
      })
  }


  module.exports = getContactById;