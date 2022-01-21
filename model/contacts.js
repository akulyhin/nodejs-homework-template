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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
})

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.required(),
  phone: Joi.required(),
  favorite: Joi.boolean()
})

const Contact = model("contact", contactSchema);


const listContacts = async () => {
  try {    
    return await Contact.find();
  }

    catch(error) {
      error.message = "Не удалось считать файл"
      throw error;
    }
}

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  }
  catch(error) {
    error.message = 'Не нашли такой айди';
    return error;
  }
}

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  }

  catch(err) {
    err.message = 'Не удалось удалить контакт';
    throw err;
  }
}

const addContact = async (body) => {
  try {
    const validationResult = joiSchema.validate(body);
  
    if (validationResult.error) {
      return validationResult;
    }
  
    else {
      return await Contact.create(body);
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
    const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});
    return result;

  }
}

const updateStatusContact = async (contactId, body) => {
  const schema = Joi.object({
    favorite: Joi.boolean()
  })

  const validationResult = schema.validate(body);
  if (validationResult.error) {
    return validationResult;
  }

  else {
    return await Contact.findByIdAndUpdate(contactId, body, {new: true});
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
