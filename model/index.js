const {
  getContactById, 
  removeContact,
  addContact,
  updateContact,
  updateStatusContact 
} = require('./contacts');

const {User} = require('./users');
const {Contact} = require('./contacts');




  module.exports = {
    getContactById, 
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    User,
    Contact
  }