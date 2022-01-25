const {Contact} = require('../../model');


const listContacts = async (req, res) => {

  const {_id} = req.user;
  const contacts = await Contact.find({owner: _id}).populate("owner", "email");

    res.status(201).json({
        status: "success",
        code: 201,
        body: {
          contacts
        }
    })
  
}

  module.exports = listContacts;