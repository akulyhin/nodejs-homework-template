const {Model, Schema} = require('mongoose');
const Joi = require("joi");

const contactSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
}, {versionKey: false, timestamps: true});


const Owner = model("contact", contactSchema)

module.exports = {
    contactSchema
}