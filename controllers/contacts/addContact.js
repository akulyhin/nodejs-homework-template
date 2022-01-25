const {Contact} = require('../../model');



const addContact = async (req, res) => {
    const {_id:id} = req.user;
    
    const newContact = {
        ...req.body,
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