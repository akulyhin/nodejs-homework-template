const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const DB_HOST = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.iuxfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Database connection successful");
})
.catch(error => {
  console.log(error.message);
})


const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
