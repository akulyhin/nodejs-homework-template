const fs = require('fs/promises');
const contacts = require('./contacts.json');
const path = require("path");
const Joi = require('joi');
const {Schema, model} = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.required(),
  phone: Joi.required(),
  favorite: Joi.boolean()
})

const Contact = model("contact", contactSchema);


const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    // const data = await fs.readFile(contactsPath);
    
    const result = Contact.find();
    return result;
  }

    catch(error) {
      error.message = "Не удалось считать файл"
      throw error;
    }
}

const getContactById = async (contactId) => {
  return await Contact.find({_id: contactId});
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
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.required(),
      phone: Joi.required()
    })
  
    const validationResult = schema.validate(body);
  
    if (validationResult.error) {
      return validationResult;
    }
  
    else {
      const {name, email, phone} = body;
      const contacts = await listContacts();
      const lastId = contacts[contacts.length - 1];
      
      const newContact = {
        id: String(+lastId.id + 1),
        name,
        email,
        phone
      }
    
      contacts.push(newContact);
      const data = JSON.stringify(contacts);
      fs.writeFile(contactsPath, data);
      return newContact;
    }
  }
  catch(err) {
    throw err;
  }
}

const updateContact = async (contactId, body) => {

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
  })

  const validationResult = schema.validate(body);

  if (validationResult.error) {
    return validationResult;
  }

  else {
    const { name, email, phone } = body;
    const contacts = await listContacts();
  
    contacts.forEach(item => {
      if (item.id === contactId) {
        if (name) item.name = name;
        if (email) item.email = email;
        if (phone) item.phone = phone;
      }
    });
    
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    const [result] = await getContactById(contactId);
    return result;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
