const fs = require('fs/promises')
const contacts = require('./contacts.json')
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    return contacts;
    }

    catch(error) {
      error.message = "Не удалось считать файл"
      throw error;
    }
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);

  const contact = result.filter(el=> el.id === contactId);

  return contact;
}


const removeContact = async (contactId) => {
  try {
    const index = contacts.findIndex(el => el.id === contactId);

    if (index !== -1) {
      contacts.splice(index, 1);
    }

    const result = await getContactById(contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return result;
  }

  catch(err) {
    err.message = 'Не удалось удалить контакт';
    throw err;
  }
}

const addContact = async (body) => {
  try {
    const data = JSON.stringify(body);
    fs.writeFile(contactsPath, data);
  }
  catch(err) {
    throw err;
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
