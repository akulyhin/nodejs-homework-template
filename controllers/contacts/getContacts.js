const {Contact} = require('../../model');


const listContacts = async (req, res) => {
  const {page = 1, limit = 10} = req.query;
  const skip = (+page - 1) * +limit;

  const {_id} = req.user;
  const total = await Contact.find({owner: _id});
  const contacts = await Contact.find({owner: _id}, "", {skip, limit: +limit}).populate("owner", "email");

  const totalPage = Math.ceil(total.length / +limit);

    res.status(201).json({
        status: "success",
        code: 201,
        total: total.length,
        page,
        totalPage,
        body: {
          contacts
        }
    })
  
}

  module.exports = listContacts;