// require the library
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/contacts_list_db')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });