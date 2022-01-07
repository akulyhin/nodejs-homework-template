const {Schema, model} = require("mongoose");
const Joi = require("Joi");

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

module.exports = {
    Contact,
    joiSchema
}