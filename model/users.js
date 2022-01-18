const {Schema, model} = require("mongoose");
const Joi = require("joi");

const joiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string(),
    token: Joi.string()
})

const usersSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  })

  const User = model("user", usersSchema);

  module.exports = {
    joiSchema,  
    User
};
  