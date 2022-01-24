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




module.exports = {
  Contact,
  joiSchema
}
