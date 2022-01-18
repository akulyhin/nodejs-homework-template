const {
  listContacts, 
  getContactById, 
  removeContact,
  addContact,
  updateContact,
  updateStatusContact 
} = require('./contacts');

const {User} = require('./users');




  module.exports = {
    listContacts, 
    getContactById, 
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    User
  }